using DoAnTotNghiep.Domain.Common;

namespace DoAnTotNghiep.Application.Exception;

public class ConflictException(string message) : AppException(message, 409, Error_Code.CONFLICT);