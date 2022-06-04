using MySql.Data.MySqlClient;

namespace back.aitianyu.cn.Utils.File
{
    public class DatabaseCenter
    {
        private const string DBConnectionStr = "data source=localhost;database={0};user id=root;password=ysy1998ysy[];pooling=false;charset=utf8";

        private readonly MySqlConnection MySql;
        private readonly Mutex Mutex;

        public string DatabaseName { get; }

        public DatabaseCenter(string databaseName)
        {
            string dbConnectString = string.Format(DBConnectionStr, databaseName);
            MySql = new MySqlConnection(dbConnectString);

            DatabaseName = databaseName;

            Mutex = new Mutex();
        }

        public void Execute(string sqlStatement, Action<MySqlDataReader> callback, Action<string>? failCallback = null)
        {
            if (Mutex.WaitOne(30000))
            {
                try
                {
                    if (MySql.State != System.Data.ConnectionState.Open)
                        MySql.Open();
                    MySqlCommand command = new(sqlStatement, MySql);
                    MySqlDataReader reader = command.ExecuteReader();

                    callback(reader);

                    reader.Close();
                    MySql.Close();
                }
                catch
                {
                    if (failCallback != null)
                        failCallback(string.Format("Database {0} Sql {1} exectue failed!!!", DatabaseName, sqlStatement));
                }

                Mutex.ReleaseMutex();
            }
            else if (failCallback != null)
                failCallback(string.Format("Database {0} is using, can not access over 30s.", DatabaseName));
        }
    }
}
