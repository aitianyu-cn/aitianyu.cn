namespace Tianyu.Server.Generic.Models.Features
{
    public class FeatureItem
    {
        public string description { get; set; } = string.Empty;
        public string version { get; set; } = string.Empty;
        public string reqId { get; set; } = string.Empty;
        public string[] depFeature { get; set; } = Array.Empty<string>();
        public bool defaultOn { get; set; } = false;
    }
}