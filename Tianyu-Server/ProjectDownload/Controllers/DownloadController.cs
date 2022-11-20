using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Tianyu.Server.Common.Services;
using Tianyu.Server.Common.Utils;
using Tianyu.Server.Project.Download.Models;
using Tianyu.Server.Project.Download.Utils;

namespace Tianyu.Server.Project.Download.Controllers
{
    [ApiController]
    [Route("aitianyu/cn/project/download")]
    public class DownloadController : Controller
    {
        private const string ProjectDownloadsSql = "SELECT `system`, `name`, `address`, `url` FROM aitianyu_base.project_downloads where `key`='{0}';";

        public IEnumerable<DownloadItem> GetDownloads()
        {
            HttpRequest request = Request;
            string queryLanguage = "";
            if (0 < request.Headers.AcceptLanguage.Count)
                queryLanguage = request.Headers.AcceptLanguage[0];
            string language = RequestTool.GetLanguageFromQuery(queryLanguage);
            if (string.IsNullOrEmpty(language) || string.IsNullOrWhiteSpace(language))
                language = RequestTool.GetLanguageFromCookie(request.Cookies.ToArray());
            if (string.IsNullOrEmpty(language) || string.IsNullOrWhiteSpace(language))
                language = RequestTool.GetLanguageByDefault();

            List<DownloadItem> items = ProjectHelper.GetDownloads();
            try
            {
                JsonFileReader messageBundle = I18nHelper.GetReader(language);
                foreach (DownloadItem item in items)
                {
                    item.Name = messageBundle[item.Name]?.ToString() ?? item.Name;
                    item.Description = messageBundle[item.Description]?.ToString() ?? item.Description;

                    DatabaseService db = DBHelper.GetDBCenter("aitianyu_base");
                    try
                    {
                        string sql = string.Format(ProjectDownloadsSql, item.Key);
                        db.Execute(sql, (MySqlDataReader reader) =>
                        {
                            Dictionary<string, DownloadItemBinarySource> binarys = new();

                            while (reader.Read())
                            {
                                try
                                {
                                    string system = reader.GetString("system");
                                    string name = reader.GetString("name");
                                    string address = reader.GetString("address");
                                    string url = reader.GetString("url");

                                    if (!binarys.TryGetValue(system, out DownloadItemBinarySource? downloadItemBinarySource))
                                    {
                                        downloadItemBinarySource = new DownloadItemBinarySource
                                        {
                                            System = system
                                        };

                                        binarys.Add(system, downloadItemBinarySource);
                                    }

                                    downloadItemBinarySource.Binary.Add(name, new DownloadItemBinarySourceItem
                                    {
                                        Address = address,
                                        Url = url
                                    });
                                }
                                catch
                                {

                                }
                            }

                            item.Binary.AddRange(binarys.Values);
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

            return items;
        }
    }
}
