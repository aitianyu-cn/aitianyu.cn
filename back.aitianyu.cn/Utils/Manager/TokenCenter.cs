using back.aitianyu.cn.Model.Manager;
using back.aitianyu.cn.Utils.File;
using MySql.Data.MySqlClient;
using System.Collections.Concurrent;

namespace back.aitianyu.cn.Utils.Manager
{
    public class TokenCenter
    {
        private const string UserInfoGetterSql = "SELECT count(*) as items FROM aitianyu_base.admins WHERE `user`='{0}' AND `pw`='{1}'";

        private readonly ConcurrentDictionary<string, TokenItem> _tokens;

        private readonly Mutex _mutex;

        public TokenCenter()
        {
            _tokens = new();
            _mutex = new();
        }

        public LoginResult TakeToken(Login loginData)
        {
            LoginResult result = new()
            {
                Error = string.Empty,
                State = 200
            };

            validateUser(loginData, result);
            if (200 != result.State)
                return result;

            result.Token.Singature = Guid.NewGuid().ToString().Replace("-", "");

            string sha256 = ManagerHelper.CalculateSHA256(string.Format("{0}{1}", result.Token.Singature, loginData.Streaming));

            TokenItem newToken = new(TokenInvoker)
            {
                Token = sha256.ToLower(),
                IsValid = true,
                UserName = loginData.UserName
            };

            _mutex.WaitOne();

            _tokens.AddOrUpdate(newToken.Token, newToken, (string tokenId, TokenItem oldItem) =>
            {
                oldItem.SetInvalid();

                return newToken;
            });

            result.Token.Validation = newToken.SetValid();

            Console.WriteLine("用户登录: {0}", loginData.UserName);

            _mutex.ReleaseMutex();

            return result;
        }

        public LoginResult RenewToken(string token, string streaming)
        {
            LoginResult result = new()
            {
                Error = string.Empty,
                State = 200
            };

            _mutex.WaitOne();

            if (_tokens.TryRemove(token, out TokenItem? item) && item != null && item.IsValid)
            {
                item.SetInvalid();

                result.Token.Singature = Guid.NewGuid().ToString().Replace("-", "");
                string sha256 = ManagerHelper.CalculateSHA256(string.Format("{0}{1}", result.Token.Singature, streaming));

                TokenItem newToken = new(TokenInvoker)
                {
                    IsValid = true,
                    UserName = item.UserName,
                    Token = sha256.ToLower()
                };

                _tokens.AddOrUpdate(newToken.Token, newToken, (string tokenId, TokenItem oldItem) =>
                {
                    oldItem.SetInvalid();

                    return newToken;
                });

                result.Token.Validation = newToken.SetValid();

                Console.WriteLine("用户续约: {0}", item.UserName);
            }
            else
            {
                result.Error = "会话超时，请重新登录";
                result.State = 403;
            }

            _mutex.ReleaseMutex();

            return result;
        }

        public bool IsTokenValid(string token, out string userName)
        {
            userName = "";

            if (_tokens.TryGetValue(token, out TokenItem? item) && item != null)
            {
                userName = item.UserName;
                return true;
            }

            return false;
        }

        private void validateUser(Login loginData, LoginResult result)
        {
            DatabaseCenter? db = DBHelper.GetDBCenter(Initial.AiTianyuBaseDB);
            if (db == null)
            {
                result.Error = "系统错误，请稍后再试";
                result.State = 504;

                return;
            }

            try
            {
                string sql = string.Format(UserInfoGetterSql, loginData.UserName, loginData.Password);
                db.Execute(sql, (MySqlDataReader reader) =>
                {
                    bool hasResult = reader.Read();
                    if (!hasResult)
                        throw new Exception("数据库错误");

                    int item = reader.GetInt32("items");
                    if (0 != item)
                        return;

                    result.State = 404;
                    result.Error = "没有找到用户或密码错误";
                });
            }
            catch
            {
                result.Error = "系统错误，请稍后再试";
                result.State = 504;

                return;
            }
        }
        private void TokenInvoker(string token)
        {
            _mutex.WaitOne();

            if (_tokens.TryRemove(token, out TokenItem? item) && item != null)
                item.IsValid = false;

            _mutex.ReleaseMutex();
        }
    }
}
