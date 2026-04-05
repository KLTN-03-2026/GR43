using MediatR;

namespace DoAnTotNghiep.Application.Auth.VerifyEmail;

public class VerifyEmailCommand : IRequest<string>
{
    public required string Email { get; set; }
    public required string Token { get; set; }
}
