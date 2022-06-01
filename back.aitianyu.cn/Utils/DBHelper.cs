using back.aitianyu.cn.Utils.File;

namespace back.aitianyu.cn.Utils
{
    public class DBHelper
    {
        public static DatabaseCenter? GetDBCenter(string projectName)
        {
            DatabaseCenter? db;
            if (!Runtime.Runtime.DBCenters.TryGetValue(projectName, out db))
            {
                if (Runtime.Runtime.ProjectDBs.TryGetValue(projectName, out string? value) && value is not null)
                {
                    db = new DatabaseCenter(value);
                    Runtime.Runtime.DBCenters.AddOrUpdate(projectName, db, (string key, DatabaseCenter old) => db);
                }
            }

            return db;
        }
    }
}
