﻿using back.aitianyu.cn.Model.Download;
using back.aitianyu.cn.Utils;
using back.aitianyu.cn.Utils.File;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;

namespace back.aitianyu.cn.Controller.Download
{
    [ApiController]
    [Route("project_download/[controller]")]
    public class DownloadBrowserController
    {
        private const string ProjectDownloadsSql = "SELECT `system`, `name`, `address`, `url` FROM aitianyu_base.project_downloads where `key`='{0}';";

        private readonly ILogger<DownloadBrowserController> _logger;

        public DownloadBrowserController(ILogger<DownloadBrowserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<DownloadItem> GetDownloads()
        {
            List<DownloadItem> items = ProjectHelper.GetDownloads();

            try
            {
                foreach (DownloadItem item in items)
                {
                    DatabaseCenter? db = DBHelper.GetDBCenter(Initial.AiTianyuBaseDB);
                    if (db != null)
                    {
                        try
                        {
                            string sql = string.Format(ProjectDownloadsSql, item.Key);
                            db.Execute(sql, (MySqlDataReader reader) =>
                            {
                                Dictionary<string, DownloadItemBinarySource> binarys = new Dictionary<string, DownloadItemBinarySource>();

                                while (reader.Read())
                                {
                                    try
                                    {
                                        string system = reader.GetString("system");
                                        string name = reader.GetString("name");
                                        string address = reader.GetString("address");
                                        string url = reader.GetString("url");

                                        DownloadItemBinarySource? downloadItemBinarySource = null;
                                        if (!binarys.TryGetValue(system, out downloadItemBinarySource))
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
            }
            catch
            {

            }

            return items;
        }
    }
}