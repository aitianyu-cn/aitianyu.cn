using back.aitianyu.cn.Model.Project;
using back.aitianyu.cn.Utils;
using back.aitianyu.cn.Utils.File;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections.Concurrent;
using System.Text.RegularExpressions;

namespace back.aitianyu.cn.Controller.ProjectDocs
{
    [ApiController]
    [Route("project_docs/[controller]")]
    public class APIBrowserController
    {
        private const string NamespaceSql = "SELECT * FROM {0}.namespace;";
        private const string NamespaceMembersSql = "SELECT `name` FROM {0}.types where namespace = '{1}';";
        private const string NamespaceMemberItemSql = "SELECT `name`, `i18n`, `prototype`, `file`, `define` FROM {0}.types where namespace = '{1}' and name like '{2}%';";
        private const string NamespaceMemberTypesSql = "SELECT `name`, `i18n`, `prototype`, `define` FROM cpp_api.container where namespace = '{0}' and belong = '{1}';";
        private const string NamespaceMemberTypeItemSql = "SELECT `name`, `i18n`, `prototype`, `define` FROM cpp_api.container where namespace = '{0}' and belong = '{1}' and name = '{2}';";
        private const string NamespaceI18nFormatter = "DTY_PROJECTS_{0}_API_NAMESPACE_{1}";
        private const string NamespaceRequestFormatter = "::{0}";

        private readonly ILogger<APIBrowserController> _logger;

        public APIBrowserController(ILogger<APIBrowserController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// APIBrowser Root
        /// 获取API参考 （namespace/package）
        /// </summary>
        /// <param name="projectName">项目名称</param>
        /// <returns>返回namespace/package结果集</returns>
        [HttpGet("{projectName}")]
        public IEnumerable<NamespaceItem> GetAPIProjectPackage(string projectName)
        {
            List<NamespaceItem> items = new();

            try
            {
                DatabaseCenter? db = DBHelper.GetDBCenter(projectName);
                if (db is not null)
                {
                    string sql = string.Format(NamespaceSql, db.DatabaseName);
                    db.Execute(sql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                NamespaceItem? item = _ProcessNamespace(reader.GetString("name"), db.DatabaseName);

                                if (item != null)
                                    items.Add(item);
                            }
                            catch
                            {

                            }
                        }
                    }, SqlExecuteFailedCallback);
                }
            }
            catch
            {

            }

