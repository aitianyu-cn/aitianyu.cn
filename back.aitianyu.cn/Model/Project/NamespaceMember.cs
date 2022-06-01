namespace back.aitianyu.cn.Model.Project
{
    public class NamespaceMember
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;

        public List<NamespaceMemberDef> MemberDefs { get; set; } = new List<NamespaceMemberDef>();
        public NamespaceMemberItems MemberItems { get; set; } = new NamespaceMemberItems();
    }
}
