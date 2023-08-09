using ElCatoWebApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ElCatoWebApi.Services
{
    public static class Extensions
    {
        public static byte[] GetHash(this string inputString)
        {
            using HashAlgorithm algorithm = SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        public static string GetHashString(this string inputString)
        {
            var sb = new StringBuilder();
            foreach (var b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }

        public static string GetHashString(this object inputString)
        {
            return GetHashString(inputString?.ToString()!);
        }
    }
}
