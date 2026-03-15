using System.Runtime.Serialization;
using DoAnTotNghiep.Domain.Common;
using DoAnTotNghiep.Domain.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DoAnTotNghiep.Domain.Users;

public class Users : BaseEntity
{
    public string Username { get; set; }
    public string HashPassword { get; set; }
    public int Age { get; set; }
    public Gender Gender;
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Role { get; set; }
    public string Status { get; set; }

    public Users(string username, string hashPassword, int age, string email, string phone, Gender gender)
    {
        Gender = gender;
        Username = username;
        HashPassword = hashPassword;
        Age = age;
        Email = email;
        Phone = phone;
        Role = "User";
        Status = "Inactive";
    }
}