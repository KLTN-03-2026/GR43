using DoAnTotNghiep.Application.Behaviors;
using DoAnTotNghiep.Domain.Enum;
using MediatR;

namespace DoAnTotNghiep.Application.Users;

public class ForgotPasswordCommand : IRequest<Unit>
{
    public required string Email { get; set; }
}
