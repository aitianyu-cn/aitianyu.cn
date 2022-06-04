using back.aitianyu.cn.Model.Project;
using back.aitianyu.cn.Utils;
using back.aitianyu.cn.Utils.File;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections.Concurrent;

namespace back.aitianyu.cn.Controller.ProjectDocs
{
    [ApiController]
    [Route("project_docs/[controller]")]
    public class MacrodefBrowserController
    {
        private const string MacroDefineSql = "SELECT * FROM {0}.macrodef;";

        private readonly ILogger<MacrodefBrowserController> _logger;

        public MacrodefBrowserController(ILogger<MacrodefBrowserController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// MacrodefBrowser Root
        /// 获取宏定义参考
        /// </summary>
        /// <param name="projectName">项目名称</param>
        /// <returns>返回宏定义结果集</returns>
        [HttpGet("{projectName}")]
        public IEnumerable<MacrodefItem> GetMacrodef(string projectName)
        {
            List<MacrodefItem> items = new List<MacrodefItem>();

            try
            {
                DatabaseCenter? db = DBHelper.GetDBCenter(projectName);
                if (db is not null)
                {
                    string sql = string.Format(MacroDefineSql, db.DatabaseName);
                    db.Execute(sql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                MacrodefItem item = new MacrodefItem
                                {
                                    Macro = reader.GetString("macro"),
                                    Value = reader.GetString("value"),
                                    File = reader.GetString("file")
                                };

                                items.Add(item);
                            }
                            catch
                            {

                            }
                        }
                    });
                }
            }
            catch
            {

            }

            return items;
        }
    }
}
