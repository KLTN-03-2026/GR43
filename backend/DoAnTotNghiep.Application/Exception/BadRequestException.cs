using DoAnTotNghiep.Domain.Common;

namespace DoAnTotNghiep.Application.Exception;

public class BadRequestException(string message) : AppException(message, 400, Error_Code.VALIDATION_FAILED);

