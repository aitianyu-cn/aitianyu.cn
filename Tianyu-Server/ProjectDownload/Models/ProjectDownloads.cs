namespace Tianyu.Server.Project.Download.Models
{
    public class DownloadItem
    {
        public string Key { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string I18n { get; set; } = string.Empty;
        public string Github { get; set; } = string.Empty;
        public List<DownloadItemBinarySource> Binary { get; set; } = new();
    }

    public class DownloadItemBinarySource
    {
        public string System { get; set; } = string.Empty;
        public Dictionary<string, DownloadItemBinarySourceItem> Binary { get; set; } = new Dictionary<string, DownloadItemBinarySourceItem>();
    }

    public class DownloadItemBinarySourceItem
    {
        public string Address { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }
}
