using aitianyu.cn.Model;
using aitianyu.cn.Utils;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;

namespace aitianyu.cn.Controllers
{
    [ApiController]
    [Route("project_docs/[controller]")]
    public class APIBrowserController : ControllerBase
    {
        private static string[] DefaultDataType = new string[] {"::string", "int", "short", "long", "char", "uchar", "byte", "sbyte", "int32", "int16", "int64", "uint32", "uint16", "uint64", "bool", "double", "float"};

        private const string CppAPIMacroDefineSql = "SELECT * FROM cpp_api.macrodef;";
        private const string CppAPIProjectNamespaceSql = "SELECT * FROM cpp_api.namespace;";
        private const string CppAPINamespaceSqlFormat = "SELECT `name`, `i18n`, `prototype`, `file`, `define` FROM cpp_api.types where namespace = '{0}';";
        private const string CppAPITypesSqlFormat = "SELECT `name`, `i18n`, `prototype`, `define` FROM cpp_api.container where namespace = '{0}' and belong = '{1}';";

        private readonly ILogger<APIBrowserController> _logger;
        private readonly Dictionary<string, DatabaseCenter> _databases;

        public APIBrowserController(ILogger<APIBrowserController> logger)
        {
            _logger = logger;

            _databases = new Dictionary<string, DatabaseCenter>();

            _databases.Add("tianyu-native", new DatabaseCenter("cpp_api"));
        }

        [HttpGet]
        public IEnumerable<string> GetAPIProjects()
        {
            JsonReader jsonReader = new JsonReader(@".\res\project\projects.json");
            JArray projects = jsonReader["projects"] as JArray ?? new JArray();

            List<string> projectList = new();
            foreach (JValue project in projects)
                projectList.Add(project.ToString());

            return projectList.ToArray();
        }

        [HttpGet("{projectName}")]
        public APIBrowserProjectGlobal GetAPIProjectNamespace(string projectName)
        {
            APIBrowserProjectGlobal aPIBrowserProjectGlobal = new();
            try
            {
                if (_databases.TryGetValue(projectName, out DatabaseCenter? value) && value is not null)
                {
                    value.Execute(CppAPIProjectNamespaceSql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                string formattedNamespace = reader.GetString("name").Replace("::", "_");
                                aPIBrowserProjectGlobal.Namespaces.Add(formattedNamespace);
                            }
                            catch { }
                        }
                    });
                    
