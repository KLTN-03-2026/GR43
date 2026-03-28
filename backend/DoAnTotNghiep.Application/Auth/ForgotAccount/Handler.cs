using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Email;
using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Application.Users;
using DoAnTotNghiep.Domain.Token;
using DoAnTotNghiep.Domain.Users;
using MediatR;

namespace DoAnTotNghiep.Application.Auth.ForgotAccount
{
    public class Handler(
        IPasswordResetToken passwordResetTokenRepository,
        IUserRepository userRepository,
        IEmailService emailService,
        IEmailTemplateService emailTemplateService,
        ITokenGenerator tokenGenerator
    ) : IRequestHandler<ForgotPasswordCommand, Unit>
    {
        private static readonly String FORGOT_PASSWORD = "ForgotPassword";


        public async Task<Unit> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
        {
            var existing = await userRepository.GetByEmail(request.Email);
            if (existing != null)
                throw new NotFoundException("User not found");
            String email = existing.Email;
            String token = tokenGenerator.GenerateToken();
            passwordResetTokenRepository.InsertToken(new PasswordResetToken(
                userId: Guid.NewGuid(),
                email: existing.Email,
                token: token,
                expiresAt: DateTime.Now.AddHours(10),
                isUsed: false
            ));
            var body = await emailTemplateService.RenderAsync(FORGOT_PASSWORD,
                new { Resetlink = "", Token = email });
            await emailService.SendAsync(
                email,
                "Are you forgot your password?",
                body,
                true
            );
            return Unit.Value;
        }
    }
}