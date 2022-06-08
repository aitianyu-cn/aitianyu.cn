namespace back.aitianyu.cn.Model.Manager
{
    public class Login
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Streaming { get; set; } = string.Empty;
    }

    public class LoginResult
    {
        public int State { get; set; }
        public string Error { get; set; } = string.Empty;
        public LoginToken Token { get; set; } = new();
    }
}