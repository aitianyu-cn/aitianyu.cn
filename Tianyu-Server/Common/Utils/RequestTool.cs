using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tianyu.Server.Common.Utils
{
    public class RequestTool
    {
        private const string DefaultLanguage = "zh-CN";

        public static string GetLanguageFromQuery(string queryLanguage)
        {
            return "";
        }
        
        public static string GetLanguageFromCookie(KeyValuePair<string, string>[] cookies)
        {
            return "";
        }

        public static string GetLanguageByDefault()
        {
            return DefaultLanguage;
        }
    }
}
