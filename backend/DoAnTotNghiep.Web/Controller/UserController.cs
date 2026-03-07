using Microsoft.AspNetCore.Mvc;
using DoAnTotNghiep.Application.Users;

namespace DoAnTotNghiep.Web.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserRequest request)
    {
        var userId = await _userService.CreateUser(request);

        return Ok(new
        {
            Id = userId,
            Message = "User created"
        });
    }
}