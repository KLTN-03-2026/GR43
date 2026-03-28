using MediatR;

namespace DoAnTotNghiep.Application.Auth.ChangePassword;

public class ChangePasswordCommand(string email, string oldPassword, string newPassword) : IRequest<string>
{
    public string Email { get; set; } = email;
    public string OldPassword { get; set; } = oldPassword;
    public string NewPassword { get; set; } = newPassword;
}
