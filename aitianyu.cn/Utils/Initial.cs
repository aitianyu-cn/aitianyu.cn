using back.aitianyu.cn.Utils.File;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;

namespace back.aitianyu.cn.Utils
{
    public class Initial
    {
        public const string AiTianyuBaseDB = "aitianyu_cn_db";

        private const string AITianyuDBProjectSql = "SELECT `key`, `db`, `enable`  FROM aitianyu_base.projects;";

        public static void InitDatabase()
        {
            InitDefaultDB();
            InitProjectDB();
        }

        private static void InitDefaultDB()
        {
            string defaultDBName = "aitianyu_base";
            Runtime.Runtime.ProjectDBs.AddOrUpdate(AiTianyuBaseDB, defaultDBName, (string key, string value) => defaultDBName);
        }
        private static void InitProjectDB()
        {
            DatabaseCenter? db = DBHelper.GetDBCenter(AiTianyuBaseDB);
            if (db == null)
                return;

            try
            {
                db.Execute(AITianyuDBProjectSql, (MySqlDataReader reader) =>
                {
                    while (reader.Read())
                    {
                        try
                        {
                            if (reader.IsDBNull(2) || reader.GetInt32("enable") != 1)
                                continue;

                            string project = reader.GetString("key");
                            string dbname = reader.GetString("db");
                            Runtime.Runtime.ProjectDBs.AddOrUpdate(project, dbname, (string key, string value) => dbname);
                        }
                        catch
                        {

                        }
                    }
                });
            }
            catch
            {

            }
        }
    }
}
