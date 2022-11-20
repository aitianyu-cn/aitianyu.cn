using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Tianyu.Server.Common.Services
{
    public class JsonFileReader
    {
        private readonly JToken _json;

        public JsonFileReader(string jsonPath)
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
