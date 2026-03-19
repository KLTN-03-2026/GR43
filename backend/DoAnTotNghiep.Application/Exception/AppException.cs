using DoAnTotNghiep.Domain.Common;
using DoAnTotNghiep.Web.ExceptionHandler;

namespace DoAnTotNghiep.Application;

public abstract class AppException : System.Exception
{
    public int StatusCode { get; }
    public Error_Code ErrorCode { get; }

    protected AppException(string message, int statusCode, Error_Code errorCode)
        : base(message)
    {
        StatusCode = statusCode;
        ErrorCode = errorCode;
    }
}