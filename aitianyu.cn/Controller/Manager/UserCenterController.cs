using back.aitianyu.cn.Model.Manager;
using Microsoft.AspNetCore.Mvc;

namespace back.aitianyu.cn.Controller.Manager
{
    [ApiController]
    [Route("manager/[controller]")]
    public class UserCenterController
    {
        [ HttpGet("login/{userName}/{passWord}/{streaming}")]
        public LoginResult Login(string userName, string password, string streaming)
        {
            Login loginData = new()
            {
                UserName = userName,
                Password = password,
                Streaming = streaming
            };

            return Runtime.Runtime.UserToken.TakeToken(loginData);
        }

        [HttpGet("renew/{token}/{streaming}")]
        public LoginResult Renew(string token, string streaming)
        {
            return Runtime.Runtime.UserToken.RenewToken(token, streaming);
        }
    }
}
