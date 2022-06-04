namespace aitianyu.cn.Model
{
    public class APIBrowserProjectMacrodef
    {
        public string Macro { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string File { get; set; } = string.Empty;
    }

    public class APIBrowserProjectGlobal
    {
        public IList<string> Namespaces { get; set; } = new List<string>();

        public IList<APIBrowserProjectMacrodef> Macros { get; set; } = new List<APIBrowserProjectMacrodef>();
    }
}
