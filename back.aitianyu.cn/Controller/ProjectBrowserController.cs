using Microsoft.AspNetCore.Mvc;

namespace back.aitianyu.cn.Controller
{
    [ApiController]
    [Route("/[controller]")]
    public class ProjectBrowserController
    {

        [HttpGet]
        public IEnumerable<string> GetAPIProjects()
        {
            return new string[] { "fafdfafaasdf" };
        }
    }
}
