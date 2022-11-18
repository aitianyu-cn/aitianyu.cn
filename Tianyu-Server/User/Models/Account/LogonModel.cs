using System;
namespace Tianyu.Server.User.Models.Account
{
    /// <summary>
    /// logon first verify results
    /// </summary>
    public enum LogonResultType
    {
        /// <summary>
        /// verify success
        /// </summary>
        SUCCESS,
        /// <summary>
        /// duplicated user id
        /// </summary>
        DP_USER,
        /// <summary>
        /// duplicated user email
        /// </summary>
        DP_MAIL,
        /// <summary>
        /// invalid active code
        /// </summary>
        INV_ACT,
        /// <summary>
        /// other errors happened
        /// maybe the system failed or timeout or other issue
        /// </summary>
        FAILURE
    }

    /// <summary>
    /// the logon first post data structure
    /// </summary>
    public class LogonPost
    {
        /// <summary>
        /// user id
        /// unique identification for each user
        /// </summary>
        public string user { get; set; } = string.Empty;
        /// <summary>
        /// user register email
        /// unique and valid email for each user
        /// </summary>
        public string mail { get; set; } = string.Empty;
        /// <summary>
        /// user name
        /// this will be the user name for each user
        /// the name could be same as others or none
        /// </summary>
        public string name { get; set; } = string.Empty;
        /// <summary>
        /// user password
        /// this is a SHA-256 string for the password
        /// </summary>
        public string pw { get; set; } = string.Empty;
        /// <summary>
        /// active code
        /// only one valid active code for each user
        /// </summary>
        public string active { get; set; } = string.Empty;
    }

    /// <summary>
    /// logon post result state
    /// this is the first verify for logon data
    /// </summary>
    public class LogonPostResult
    {
        /// <summary>
        /// the first verification result
        /// </summary>
        public string state { get; set; } = string.Empty;
        /// <summary>
        /// the session token for the second verification
        /// if the result state is success
        /// this will be an 256bits token to indicate the session for the email
        /// authorization
        /// </summary>
        public string token { get; set; } = string.Empty;
    }

    /// <summary>
    /// logon second data
    /// for the second verification
    /// </summary>
    public class LogonGet
    {
        /// <summary>
        /// the token which get from the logon post result
        /// to indicate the session
        /// </summary>
        public string token { get; set; } = string.Empty;
        /// <summary>
        /// the SHA-256 code of the second verification code from email
        /// </summary>
        public string vcode { get; set; } = string.Empty;
    }

    public class LogonHelper
    {
        public static string ConvertResultType(LogonResultType type) => (type) switch
        {
            LogonResultType.SUCCESS => "success",
            LogonResultType.DP_USER => "dup_user",
            LogonResultType.DP_MAIL => "dup_mail",
            LogonResultType.INV_ACT => "invalid_active",
            _ => "failed"
        };
    }
}

