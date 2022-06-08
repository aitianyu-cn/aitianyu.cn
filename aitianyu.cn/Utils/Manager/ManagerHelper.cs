using System.Security.Cryptography;
using System.Text;

namespace back.aitianyu.cn.Utils.Manager
{
    public class ManagerHelper
    {
        public static string CalculateSHA256(string source)
        {
            SHA256 myHash = SHA256.Create();

            byte[] inputs = Encoding.UTF8.GetBytes(source);
            byte[] outputs = myHash.ComputeHash(inputs);

            StringBuilder sb = new StringBuilder();
            foreach (byte b in outputs)
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
    }
}
