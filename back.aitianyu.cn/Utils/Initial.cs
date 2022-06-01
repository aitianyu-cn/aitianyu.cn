using back.aitianyu.cn.Utils.File;
using Newtonsoft.Json.Linq;

namespace back.aitianyu.cn.Utils
{
    public class Initial
    {
        public static void InitDatabase()
        {
            string path = Path.Combine(FolderHelper.ControllerInternalBaseSource, "Project", "projects.json");
            JsonReader reader = new(path);
            JArray array = reader.Token as JArray ?? new JArray();
            foreach (JToken obj in array)
            {
                try
                {
                    bool isEnable = obj["enable"] is JValue @value ? (bool)value : false;
                    if (!isEnable)
                        continue;

                    string item_path = obj["path"]?.ToString() ?? "";

                    if (string.IsNullOrEmpty(item_path))
                        continue;

                    string dbname = obj["db"]?.ToString() ?? "";
                    if (!string.IsNullOrEmpty(dbname))
                        Runtime.Runtime.ProjectDBs.AddOrUpdate(item_path, dbname, (string key, string value) => dbname);
                }
                catch
                {

                }
            }
        }
    }
}
