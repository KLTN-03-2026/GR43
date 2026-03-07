using DoAnTotNghiep.Domain.Users;

namespace DoAnTotNghiep.Application.Users
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Guid> CreateUser(CreateUserRequest request)
        {
            var existing = await _userRepository.GetByEmail(request.Email);

            if (existing != null)
                throw new Exception("Email already exists");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new Domain.Users.Users(
                hashPassword: passwordHash,
                username: request.Username,
                age: request.Age,
                email: request.Email,
                phone: request.Phone,
                gender: request.Gender
            );
            
            await _userRepository.Create(user);
            return user.Id;
        }
    }
}