namespace back.aitianyu.cn.Model.Project
{
    public class ProjectItem
    {
        public string Name { get; set; } = string.Empty;
        public string I18n { get; set; } = string.Empty;
        public string Path { get; set; } = string.Empty;
        public IList<KeyValuePair<string, string>> Options { get; set; } = new List<KeyValuePair<string, string>>();
    }
}
