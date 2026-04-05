using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoAnTotNghiep.Application.Behaviors;

namespace DoAnTotNghiep.Application.Users.Commands.Login
{
    public class LoginCommand : IRequest<AuthResponse>
    {
        public string Email { get; set; }
        [SensitiveData] public string Password { get; set; }
        
        public string? DeviceId { get; set; }
        public string? Platform { get; set; }
        public string? PushToken { get; set; }
        public string? IPAddress { get; set; }
        public bool IsRevoked { get; set; }
    }
}