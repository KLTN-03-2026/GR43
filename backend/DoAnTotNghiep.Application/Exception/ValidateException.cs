using DoAnTotNghiep.Application;
using DoAnTotNghiep.Domain.Common;

namespace DoAnTotNghiep.Web.ExceptionHandler;

public class ValidationException(IDictionary<string, string[]> errors)
    : AppException("Validation failed", 400, Error_Code.VALIDATION_FAILED)
{
    public IDictionary<string, string[]> Errors { get; } = errors;
}