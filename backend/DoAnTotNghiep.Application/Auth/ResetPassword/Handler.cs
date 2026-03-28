using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Domain.Token;
using DoAnTotNghiep.Domain.Users;
using MediatR;
using Microsoft.Extensions.Primitives;

namespace DoAnTotNghiep.Application.Auth.ResetPassword
{
    public class Handler(IUserRepository userRepository, IPasswordHasher ipasswordHasher)
        : IRequestHandler<ResetPasswordCommand, String>
    {
        public async Task<string> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
        {
            string email = request.Email;
            string password = request.NewPassword;
            var userAccount = await userRepository.GetByEmail(email);
            if (userAccount == null) throw new NotFoundException("User not found");
            string hashedPassword = ipasswordHasher.Hash(password: password);
            var updatedResult = await userRepository.ResetPassword(hashedPassword, email);
            if (updatedResult == null) throw new NotFoundException("Failed to reset password");
            return "Success";
        }
    }
}