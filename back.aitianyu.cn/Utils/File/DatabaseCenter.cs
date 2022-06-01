using MySql.Data.MySqlClient;

namespace back.aitianyu.cn.Utils.File
{
    public class DatabaseCenter
    {
        private const string DBConnectionStr = "data source=localhost;database={0};user id=root;password=ysy1998ysy[];pooling=false;charset=utf8";

        private readonly MySqlConnection MySql;

        public string DatabaseName { get; }

        public DatabaseCenter(string databaseName)
        {
            string dbConnectString = string.Format(DBConnectionStr, databaseName);
            MySql = new MySqlConnection(dbConnectString);

            DatabaseName = databaseName;
        }

        public void Execute(string sqlStatement, Action<MySqlDataReader> callback)
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
        }
    }
}
