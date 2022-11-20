using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tianyu.Server.Common.Models.Service;

namespace Tianyu.Server.Common.Services
{
    public class DatabaseService
    {
        private const string DBConnectionStr = "data source={0};database={1};user id={2};password={3};pooling={4};charset={5}";

        private readonly MySqlConnection sqlConnection;
        private readonly Mutex mutex;

        public readonly string Database;
        public int WaitTimeout { get; set; } = 30000;

        public DatabaseService(DBServiceConnection connectionData)
        {
            string connectString = string.Format
                (
                DBConnectionStr,
                connectionData.host,
                connectionData.database,
                connectionData.userId,
                connectionData.password,
                connectionData.pooling?"true":"false",
                connectionData.charset
                );

            Database = connectionData.database;
            sqlConnection = new MySqlConnection(connectString);
            mutex = new Mutex();
        }

        public void Execute(string sqlStatement, Action<MySqlDataReader> callback, Action<string>? fallCallback = null)
        {
            if (mutex.WaitOne(WaitTimeout))
            {
                try
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();
                    MySqlCommand command = new(sqlStatement, sqlConnection);
                    MySqlDataReader reader = command.ExecuteReader();

                    callback(reader);

                    reader.Close();
                    sqlConnection.Close();
                }
                catch
                {
                    if (fallCallback != null)
                        fallCallback(string.Format("Database {0} Sql {1} exectue failed!!!", Database, sqlStatement));
                }

                if (sqlConnection.State != System.Data.ConnectionState.Closed)
                    sqlConnection.Close();

                mutex.ReleaseMutex();
            }
            else if (fallCallback != null)
                fallCallback(string.Format("Database {0} is using, can not access over {1}s.", Database, WaitTimeout / 1000));
        }

        public bool RunTransaction(string[] statements, Action<string> fallCallback)
        {
            if (mutex.WaitOne(WaitTimeout))
            {
                bool isSuccess = true;
                try
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();
                    MySqlCommand command = sqlConnection.CreateCommand();
                    MySqlTransaction transaction = sqlConnection.BeginTransaction();
                    command.Transaction = transaction;

                    try
                    {
                        foreach (string sql in statements)
                        {
                            command.CommandText = sql;
                            command.ExecuteNonQuery();
                        }

                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        isSuccess = false;
                    }
                    sqlConnection.Close();
                }
                catch (Exception e)
                {
                    fallCallback(e.Message);
                    isSuccess = false;
                }

                if (sqlConnection.State != System.Data.ConnectionState.Closed)
                    sqlConnection.Close();

                mutex.ReleaseMutex();
                return isSuccess;
            }
            else
            {
                fallCallback(string.Format("Database {0} is using, can not access over {1}s.", Database, WaitTimeout / 1000));
                return false;
            }
        }
    }
}
