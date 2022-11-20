using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tianyu.Server.Common.Models.Service
{
    public class DBServiceConnection
    {
        public string host { get; set; } = string.Empty;
        public string database { get; set; } = string.Empty;
        public string userId { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string charset { get; set; } = "utf8";
        public bool pooling { get; set; } = false;
    }
}
