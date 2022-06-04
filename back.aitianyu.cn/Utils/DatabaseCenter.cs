using MySql.Data.MySqlClient;

namespace aitianyu.cn.Utils
{
    public class DatabaseCenter
    {
        private const string DBConnectionStr = "data source=localhost;database={0};user id=root;password=ysy1998ysy[];pooling=false;charset=utf8";

        private readonly MySqlConnection MySql;

        public DatabaseCenter(string databaseName)
        {
            string dbConnectString = string.Format(DBConnectionStr, databaseName);
            MySql = new MySqlConnection(dbConnectString);
        }

        public string[] Execute(string sqlStatement)
        {
            List<string> list = new List<string>();

            try
            {
                MySql.Open();
                MySqlCommand command = new MySqlCommand(sqlStatement, MySql);
                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                    list.Add(reader.GetString("name"));

                reader.Close();
                MySql.Close();
            }
            catch
            {

            }

            return list.ToArray();
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
