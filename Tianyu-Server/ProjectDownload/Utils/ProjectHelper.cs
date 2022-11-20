using MySql.Data.MySqlClient;
using Tianyu.Server.Common.Services;
using Tianyu.Server.Project.Download.Models;

namespace Tianyu.Server.Project.Download.Utils
{
    public class ProjectHelper
    {
        //private const string AITianyuDBProjectSql = "SELECT `key`, `project`, `name`, `enable`  FROM aitianyu_base.projects;";
        private const string AITianyuDBDownloadSql = "SELECT `key`, `github`, `name`, `desc`, `enable`  FROM aitianyu_base.projects;";

        public static List<DownloadItem> GetDownloads()
        {
            List<DownloadItem> result = new List<DownloadItem>();

            DatabaseService db = DBHelper.GetDBCenter("aitianyu_base");
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

            return result;
        }
    }
}
