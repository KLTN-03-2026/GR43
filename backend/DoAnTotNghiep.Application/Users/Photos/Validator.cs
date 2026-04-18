using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnTotNghiep.Application.Users.Photos
{
    public class Validator : AbstractValidator<UploadPhotoCommand>
    {
        public Validator()
        {
            RuleFor(x => x.File)
                .NotNull();

            RuleFor(x => x.File.Length)
                .LessThanOrEqualTo(10 * 1024 * 1024)
                .WithMessage("Max 10MB");
        }
    }
}
