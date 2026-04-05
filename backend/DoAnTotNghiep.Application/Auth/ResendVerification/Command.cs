using MediatR;

namespace DoAnTotNghiep.Application.Auth.ResendVerification;

public class ResendVerificationCommand : IRequest<object>
{
    public required string Email { get; set; }
}
