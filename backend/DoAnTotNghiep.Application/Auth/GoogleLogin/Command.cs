using DoAnTotNghiep.Application.Users.Commands.Login;
using MediatR;

namespace DoAnTotNghiep.Application.Auth.GoogleLogin;

public class GoogleLoginCommand : IRequest<AuthResponse>
{
    public required string IdToken { get; set; }
}
