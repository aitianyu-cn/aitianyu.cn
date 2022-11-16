using Microsoft.AspNetCore.Mvc;

namespace Tianyu.Server.User.Controllers.Account
{
    [Route("aitianyu/cn/user/account/logon")]
    [ApiController]
    public class LogonController : Controller
    {
        [HttpPost]
        public string post([FromBody] string name)
        {
            return name;
        }
    }
}
