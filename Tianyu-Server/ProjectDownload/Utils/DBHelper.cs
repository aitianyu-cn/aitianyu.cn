using Tianyu.Server.Common.Models.Service;
using Tianyu.Server.Common.Services;

namespace Tianyu.Server.Project.Download.Utils
{
    public class DBHelper
    {
        public static DatabaseService GetDBCenter(string projectName)
        {
            DBServiceConnection connection = new DBServiceConnection
            {
                host = "localhost",
                database = projectName,
                userId = "root",
                password = "ysy1998ysy[]",
                pooling = false,
                charset = "utf8"
            };
            DatabaseService db = new DatabaseService(connection);

            return db;
        }
    }
}
