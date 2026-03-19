using DoAnTotNghiep.Domain.Common;

namespace DoAnTotNghiep.Application.Exception;

public class NotFoundException(string message) : AppException(message, 404, Error_Code.NOT_FOUND);