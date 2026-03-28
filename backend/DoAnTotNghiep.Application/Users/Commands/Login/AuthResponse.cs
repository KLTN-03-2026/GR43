using DoAnTotNghiep.Application.Behaviors;
using DoAnTotNghiep.Domain.Enum;
using MediatR;

namespace DoAnTotNghiep.Application.Users.Commands.Login;

public class AuthResponse
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}