using back.aitianyu.cn.Model.Download;
using back.aitianyu.cn.Utils;
using back.aitianyu.cn.Utils.File;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace back.aitianyu.cn.Controller.Download
{
    [ApiController]
    [Route("project_download/[controller]")]
    public class DownloadBrowserController
    {
        private static string RootPath = Path.Combine(FolderHelper.ControllerInternalBaseSource, "Download");

        private readonly ILogger<DownloadBrowserController> _logger;

        public DownloadBrowserController(ILogger<DownloadBrowserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<DownloadItem> GetDownloads()
        {
            List<DownloadItem> items = new List<DownloadItem>();

            try
            {
                string file = Path.Combine(RootPath, "projects.json");
                JsonReader reader = new(file);

                JArray array = reader.Token as JArray ?? new JArray();
                foreach (JToken obj in array)
                {
                    try
                    {
                        string key = obj["key"]?.ToString() ?? "";
                        string name = obj["name"]?.ToString() ?? "";
                        string desc = obj["desc"]?.ToString() ?? "";
                        string github = obj["github"]?.ToString() ?? "";

                        if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(desc))
                            continue;

                        DownloadItem item = new DownloadItem
                        {
                            Key = key,
                            Name = name,
                            Description = desc,
                            Github = github
                        };

                        JArray binarys = obj["bin"] as JArray ?? new JArray();
                        foreach (JObject binary in binarys)
                        {
                            string system = binary["system"]?.ToString() ?? "";
                            if (string.IsNullOrEmpty(system))
                                continue;

                            DownloadItemBinarySource binarySource = new DownloadItemBinarySource
                            {
                                System = system
                            };

                            JObject binItem = binary["binary"] as JObject ?? new JObject();
                            IEnumerable<JProperty> binItemKeys = binItem.Properties();
                            foreach (JProperty binItemKey in binItemKeys)
                            {
                                string binItemKeyName = binItemKey.Name;
                                JObject binItemKeyValue = binItemKey.Value as JObject ?? new JObject();

                                string address = binItemKeyValue["addr"]?.ToString() ?? "";
                                string url = binItemKeyValue["url"]?.ToString() ?? "";

                                if (string.IsNullOrEmpty(binItemKeyName) || string.IsNullOrEmpty(address) || string.IsNullOrEmpty(url))
                                    continue;

                                DownloadItemBinarySourceItem binarySourceItem = new()
                                {
                                    Address = address,
                                    Url = url
                                };

                                if (!binarySource.Binary.ContainsKey(binItemKeyName))
                                    binarySource.Binary.Add(binItemKeyName, binarySourceItem);
                            }

                            item.Binary.Add(binarySource);
                        }

                        items.Add(item);
                    }
                    catch
                    {

                    }
                }
            }
            catch
            {

            }

            return items;
        }
    }
}
