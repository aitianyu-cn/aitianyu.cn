using System.Collections.Concurrent;
using Tianyu.Server.Common.Services;

namespace Tianyu.Server.Project.Download.Utils
{
    public class I18nHelper
    {
        private static ConcurrentDictionary<string, JsonFileReader> _files = new ConcurrentDictionary<string, JsonFileReader>();

        public static JsonFileReader GetReader(string language)
        {
            string path = string.Format(@"C:\Dev\aitianyu.cn\ts-server\I18n\Project\basic_{0}.json", language);

            FileInfo fileInfo = new FileInfo(path);
            string filePath = fileInfo.FullName;

            if (_files.TryGetValue(filePath, out JsonFileReader? value) && value != null) {
                return value;
            }

            JsonFileReader newReader = new JsonFileReader(filePath);
            _files.AddOrUpdate(filePath, newReader, (string file, JsonFileReader value) => newReader);

            return newReader;
        }
    }
}
