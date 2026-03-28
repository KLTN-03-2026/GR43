using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Email;
using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Application.Users;
using DoAnTotNghiep.Domain.Users;
using MediatR;

namespace DoAnTotNghiep.Application.CreateUser
{
    public class Handler(
        IUserRepository userRepository,
        IPasswordHasher ipasswordHasher,
        IEmailService emailService,
        IEmailTemplateService emailTemplateService
    ) : IRequestHandler<CreateAccountCommand, Guid>
    {
        private static readonly String FORGOT_PASSWORD = "ForgotPassword";
        private static readonly String CREATE_ACCOUNT = "CreateAccount";

        public async Task<Guid> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
        {
            var existing = await userRepository.GetByEmail(request.Email);
            if (existing != null)
                throw new ConflictException("Email already exists");

            var passwordHash = ipasswordHasher.Hash(password: request.Password);
            string email = request.Email;
            string username = request.Username;
            var user = new UserAccount(
                hashPassword: passwordHash,
                username: request.Username,
                email: email
            );
            await userRepository.CreateAccount(user);
            var body = await emailTemplateService.RenderAsync(CREATE_ACCOUNT,
                new { UserName = username, Email = email });
            await emailService.SendAsync(
                email,
                "Welcome to DATN",
                body,
                true
            );
            return user.Id;
        }
    }
}