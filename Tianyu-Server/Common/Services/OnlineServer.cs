using System;
using System.Collections.Concurrent;
using Tianyu.Server.User.Models.Account;

namespace Tianyu.Server.User.Services
{
    internal class UserOnlineMapItem
    {
        public string userId { get; set; } = string.Empty;
        public string identify { get; set; } = string.Empty;
        public int timer { get; set; } = 30;
    }

    public class UserOnlineServer
    {
        private static UserOnlineServer? OnlineServer;

        private static string USER_ONLINE_SERVER_TRIGGER_ID = "user_online_server";
        private static int ACQUIRE_READER_LOCK_TIME_OUT = 300000;

        private readonly ConcurrentDictionary<string, UserOnlineMapItem> userMap;
        private readonly ReaderWriterLock readerWriterLock;

        private UserOnlineServer()
        {
            userMap = new ConcurrentDictionary<string, UserOnlineMapItem>();
            readerWriterLock = new ReaderWriterLock();

            TimerServer.Instance.Register(USER_ONLINE_SERVER_TRIGGER_ID, GC);
        }

        public LoginResult Login(string user, LoginUserType type, string pw, string identify)
        {
            LoginResult loginResult = new LoginResult();
            if (
                string.IsNullOrEmpty(user) || string.IsNullOrWhiteSpace(user)
                || string.IsNullOrEmpty(pw) || string.IsNullOrWhiteSpace(pw)
                || string.IsNullOrEmpty(identify) || string.IsNullOrWhiteSpace(identify)
                )
            {
                // user, pw or identify is not valid
                // reject directly
                return loginResult;
            }
            // to check user and pw
            // if check failed
            if (user == pw)
            {
                // user can not be verified
                // reject with no verfied or non user
                loginResult.result = LoginHelper.ConvertResultType(LoginResultType.NO_VARIFY);
                return loginResult;
            }

            try
            {
                string token = Guid.NewGuid().ToString("N");

                readerWriterLock.AcquireReaderLock(ACQUIRE_READER_LOCK_TIME_OUT);
                if (readerWriterLock.IsReaderLockHeld)
                {
                    bool addResult = userMap.TryAdd(token, new UserOnlineMapItem
                    {
                        userId = user,
                        identify = identify
                    });
                    readerWriterLock.ReleaseReaderLock();

                    if (!addResult)
                    {
                        // could not to add the user state
                        // reject with the data error.
                        return loginResult;
                    }

                    loginResult.result = LoginHelper.ConvertResultType(LoginResultType.SUCCESS);
                    loginResult.name = user;
                    loginResult.token = token;
                    loginResult.user = user;
                    loginResult.email = user;

                    return loginResult;
                }
                else
                    return loginResult;
            }
            catch
            {
                // in this case
                // the value convert will not throw the error
                // the login result state will be error if the exception is thown
                return loginResult;
            }
        }

        public LoginResult Login(string identify, string token)
        {
            LoginResult loginResult = new LoginResult();
            if (
                string.IsNullOrEmpty(token) || string.IsNullOrWhiteSpace(token)
                || string.IsNullOrEmpty(identify) || string.IsNullOrWhiteSpace(identify)
                )
            {
                // token or identify is not valid
                // reject directly
                return loginResult;
            }

            readerWriterLock.AcquireReaderLock(ACQUIRE_READER_LOCK_TIME_OUT);
            if (readerWriterLock.IsReaderLockHeld)
            {
                if (
                userMap.TryGetValue(token, out UserOnlineMapItem? value)
                && value is not null
                && value.identify == identify
                )
                {
                    loginResult.user = value.userId;
                    loginResult.name = "";
                    loginResult.email = "";
                    loginResult.token = "";
                    loginResult.result = LoginHelper.ConvertResultType(LoginResultType.SUCCESS);
                }

                readerWriterLock.ReleaseReaderLock();
            }

            // in other cases due to system error or valid failed
            // reject directly
            // if valid correctly, return value will be set
            return loginResult;
        }

        public void GC()
        {
            readerWriterLock.AcquireWriterLock(-1);
            if (readerWriterLock.IsReaderLockHeld)
            {
                List<string> dueLise = new List<string>();

                foreach (KeyValuePair<string, UserOnlineMapItem> item in userMap)
                {
                    --item.Value.timer;
                    if (0 == item.Value.timer)
                        dueLise.Add(item.Key);
                }

                foreach (string key in dueLise)
                    userMap.Remove(key, out _);

                readerWriterLock.ReleaseWriterLock();
            }
        }

        public static UserOnlineServer Instance
        {
            get
            {
                if (OnlineServer is null)
                    OnlineServer = new UserOnlineServer();
                return OnlineServer;
            }
        }
    }
}

