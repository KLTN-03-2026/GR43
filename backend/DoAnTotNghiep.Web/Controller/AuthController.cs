using Microsoft.AspNetCore.Mvc;
using DoAnTotNghiep.Application.Users;
using DoAnTotNghiep.Application.Auth.ResetPassword;
using DoAnTotNghiep.Application.Auth.ChangePassword;
using DoAnTotNghiep.Application.Common.Models;
using MediatR;

namespace DoAnTotNghiep.Web.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(CreateAccountCommand request)
    {
        var userId = await _mediator.Send(request);
        return Ok(ApiResponse<string>.Succeeded(userId.ToString(), "User registered successfully"));
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordCommand request)
    {
        await _mediator.Send(request);
        return Ok(ApiResponse<string>.Succeeded(string.Empty, "If the email exists, a reset link has been sent."));
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordCommand request)
    {
        var userId = await _mediator.Send(request);
        return Ok(ApiResponse<string>.Succeeded(userId, "Password has been successfully reset."));
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordCommand request)
    {
        var userId = await _mediator.Send(request);
        return Ok(ApiResponse<string>.Succeeded(userId, "Password has been successfully changed."));
    }
}