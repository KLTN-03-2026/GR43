using System.Runtime.Serialization;
using DoAnTotNghiep.Domain.Common;
using DoAnTotNghiep.Domain.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DoAnTotNghiep.Domain.Users;

public class UsersAccount(string username, string hashPassword, string email) : BaseEntity
{
    
    public string Username { get; set; } = username;
    public string HashPassword { get; set; } = hashPassword;
    public string Email { get; set; } = email;


}
