using DoAnTotNghiep.Domain.Common;

namespace DoAnTotNghiep.Application.Exception;

public class ForbiddenException(string message) : AppException(message, 403, Error_Code.FORBIDDEN);

