using System.Runtime.Serialization;
using DoAnTotNghiep.Domain.Common;
using DoAnTotNghiep.Domain.Enum;

namespace DoAnTotNghiep.Domain.Users;

public class UserAccount(string username, string hashPassword, string email) : BaseEntity
{
    public string Username { get; private set; } = username;
    public string HashPassword { get; private set; } = hashPassword;
    public string Email { get; private set; } = email;
    public bool IsVerified { get; private set; } = false;
    public string Role { get; private set; } = "Client";
    public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public void MarkAsVerified()
    {
        IsVerified = true;
        SetUpdated();
    }

    public void UpdatePassword(string newHashPassword)
    {
        HashPassword = newHashPassword;
        SetUpdated();
    }

}