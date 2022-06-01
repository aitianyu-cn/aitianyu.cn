namespace back.aitianyu.cn.Model.Project
{
    public class NamespaceMemberDef
    {
        public string Name { get; set; } = string.Empty;
        public string I18n { get; set; } = string.Empty;
        public string File { get; set; } = string.Empty;
        public string Def { get; set; } = string.Empty;
        public IEnumerable<string> Example { get; set; } = Enumerable.Empty<string>();
    }

    public class NamespaceMemberItems
    {
        public List<NamespaceMemberItem> Constructor { get; set; } = new List<NamespaceMemberItem>();
        public List<NamespaceMemberItem> Property { get; set; } = new List<NamespaceMemberItem>();
        public List<NamespaceMemberItem> Operator { get; set; } = new List<NamespaceMemberItem>();
        public List<NamespaceMemberItem> Method { get; set; } = new List<NamespaceMemberItem>();
    }

    public class NamespaceMemberItem
    {
        public string Name { get; set; } = string.Empty;
        public string I18n { get; set; } = string.Empty;
        public string Def { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
    }

    public class NamespaceDataTypeMemberItemAdditional
    {
        public string DataType { get; set; } = string.Empty;
        public string I18n { get; set; } = string.Empty;
    }

    public class NamespaceDataTypeMemberItem : NamespaceMemberItem
    {
        public IEnumerable<string> Example { get; set; } = Enumerable.Empty<string>();
        public Dictionary<string, NamespaceDataTypeMemberItemAdditional> Parameters { get; set; } = new Dictionary<string, NamespaceDataTypeMemberItemAdditional>();
        public Dictionary<string, string> Return { get; set; } = new Dictionary<string, string>();
        public Dictionary<string, string> Exceptions { get; set; } = new Dictionary<string, string>();

        // here is additional data, contains parameters define and note.

        //  [
        //      "paramtersName": {
        //          "dataType": "",
        //          "i18n": ""
        //      }
        //  ]
    }
}
