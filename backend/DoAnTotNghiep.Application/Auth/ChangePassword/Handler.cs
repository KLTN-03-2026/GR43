using MediatR;
using DoAnTotNghiep.Domain.Users;

namespace DoAnTotNghiep.Application.Auth.ChangePassword;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, string>
{
    private readonly IUserRepository _userRepository;

    public ChangePasswordCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<string> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmail(request.Email);
        if (user == null)
        {
            throw new System.Exception("User not found");
        }

        // TODO: Validate old password using PasswordHasher before updating
        
        // Return user ID as string for now
        return user.Id.ToString();
    }
}
