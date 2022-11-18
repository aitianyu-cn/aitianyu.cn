
using Microsoft.AspNetCore.Mvc;
using Tianyu.Server.Generic.Models.Features;

namespace Tianyu.Server.Generic.Controllers.Features
{
    [ApiController]
    [Route("aitianyu/cn/generic/features/feature-toggle")]
    public class FeatureToggleController : Controller
    {
        [HttpGet]
        public Dictionary<string, FeatureItem> get()
        {
            return GetGlobal();
        }


        [HttpPost]
        public Dictionary<string, FeatureItem> Post([FromBody] string[] projects)
        {
            Dictionary<string, FeatureItem> features = GetGlobal(false);

            return features;
        }

        private Dictionary<string, FeatureItem> GetGlobal(bool forceMutex = true)
        {
            Dictionary<string, FeatureItem> features = new Dictionary<string, FeatureItem>();

            return features;
        }
    }
}