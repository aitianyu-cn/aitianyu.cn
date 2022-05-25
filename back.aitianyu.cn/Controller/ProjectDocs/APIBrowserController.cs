using Microsoft.AspNetCore.Mvc;

namespace back.aitianyu.cn.Controller.ProjectDocs
{
    [ApiController]
    [Route("project_docs/[controller]")]
    public class APIBrowserController
    {
        private readonly ILogger<APIBrowserController> _logger;

        public APIBrowserController(ILogger<APIBrowserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<string> GetAPIProjects()
        {
            return new string[] {"123", "456"};
        }
    }
}
