using back.aitianyu.cn.Model;
using back.aitianyu.cn.Utils;
using back.aitianyu.cn.Utils.File;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace back.aitianyu.cn.Controller
{
    [ApiController]
    [Route("global/[controller]")]
    public class FeatureController
    {
        private const string FeatureGetSql = "SELECT `name`, `enable`, `desc`, `dep` FROM aitianyu_base.feature;";

        private readonly ILogger<FeatureController> _logger;

        public FeatureController(ILogger<FeatureController> logger)
        {
            _logger = logger;
        }

        [HttpGet("getFeatures")]
        public IDictionary<string, FeatureItem> GetFeatures()
        {
            Dictionary<string, FeatureItem> features = new();

            try
            {
                DatabaseCenter? db = DBHelper.GetDBCenter(Initial.AiTianyuBaseDB);
                if (db != null)
                {
                    try
                    {
                        db.Execute(FeatureGetSql, (MySqlDataReader reader) =>
                        {
                            while (reader.Read())
                            {
                                try
                                {
                                    string name = reader.GetString("name");
                                    bool enable = reader.GetBoolean("enable");
                                    string desc = reader.GetString("desc");
                                    string dep = reader.GetString("dep");

                                    dep = dep.Trim();
                                    List<string> deps = new();
                                    if (!string.IsNullOrEmpty(dep))
                                    {
                                        string[] depStrings = dep.Split(",");
                                        foreach(string depString in depStrings)
                                        {
                                            if (!string.IsNullOrEmpty(depString) && !deps.Contains(depString))
                                                deps.Add(depString);
                                        }
                                    }

                                    if (string.IsNullOrEmpty(name))
                                        continue;

                                    features.Add(name, new FeatureItem
                                    {
                                        Enable = enable,
                                        Description = desc,
                                        Dependency = deps
                                    });
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
            catch
            {

            }

            return features;
        }
    }
}