                    value.Execute(CppAPIMacroDefineSql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                APIBrowserProjectMacrodef macrodef = new()
                                {
                                    Macro = reader.GetString("macro"),
                                    Value = reader.GetString("value"),
                                    File = reader.GetString("file")
                                };
                                aPIBrowserProjectGlobal.Macros.Add(macrodef);
                            }
                            catch { }
                        }
                    });
                }
            }
            catch { }

            return aPIBrowserProjectGlobal;
        }

        [HttpGet("{projectName}/{nameSpace}")]
        public IEnumerable<APIBrowserNamespaceMember> GetAPIProjectNamespace(string projectName, string nameSpace)
        {
            string formatNamespace = nameSpace.Replace("_", "::");
            string sql = string.Format(CppAPINamespaceSqlFormat, formatNamespace);

            Regex regex = new Regex(".*_[0-9]+");

            List<APIBrowserNamespaceMember> apiBrowserMembers = new List<APIBrowserNamespaceMember>();
            try
            {
                if (_databases.TryGetValue(projectName, out DatabaseCenter? value) && value is not null)
                {
                    value.Execute(sql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                string rawName = reader.GetString("name");
                                string translatedName = rawName;
                                if (regex.IsMatch(rawName))
                                {
                                    int i = rawName.Length - 1;
                                    for (; i >= 0;)
                                    {
                                        if ('0' <= rawName[i] && '9' >= rawName[i])
                                            --i;
                                        else
                                        {
                                            //if ('_' == rawName[i])
                                            //    --i;
                                            break;
                                        }
                                    }

                                    translatedName = translatedName.Substring(0, i);
                                }

                                APIBrowserNamespaceMember member = new()
                                {
                                    Name = translatedName,
                                    I18n = reader.GetString("i18n"),
                                    File = reader.GetString("file"),
                                    Def = reader.GetString("define"),
                                    Type = reader.GetString("prototype"),
                                };

                                apiBrowserMembers.Add(member);
                            }
                            catch
                            {

                            }
                        }
                    });
                }
            }
            catch
            {
                
            }

            return apiBrowserMembers;
        }

        [HttpGet("{projectName}/{nameSpace}/{dataType}")]
        public IEnumerable<APIBrowserDataTypeMember> GetAPIProjectNamespace(string projectName, string nameSpace, string dataType)
        {
            string formatNamespace = nameSpace.Replace("_", "::");
            string sql = string.Format(CppAPITypesSqlFormat, formatNamespace, dataType);

            Regex regex = new Regex(".*_[0-9]+");
            Regex regex_constructor = new Regex("[C|c]onstructor_[0-9]+");

            List<APIBrowserDataTypeMember> apiBrowserMembers = new List<APIBrowserDataTypeMember>();
            try
            {
                if (_databases.TryGetValue(projectName, out DatabaseCenter? value) && value is not null)
                {
                    value.Execute(sql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                string rawName = reader.GetString("name");
                                string translatedName = rawName;
                                if (regex.IsMatch(rawName))
                                {
                                    int i = rawName.Length - 1;
                                    for (; i >= 0;)
                                    {
                                        if ('0' <= rawName[i] && '9' >= rawName[i])
                                            --i;
                                        else
                                        {
                                            //if ('_' == rawName[i])
                                            //    --i;
                                            break;
                                        }
                                    }

                                    translatedName = translatedName.Substring(0, i);
                                }

                                string rawType = reader.GetString("prototype");
                                string translatedType = rawType;
                                if (translatedName.StartsWith("Construct", true, null))
                                    translatedType = "construct";
                                else if (Array.IndexOf(DefaultDataType, translatedName) != -1)
                                    translatedType = "operator";
                                else if (translatedName.StartsWith("operator", true, null))
                                {
                                    translatedType = "operator";
                                    translatedName = translatedName.ToLower() switch
                                    {
                                        "operator_ass" => "operator =",
                                        "operator_eq" => "operator ==",
                                        "operator_ne" => "operator !=",
                                        "operator_lt" => "operator <",
                                        "operator_le" => "operator <=",
                                        "operator_gt" => "operator >",
                                        "operator_ge" => "operator >=",

                                        "operator_add" => "operator +",
                                        "operator_add_ass" => "operator +=",
                                        "operator_sub" => "operator -",
                                        "operator_sub_ass" => "operator -=",
                                        "operator_mul" => "operator *",
                                        "operator_mul_ass" => "operator *=",
                                        "operator_div" => "operator /",
                                        "operator_div_ass" => "operator /=",
                                        "operator_mod" => "operator %",
                                        "operator_mod_ass" => "operator %=",
                                        "operator_aand" => "operator &",
                                        "operator_aand_ass" => "operator &=",
                                        "operator_aor" => "operator |",
                                        "operator_aor_ass" => "operator |=",
                                        "operator_axor" => "operator ^",
                                        "operator_axor_ass" => "operator ^=",
                                        "operator_lmove" => "operator <<",
                                        "operator_lmove_ass" => "operator <<=",
                                        "operator_rmove" => "operator >>",
                                        "operator_rmove_ass" => "operator >>=",
                                        "operator_anot" => "operator ~",
                                        "operator_lnot" => "operator !",
                                        "operator_sd" => "operator --",
                                        "operator_si" => "operator ++",
                                        "operator_land" => "operator &&",
                                        "operator_land_ass" => "operator &&=",
                                        "operator_lor" => "operator |=",
                                        "operator_lor_ass" => "operator ||=",
                                        _ => translatedName
                                    };
                                }


                                APIBrowserDataTypeMember member = new()
                                {
                                    Name = translatedName,
                                    I18n = reader.GetString("i18n"),
                                    Def = reader.GetString("define"),
                                    Type = translatedType,
                                };

                                apiBrowserMembers.Add(member);
                            }
                            catch
                            {

                            }
                        }
                    });
                }
            }
            catch
            {

            }

            return apiBrowserMembers;
        }
    }
}
