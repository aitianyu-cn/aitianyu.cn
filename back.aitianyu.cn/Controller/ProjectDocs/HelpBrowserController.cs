﻿using back.aitianyu.cn.Utils;
using Microsoft.AspNetCore.Mvc;

namespace back.aitianyu.cn.Controller.ProjectDocs
{
    [ApiController]
    [Route("project_docs/[controller]")]
    public class HelpBrowserController
    {
        private static string RootPath = Path.Combine(FolderHelper.ControllerInternalBaseSource, "Project/Help");

        private readonly ILogger<HelpBrowserController> _logger;

        public HelpBrowserController(ILogger<HelpBrowserController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{projectName}")]
        public string GetProjectHelp(string projectName)
        {
            return GetProjectHelp(projectName, "zh_CN");
        }

        [HttpGet("{projectName}/{language}")]
        public string GetProjectHelp(string projectName, string language)
        {
            try
            {
                string file = Path.Combine(RootPath, projectName);
            }
            catch
            {

            }

            return "{}";
        }
    }
}
