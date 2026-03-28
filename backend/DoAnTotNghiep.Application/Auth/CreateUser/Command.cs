using DoAnTotNghiep.Application.Behaviors;
using DoAnTotNghiep.Domain.Enum;
using MediatR;

namespace DoAnTotNghiep.Application.Users;

public class CreateAccountCommand : IRequest<Guid>
{
    public required string Username { get; set; }
    public required string Email { get; set; }
    [SensitiveData]
    public required string Password { get; set; }
}
