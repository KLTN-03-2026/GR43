using MediatR;

namespace DoAnTotNghiep.Application.Auth.ResetPassword;

public class ResetPasswordCommand(string email, string password, string token) : IRequest<String>
{
    public  String Email { get; set; } = email!;
    public  String NewPassword { get; set; } = password;
    public  String ResetToken { get; set; } = token;
}