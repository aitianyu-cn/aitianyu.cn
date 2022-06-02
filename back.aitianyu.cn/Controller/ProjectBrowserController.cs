using back.aitianyu.cn.Model.Project;
using back.aitianyu.cn.Utils;
using back.aitianyu.cn.Utils.File;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;

namespace back.aitianyu.cn.Controller
{
    [ApiController]
    [Route("global/[controller]")]
    public class ProjectBrowserController
    {
        private const string ProjectOptionsSql = "SELECT `item`, `path` FROM aitianyu_base.project_options where `key`='{0}';";


        [HttpGet]
        public IEnumerable<ProjectItem> GetAPIProjects()
        {
            List<ProjectItem> result = ProjectHelper.GetProjects();

            try
            {
                foreach (ProjectItem item in result)
                {
                    DatabaseCenter? db = DBHelper.GetDBCenter(Initial.AiTianyuBaseDB);
                    if (db != null)
                    {
                        try
                        {
                            string sql = string.Format(ProjectOptionsSql, item.Path);
                            db.Execute(sql, (MySqlDataReader reader) =>
                            {
                                while (reader.Read())
                                {
                                    try
                                    {
                                        string op_item = reader.GetString("item");
                                        string op_path = reader.GetString("path");

                                        if (string.IsNullOrEmpty(op_item) || string.IsNullOrEmpty(op_path))
                                            continue;

                                        item.Options.Add(new KeyValuePair<string, string>(op_item, op_path));
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
            catch
            {

            }

            return result;
        }
    }
}
