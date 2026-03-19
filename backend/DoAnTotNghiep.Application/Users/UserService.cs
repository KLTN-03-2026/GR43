using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Domain.Users;
using MediatR;

namespace DoAnTotNghiep.Application.Users
{
    public class UserService(IUserRepository userRepository, IPasswordHasher ipasswordHasher)
        : IRequestHandler<CreateUserRequest, Guid>
    {
        public async Task<Guid> Handle(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var existing = await userRepository.GetByEmail(request.Email);
            if (existing != null)
                throw new ConflictException("Email already exists");

            var passwordHash = ipasswordHasher.Hash(password: request.Password);

            var user = new Domain.Users.Users(
                hashPassword: passwordHash,
                username: request.Username,
                age: request.Age,
                email: request.Email,
                phone: request.Phone,
                gender: request.Gender
            );
            await userRepository.Create(user);
            return user.Id;
        }
    }
}