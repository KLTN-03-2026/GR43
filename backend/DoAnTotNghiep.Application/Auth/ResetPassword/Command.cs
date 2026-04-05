using MediatR;

namespace DoAnTotNghiep.Application.Auth.ResetPassword;

public class ResetPasswordCommand : IRequest<String>
{
    public required string Email { get; set; }
    public required string NewPassword { get; set; }
    public required string ResetToken { get; set; }
}