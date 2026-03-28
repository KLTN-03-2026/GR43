namespace DoAnTotNghiep.Domain.Token;

public interface IPasswordResetToken
{
    public Task InsertToken(PasswordResetToken passwordResetToken);
}