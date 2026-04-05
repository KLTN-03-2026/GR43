using MediatR;

namespace DoAnTotNghiep.Application.Auth.DeleteAccount;

public class DeleteAccountCommand(string email) : IRequest<string>
{
    public string Email { get; set; } = email;
}
