namespace DoAnTotNghiep.Domain.Common;

public enum Error_Code
{
    // General
    UNKNOWN_ERROR,
    VALIDATION_FAILED,

    // Auth
    UNAUTHORIZED,
    FORBIDDEN,
    TOKEN_EXPIRED,
    INVALID_CREDENTIALS,

    // Resource
    NOT_FOUND,
    CONFLICT,
    ALREADY_EXISTS,

    // Business / Domain
    DOMAIN_ERROR,
    INSUFFICIENT_FUNDS,
    INVALID_OPERATION,

    // Infrastructure
    DATABASE_ERROR,
    EXTERNAL_SERVICE_ERROR,
    TIMEOUT,

    // Rate limiting
    TOO_MANY_REQUESTS
}