using DoAnTotNghiep.Domain.Common;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DoAnTotNghiep.Domain.Users;

public class Session : BaseEntity
{
    [BsonRepresentation(BsonType.String)]
    public Guid UserId { get; set; }
    public string? DeviceId { get; set; }
    public string? DeviceName { get; set; }
    public string? Platform { get; set; }
    public string? AppVersion { get; set; }
    public string? PushToken { get; set; }
    public string? IpAddress { get; set; }
    public bool IsRevoked { get; set; }

    public Session(Guid userId, string? deviceId, string? ipAddress, string? platform, string? pushToken)
    {
        UserId = userId;
        DeviceId = deviceId;
        IpAddress = ipAddress;
        Platform = platform;
        PushToken = pushToken;
    }
}