using Microsoft.AspNetCore.Mvc;
using Tianyu.Server.User.Models;

namespace Tianyu.Server.User.Controllers
{
    [Route("aitianyu/cn/user/feature-toggle")]
    [ApiController]
    public class FeatureToggleController : Controller
    {
        [HttpGet]
        public Dictionary<string, bool> get()
        {
            Dictionary<string, bool> features = new Dictionary<string, bool>();
            HttpRequest request = Request;

            string identify = string.Empty;
            string token = string.Empty;

            IRequestCookieCollection cookies = request.Cookies;
            foreach (KeyValuePair<string, string> cookie in cookies)
            {
                if (cookie.Key == Definitions.CLIENT_COOKIE_IDENTIFY_NAME)
                    identify = cookie.Value;
                else if (cookie.Key == Definitions.CLIENT_COOKIE_TOKEN_NAME)
                    token = cookie.Value;
            }

            if (
                string.IsNullOrEmpty(token) || string.IsNullOrWhiteSpace(token)
                || string.IsNullOrEmpty(identify) || string.IsNullOrWhiteSpace(identify)
                )
            {
                return features;
            }

            if (!Tianyu.Server.User.Models.Runtime.IS_IN_DEVELOPMENT_MODE)
            {
                // not in development mode, to get the data from db
            }

            // read features from data base

            return features;
        }

        [HttpPost]
        public string post([FromBody] Dictionary<string, bool> features)
        {
            return Tianyu.Server.Common.Models.Definitions.OPERATION_FAILURE;
        }
    }
}