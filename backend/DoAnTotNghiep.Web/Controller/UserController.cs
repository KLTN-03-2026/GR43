using Microsoft.AspNetCore.Mvc;
using DoAnTotNghiep.Application.Users;
using MediatR;

namespace DoAnTotNghiep.Web.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserRequest request)
    {
        var userId = await _mediator.Send(request);

        return Ok(new
        {
            Id = userId,
            Message = "User created"
        });
    }
    //[HttpPost("")]
    //public async Task<IActionResult> Login(Guid id)
    //{
        
    //}
}