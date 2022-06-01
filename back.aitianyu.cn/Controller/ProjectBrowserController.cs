using back.aitianyu.cn.Model.Project;
using back.aitianyu.cn.Utils;
using back.aitianyu.cn.Utils.File;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace back.aitianyu.cn.Controller
{
    [ApiController]
    [Route("global/[controller]")]
    public class ProjectBrowserController
    {
        private static string RootPath = Path.Combine(FolderHelper.ControllerInternalBaseSource, "Project");


        [HttpGet]
        public IEnumerable<ProjectItem> GetAPIProjects()
        {
            List<ProjectItem> result = new List<ProjectItem>();

            try
            {
                string file = Path.Combine(RootPath, "projects.json");
                JsonReader reader = new(file);

                JArray array = reader.Token as JArray ?? new JArray();
                foreach (JToken obj in array)
                {
                    try
                    {
                        bool isEnable = obj["enable"] is JValue @value ? (bool)value : false;
                        if (!isEnable)
                            continue;

                        ProjectItem item = new ProjectItem
                        {
                            Name = obj["project"]?.ToString() ?? "",
                            I18n = obj["i18n"]?.ToString() ?? "",
                            Path = obj["path"]?.ToString() ?? ""
                        };

                        if (string.IsNullOrEmpty(item.Name) || string.IsNullOrEmpty(item.Path))
                            continue;

                        JArray options = obj["options"] as JArray ?? new JArray();
                        foreach (JObject option in options)
                        {
                            string op_item = option["item"]?.ToString() ?? "";
                            string op_path = option["path"]?.ToString() ?? "";

                            if (string.IsNullOrEmpty(op_item) || string.IsNullOrEmpty(op_path))
                                continue;

                            item.Options.Add(new KeyValuePair<string, string>(op_item, op_path));
                        }

                        string dbname = obj["db"]?.ToString() ?? "";
                        if (!string.IsNullOrEmpty(dbname))
                            Runtime.Runtime.ProjectDBs.AddOrUpdate(item.Path, dbname, (string key, string value) => dbname);

                        result.Add(item);
                    }
                    catch
                    {

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
