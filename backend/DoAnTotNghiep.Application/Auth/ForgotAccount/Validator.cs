using DoAnTotNghiep.Application.Users;
using FluentValidation;

namespace DoAnTotNghiep.Application.Auth.ForgotAccount;

public class ForgotPasswordValidator : AbstractValidator<ForgotPasswordCommand>
{
    public ForgotPasswordValidator()
    {
        RuleFor(x => x.Email).EmailAddress().NotEmpty().MinimumLength(6).Matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    }
}