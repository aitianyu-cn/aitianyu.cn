namespace back.aitianyu.cn.Model
{
    public class FeatureItem
    {
        public bool Enable { get; set; }
        public string Description { get; set; } = string.Empty;
        public List<string> Dependency { get; set; } = new List<string>();
    }
}
