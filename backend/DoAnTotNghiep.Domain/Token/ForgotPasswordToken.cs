using DoAnTotNghiep.Domain.Common;

namespace DoAnTotNghiep.Domain.Token;

public class PasswordResetToken(Guid userId , string token, string email, DateTime expiresAt, bool isUsed )
    : BaseEntity
{
    public string Token { get; private set; } = token;
    public Guid UserId { get; private set; } = userId;
    public string Email { get; private set; } = email;
    public DateTime ExpiresAt { get; private set; } = expiresAt;
    public bool IsUsed { get; private set; } = isUsed;
    
}