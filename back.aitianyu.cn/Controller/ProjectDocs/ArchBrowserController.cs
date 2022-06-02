using Microsoft.AspNetCore.Mvc;

namespace back.aitianyu.cn.Controller.ProjectDocs
{
    [ApiController]
    [Route("project_docs/[controller]")]
    public class ArchBrowserController
    {
        private readonly ILogger<ArchBrowserController> _logger;

        public ArchBrowserController(ILogger<ArchBrowserController> logger)
        {
            _logger = logger;
        }
    }
}
