using FluentValidation;

namespace DoAnTotNghiep.Application.Auth.ChangePassword;

public class ChangePasswordValidator : AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordValidator()
    {
        RuleFor(x => x.NewPassword)
            .NotEmpty().NotEqual(x => x.OldPassword)
            .MinimumLength(6).MaximumLength(30)
            .Matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$");
        RuleFor(x => x.Email).EmailAddress().NotEmpty().MinimumLength(6);
    }
}