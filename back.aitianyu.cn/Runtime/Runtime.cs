using back.aitianyu.cn.Utils.File;
using System.Collections.Concurrent;

namespace back.aitianyu.cn.Runtime
{
    public class Runtime
    {
        public static ConcurrentDictionary<string, string> ProjectDBs { get; set; } = new ConcurrentDictionary<string, string>();
        public static ConcurrentDictionary<string, DatabaseCenter> DBCenters { get; set; } = new ConcurrentDictionary<string, DatabaseCenter>();
    }
}
