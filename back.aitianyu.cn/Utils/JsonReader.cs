using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace aitianyu.cn.Utils
{
    public class JsonReader
    {
        private readonly JObject _json;

        public JsonReader(string jsonPath)
        {
            if (jsonPath == null)
                throw new ArgumentNullException(nameof(jsonPath));

            using var stream = File.OpenRead(jsonPath);
            TextReader reader = new StreamReader(stream);
            using JsonTextReader jReader = new(reader);
            _json = JToken.ReadFrom(jReader) as JObject ?? new JObject();
        }

        public JToken? this[string key]
        {
            get => _json[key];
        }
    }
}