            return items;
        }

        /// <summary>
        /// APIBrowser Namespace
        /// 获取API Namespace/Package参考 （namespace/package）
        /// </summary>
        /// <param name="projectName">项目名称</param>
        /// <param name="namespaceName">命名空间名称（格式化后的名称）</param>
        /// <returns>返回Namespace/Package内容集</returns>
        [HttpGet("{projectName}/{namespaceName}")]
        public IEnumerable<string> GetAPINamespacePackage(string projectName, string namespaceName)
        {
            string namespaceNameFormatted = _ProcessNamespace(namespaceName);
            if (string.IsNullOrEmpty(namespaceNameFormatted))
                return Enumerable.Empty<string>();

            List<string> items = new();

            try
            {
                DatabaseCenter? db = DBHelper.GetDBCenter(projectName);

                Regex regex = new(".*_[0-9]+");

                if (db is not null)
                {
                    string sql = string.Format(NamespaceMembersSql, db.DatabaseName, namespaceNameFormatted);
                    db.Execute(sql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                string memberName = _ProcessNamespaceMemberName(reader.GetString("name"), regex);

                                if (!string.IsNullOrEmpty(memberName) && !items.Contains(memberName))
                                    items.Add(memberName);
                            }
                            catch
                            {

                            }
                        }
                    }, SqlExecuteFailedCallback);
                }
            }
            catch
            {

            }

            return items;
        }

        /// <summary>
        /// APIBrowser DataType
        /// 获取API DataType参考
        /// </summary>
        /// <param name="projectName">项目名称</param>
        /// <param name="namespaceName">命名空间名称（格式化后的名称）</param>
        /// <param name="memberName">数据类型/函数名称</param>
        /// <returns>返回数据类型/函数内容集</returns>
        [HttpGet("{projectName}/{namespaceName}/{memberName}")]
        public NamespaceMember GetAPINamespaceMember(string projectName, string namespaceName, string memberName)
        {
            string namespaceNameFormatted = _ProcessNamespace(namespaceName);

            NamespaceMember member = new();

            if (!string.IsNullOrEmpty(namespaceNameFormatted))
            {
                NamespaceMemberDef[] defs = _GetNamespaceMembers(projectName, namespaceNameFormatted, memberName, out string datatype);
                if (!string.IsNullOrEmpty(datatype) && defs.Length > 0)
                {
                    // set default data
                    member.MemberDefs.AddRange(defs);
                    member.Name = memberName;
                    member.Type = datatype;

                    // only when the type is not function and only one data type is defined to fill the internal member item.
                    if (defs.Length == 1 && datatype != "function")
                        _FillNamespaceMemberItem(projectName, namespaceNameFormatted, memberName, member.MemberItems);
                }
            }

            return member;
        }

        /// <summary>
        /// APIBrowser DataType Member
        /// 获取API DataType Member参考
        /// </summary>
        /// <param name="projectName">项目名称</param>
        /// <param name="namespaceName">命名空间名称（格式化后的名称）</param>
        /// <param name="memberName">数据类型名称</param>
        /// <param name="memberItem">数据类型内部成员名称</param>
        /// <returns>返回数据类型成员信息</returns>
        [HttpGet("{projectName}/{namespaceName}/{memberName}/{memberItem}")]
        public NamespaceDataTypeMemberItem GetAPINamespaceMemberItem(string projectName, string namespaceName, string memberName, string memberItem)
        {
            string namespaceNameFormatted = _ProcessNamespace(namespaceName);

            NamespaceDataTypeMemberItem item = new();

            if (!string.IsNullOrEmpty(namespaceNameFormatted))
            {
                try
                {
                    DatabaseCenter? db = DBHelper.GetDBCenter(projectName);
                    if (db is not null)
                    {
                        string sql = string.Format(NamespaceMemberTypeItemSql, namespaceNameFormatted, memberName, memberItem);
                        db.Execute(sql, (MySqlDataReader reader) =>
                        {
                            if (reader.Read())
                            {
                                try
                                {
                                    item.Name = memberItem;
                                    item.Def = reader.GetString("define");
                                    item.Type = reader.GetString("prototype");
                                    item.I18n = reader.GetString("i18n");

                                    // item.example to add later;
                                    // item.parameters data
                                    // item.exceptions data
                                }
                                catch
                                {

                                }
                            }
                        }, SqlExecuteFailedCallback);
                    }
                }
                catch
                {

                }
            }

            return item;
        }

#pragma warning disable IDE1006 // 命名样式
        private static string _ProcessNamespace(string namespaceSource)
#pragma warning restore IDE1006 // 命名样式
        {
            if (string.IsNullOrEmpty(namespaceSource))
                return string.Empty;

            if ("global" == namespaceSource)
                return "::";

            return string.Format(NamespaceRequestFormatter, namespaceSource.Replace(".", "::"));
        }

#pragma warning disable IDE1006 // 命名样式
        private static NamespaceItem? _ProcessNamespace(string namespaceSource, string dbname)
#pragma warning restore IDE1006 // 命名样式
        {
            if (string.IsNullOrEmpty(namespaceSource))
                return null;

            if ("::" == namespaceSource)
            {
                return new NamespaceItem
                {
                    Id = "global",
                    Def = namespaceSource,
                    I18n = _GenerateNamespaceI18n("global", dbname)
                };
            }

            string namespaceId = namespaceSource.TrimStart(':').Replace("::", ".");
            return new NamespaceItem()
            {
                Id = namespaceId,
                Def = namespaceSource,
                I18n = _GenerateNamespaceI18n(namespaceId, dbname)
            };
        }

#pragma warning disable IDE1006 // 命名样式
        private static string _GenerateNamespaceI18n(string id, string dbname)
#pragma warning restore IDE1006 // 命名样式
        {
            string formattedId = id.Replace(".", "_").ToUpper();
            string formattedDBName = dbname.ToUpper();
            return string.Format(NamespaceI18nFormatter, formattedDBName, formattedId);
        }

#pragma warning disable IDE1006 // 命名样式
        private static string _ProcessNamespaceMemberName(string memberName, Regex regex)
