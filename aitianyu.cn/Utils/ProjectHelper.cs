using back.aitianyu.cn.Model.Download;
using back.aitianyu.cn.Model.Project;
using back.aitianyu.cn.Utils.File;
using MySql.Data.MySqlClient;

namespace back.aitianyu.cn.Utils
{
    public class ProjectHelper
    {
        private const string AITianyuDBProjectSql = "SELECT `key`, `project`, `name`, `enable`  FROM aitianyu_base.projects;";
        private const string AITianyuDBDownloadSql = "SELECT `key`, `github`, `name`, `desc`, `enable`  FROM aitianyu_base.projects;";

        public static List<ProjectItem> GetProjects()
        {
            List<ProjectItem> result = new List<ProjectItem>();

            DatabaseCenter? db = DBHelper.GetDBCenter(Initial.AiTianyuBaseDB);
            if (db != null)
            {
                try
                {
                    db.Execute(AITianyuDBProjectSql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                if (reader.GetInt32("enable") != 1)
                                    continue;

                                ProjectItem item = new()
                                {
                                    Name = reader.GetString("project"),
                                    I18n = reader.GetString("name"),
                                    Path = reader.GetString("key")
                                };

                                result.Add(item);
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

            return result;
        }

        public static List<DownloadItem> GetDownloads()
        {
            List<DownloadItem> result = new List<DownloadItem>();

            DatabaseCenter? db = DBHelper.GetDBCenter(Initial.AiTianyuBaseDB);
            if (db != null)
            {
                try
                {
                    db.Execute(AITianyuDBDownloadSql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                if (reader.GetInt32("enable") != 1)
                                    continue;

                                DownloadItem item = new()
                                {
                                    Key = reader.GetString("key"),
                                    Name = reader.GetString("name"),
                                    Description = reader.GetString("desc"),
                                    Github = reader.GetString("github")
                                };

                                result.Add(item);
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

            return result;
        }
    }
}
