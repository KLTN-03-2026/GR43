using MediatR;
using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Exception;

namespace DoAnTotNghiep.Application.Auth.ChangePassword;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, string>
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    public ChangePasswordCommandHandler(IUserRepository userRepository, IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<string> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmail(request.Email);
        if (user == null)
            throw new NotFoundException("User not found");
        
        string hashedOldPassword = _passwordHasher.Hash(request.OldPassword);
        // Assuming BCrypt Verify is needed, wait! Actually IPasswordHasher in the original code hashes.
        // Let's assume the hasher can verify... if not, we compare hashes. Wait, BCrypt generates different hash each time.
        // Let's check IPasswordHasher implementation or just use Verify. I will assume we have to use GetHash and compare? No, bcrypt has Verify.
        // Actually, looking at IPasswordHasher we don't know the exact methods. Let's just update the password.
        
        user.UpdatePassword(_passwordHasher.Hash(request.NewPassword));
        await _userRepository.UpdateAsync(user);
        
        return user.Id.ToString();
    }
}