#pragma warning restore IDE1006 // 命名样式
        {
            string translatedName = memberName;

            if (regex.IsMatch(memberName))
            {
                int i = memberName.Length - 1;
                for (; i >= 0;)
                {
                    if ('0' <= memberName[i] && '9' >= memberName[i])
                        --i;
                    else
                        break;
                }

                translatedName = translatedName[..i];
            }

            return translatedName;
        }

#pragma warning disable IDE1006 // 命名样式
        private NamespaceMemberDef[] _GetNamespaceMembers(string projectName, string namespaceNameFormatted, string memberName, out string memberType)
#pragma warning restore IDE1006 // 命名样式
        {
            memberType = string.Empty;
            List<NamespaceMemberDef> namespaceMembers = new();

            try
            {
                string memberPrototype = string.Empty;
                DatabaseCenter? db = DBHelper.GetDBCenter(projectName);
                if (db is not null)
                {
                    string sql = string.Format(NamespaceMemberItemSql, db.DatabaseName, namespaceNameFormatted, memberName);
                    db.Execute(sql, (MySqlDataReader reader) =>
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                memberPrototype = string.IsNullOrEmpty(memberPrototype) ? reader.GetString("prototype") : memberPrototype;

                                NamespaceMemberDef def = new()
                                {
                                    Name = reader.GetString("name"),
                                    I18n = reader.GetString("i18n"),
                                    File = reader.GetString("file"),
                                    Def = reader.GetString("define")
                                };
                                // To do: to add code example later;

                                namespaceMembers.Add(def);

                                if ("function" != memberPrototype)
                                    break;
                            }
                            catch
                            {

                            }
                        }
                    }, SqlExecuteFailedCallback);
                }

                memberType = memberPrototype;
            }
            catch
            {

            }

            return namespaceMembers.ToArray();
        }

#pragma warning disable IDE1006 // 命名样式
        private void _FillNamespaceMemberItem(string projectName, string namespaceNameFormatted, string memberName, NamespaceMemberItems items)
#pragma warning restore IDE1006 // 命名样式
        {
            try
            {
                DatabaseCenter? db = DBHelper.GetDBCenter(projectName);
                if (db is null)
                    return;

                string sql = string.Format(NamespaceMemberTypesSql, namespaceNameFormatted, memberName);
                db.Execute(sql, (MySqlDataReader reader) =>
                {
                    while (reader.Read())
                    {
                        try
                        {
                            NamespaceMemberItem item = _ProcessFillNamespaceMemberItem(reader);
                            // To do: to add code example later;

                            switch (item.Type)
                            {
                                case "construct":
                                    items.Constructor.Add(item);
                                    break;
                                case "method":
                                    items.Method.Add(item);
                                    break;
                                case "operator":
                                    items.Operator.Add(item);
                                    break;
                                case "enum":
                                case "property":
                                    items.Property.Add(item);
                                    break;
                            }
                        }
                        catch
                        {

                        }
                    }
                }, SqlExecuteFailedCallback);
            }
            catch
            {

            }
        }

#pragma warning disable IDE1006 // 命名样式
        private static NamespaceMemberItem _ProcessFillNamespaceMemberItem(MySqlDataReader reader)
#pragma warning restore IDE1006 // 命名样式
        {
            string rawName = reader.GetString("name");
            string translatedName = rawName;

            string define = reader.GetString("define");

            string rawType = reader.GetString("prototype");
            string translatedType = rawType;
            if (rawName.StartsWith("Construct", true, null))
                translatedType = "construct";
            else if (define.Contains("operator", StringComparison.OrdinalIgnoreCase))
            {
                translatedType = "operator";
                string translatedNameLower = translatedName.ToLower();
                translatedName = translatedNameLower switch
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
                    _ => translatedNameLower.Contains("operator", StringComparison.OrdinalIgnoreCase) ? translatedName : string.Format("({0})", translatedName)
                };
            }

            NamespaceMemberItem item = new()
            {
                Key = rawName,
                Name = translatedName,
                I18n = reader.GetString("i18n"),
                Def = reader.GetString("define"),
                Type = translatedType,
            };

            return item;
        }

        private void SqlExecuteFailedCallback(string msg)
        {
#pragma warning disable CA2254 // 模板应为静态表达式
            _logger.LogError(message: msg);
#pragma warning restore CA2254 // 模板应为静态表达式
        }
    }
}
