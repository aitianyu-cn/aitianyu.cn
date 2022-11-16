using System;
namespace Tianyu.Server.User.Models.Account
{
    public enum LoginResultType
    {
        SUCCESS,
        NON_USER,
        NO_VARIFY,
        ERROR
    }

    public enum LoginUserType
    {
        USER_NAME,
        EMAIL,
    }

    public class LoginPost
    {
        /// <summary>
        /// User name or email
        /// </summary>
        public string user { get; set; } = string.Empty;
        /// <summary>
        /// Indicate the user is name or email
        /// </summary>
        public string userType { get; set; } = string.Empty;
        /// <summary>
        /// SHA-256 value of password
        /// </summary>
        public string password { get; set; } = string.Empty;
        /// <summary>
        /// SHA-256 value of guid
        /// </summary>
        public string identify { get; set; } = string.Empty;

    }

    public class LoginResult
    {
        public string user { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string result { get; set; } = LoginHelper.ConvertResultType(LoginResultType.ERROR);
        public string token { get; set; } = string.Empty;
    }

    public class LoginHelper
    {
        public static string ConvertResultType(LoginResultType result) => (result) switch
        {
            LoginResultType.SUCCESS => "success",
            LoginResultType.NON_USER => "non_user",
            LoginResultType.NO_VARIFY => "no_varify",
            _ => "error"
        };

        public static LoginUserType ConvertUserType(string user) => (user.ToLower()) switch
        {
            "email" => LoginUserType.EMAIL,
            "mail" => LoginUserType.EMAIL,
            "user_name" => LoginUserType.USER_NAME,
            "user-name" => LoginUserType.USER_NAME,
            "username" => LoginUserType.USER_NAME,
            "name" => LoginUserType.USER_NAME,
            _ => LoginUserType.USER_NAME,
        };
    }
}

