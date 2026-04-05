using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Domain.Users;
using MediatR;

namespace DoAnTotNghiep.Application.Auth.DeleteAccount;

public class Handler(IUserRepository userRepository) : IRequestHandler<DeleteAccountCommand, string>
{
    public async Task<string> Handle(DeleteAccountCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmail(request.Email);
        if (user == null)
            throw new NotFoundException("User not found.");

        await userRepository.DeleteAccount(user.Id.ToString());

        return "Account deleted successfully.";
    }
}
