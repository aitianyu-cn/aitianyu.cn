namespace back.aitianyu.cn.Utils.Manager
{
    public delegate void TokenItemTimeoutInvoker(string token);

    public class TokenItem
    {
        public string Token { get; set; } = string.Empty;

        public bool IsValid { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int TenancyTerm { get; set; }

        private readonly System.Timers.Timer _timer;
        private readonly TokenItemTimeoutInvoker _timeInvoker;

        public TokenItem(TokenItemTimeoutInvoker invoker)
        {
            _timeInvoker = invoker;
            _timer = new();
            _timer.Elapsed += TimeoutCallback;
        }

        public void SetInvalid()
        {
            IsValid = false;

            if (_timer.Enabled)
                _timer.Stop();
        }

        public int SetValid()
        {
            IsValid = true;

            Random random = new();
            int tenancy = random.Next(60000, 300000);
            TenancyTerm = tenancy + 10000;

            _timer.Interval = TenancyTerm;
            _timer.AutoReset = false;
            _timer.Start();

            return tenancy;
        }

        private void TimeoutCallback(object? sender, EventArgs args)
        {
            _timeInvoker(Token);
        }
    }
}
