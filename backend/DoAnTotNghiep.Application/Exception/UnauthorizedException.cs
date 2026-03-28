using DoAnTotNghiep.Domain.Common;

namespace DoAnTotNghiep.Application.Exception;


public class UnauthorizedException(string message = "Unauthorized")
    : AppException(message, 401, Error_Code.UNAUTHORIZED);

