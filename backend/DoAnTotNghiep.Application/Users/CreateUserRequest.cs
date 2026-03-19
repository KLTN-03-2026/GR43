using DoAnTotNghiep.Application.Behaviors;
using DoAnTotNghiep.Domain.Enum;
using MediatR;

namespace DoAnTotNghiep.Application.Users;

public class CreateUserRequest : IRequest<Guid>
{
    public required string Username { get; set; }
    public required int Age { get; set; }
    public required Gender Gender { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    [SensitiveData]
    public required string Password { get; set; }
}