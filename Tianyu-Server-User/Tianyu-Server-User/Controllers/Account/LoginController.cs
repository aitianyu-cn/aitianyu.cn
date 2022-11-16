using Microsoft.AspNetCore.Mvc;
using ts_webapi_core.Model.Account;
using ts_webapi_core.Service;

namespace Tianyu.Server.User.Controllers.Account
{
    [Route("aitianyu/cn/user/account/login")]
    [ApiController]
    public class LoginController : Controller
    {
        private static string CLIENT_COOKIE_IDENTIFY_NAME = "TIANYU_xID";
        private static string CLIENT_COOKIE_TOKEN_NAME = "TIANYU_cID";

        [HttpGet]
        public LoginResult get()
        {
            HttpRequest request = Request;

            string identify = string.Empty;
            string token = string.Empty;

            IRequestCookieCollection cookies = request.Cookies;
            foreach (KeyValuePair<string, string> cookie in cookies)
            {
                if (cookie.Key == CLIENT_COOKIE_IDENTIFY_NAME)
                    identify = cookie.Value;
                else if (cookie.Key == CLIENT_COOKIE_TOKEN_NAME)
                    token = cookie.Value;
            }

            return UserOnlineServer.Instance.Login(identify, token);
        }

        [HttpPost]
        public LoginResult post([FromBody] LoginPost body)
        {
            return UserOnlineServer.Instance.Login
                (
                body.user, 
                LoginHelper.ConvertUserType(body.userType), 
                body.password, 
                body.identify
                );
        }
    }
}
