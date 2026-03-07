using DoAnTotNghiep.Domain.Enum;

namespace DoAnTotNghiep.Application.Users;

public class CreateUserRequest
{
    public string Username { get; set; }
    public int Age { get; set; }
    public Gender Gender { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }
}