using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace back.aitianyu.cn.Utils.File
{
    public class JsonReader
    {
        private readonly JToken _json;

        public JsonReader(string jsonPath)
        {
            if (jsonPath == null)
                throw new ArgumentNullException(nameof(jsonPath));

            using var stream = System.IO.File.OpenRead(jsonPath);
            TextReader reader = new StreamReader(stream);
            using JsonTextReader jReader = new(reader);
            _json = JToken.ReadFrom(jReader);
        }

        public JToken Token => _json;

        public JToken? this[string key]
        {
            get => _json[key];
        }
    }
}
