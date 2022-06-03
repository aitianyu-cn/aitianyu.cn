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

        public void Execute(string sqlStatement, Action<MySqlDataReader> callback)
        {
            if (Mutex.WaitOne(30000))
            {
                try
                {
                    if (MySql.State != System.Data.ConnectionState.Open)
                        MySql.Open();
                    MySqlCommand command = new MySqlCommand(sqlStatement, MySql);
                    MySqlDataReader reader = command.ExecuteReader();

                    callback(reader);

                    reader.Close();
                    MySql.Close();
                }
                catch
                {

                }

                Mutex.ReleaseMutex();
            }
            else
                Console.WriteLine("Database {0} is using, can not access over 30s.", DatabaseName);
        }
    }
}
