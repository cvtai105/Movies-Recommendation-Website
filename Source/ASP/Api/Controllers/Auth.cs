using Application.DTOs;
using Application.DTOs.IdentityDTOs;
using Application.Extensions;
using Application.ExternalInterfaces;
using Application.InternalContracts;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("/api/auth")]
public class Auth : Controller
{
    private readonly ILogger<Auth> _logger;
    private readonly IJwtService _jwtService;
    private readonly IIdentityService _identityService;

    public Auth(ILogger<Auth> logger, IJwtService jwtService, IIdentityService identityService)
    {
        _logger = logger;
        _jwtService = jwtService;
        _identityService = identityService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRecord loginInfo)
    {
        if (string.IsNullOrEmpty(loginInfo.Email) || string.IsNullOrEmpty(loginInfo.Password))
        {
            return BadRequest("Email and Password are required.");
        }

        var user = await _identityService.GetByEmail(loginInfo.Email);

        if (user == null) return Unauthorized(new { Message = "Email was not registered" });

        if (user.Status != "Active") return Unauthorized(new { Message = "Account is not active" });

        var passwordHash = loginInfo.Password.HashPassword();
        if (passwordHash != user.Hash)
            return Unauthorized(new { Message = "Wrong password" });

        var accessToken = _jwtService.GenerateAccessToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken(user);

        return Ok(new
        {
            AccessToken = accessToken,
            TokenType = "Bearer",
            RefreshToken = refreshToken,
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Registration info)
    {
        if (string.IsNullOrEmpty(info.Email) || string.IsNullOrEmpty(info.Name) || string.IsNullOrEmpty(info.Password))
        {
            return BadRequest(new { Message = "Email, Password, FullName, and Phone are required." });
        }

        var user = await _identityService.GetByEmail(info.Email);
        if (user != null)
        {
            if (user.Status == "Active")
            {
                return BadRequest(new { Message = "Email is already registered" });
            }
            else
            {
                await _identityService.SendActiveCodeViaEmail(user);
                return Ok(new
                {
                    Message = "Resend active code successfully",
                    StatusCode = 201,
                    UserId = user.Id
                });
            }
        }

        var newUser = await _identityService.CreateUser(info);
        var _ = await _identityService.SendActiveCodeViaEmail(newUser);

        return Ok(new
        {
            StatusCode = 201,
            Message = "User created successfully",
            UserId = newUser.Id
        });
    }

    [HttpPost("account/confirm-email")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string code, [FromQuery] string userId)
    {
        if (string.IsNullOrEmpty(code))
        {
            return BadRequest("Verification code is required.");
        }
        if (!Guid.TryParse(userId, out var userIdGuid))
        {
            return BadRequest(new
            {
                Message = "Invalid user id"
            });
        }

        var user = await _identityService.ConfirmEmail(userIdGuid, code);
        if (user == null)
        {
            return BadRequest(new
            {
                Message = "Invalid verification code"
            });
        }

        var accessToken = _jwtService.GenerateAccessToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken(user);

        return Ok(new
        {
            AccessToken = accessToken,
            TokenType = "Bearer",
            RefreshToken = refreshToken,
        });
    }

    [HttpGet("account/password/reset-request")]
    public async Task<IActionResult> ResetPassword([FromQuery] string email)
    {
        if (string.IsNullOrEmpty(email))
        {
            return BadRequest("Email is required.");
        }

        var user = await _identityService.GetByEmail(email);
        if (user == null)
        {
            return BadRequest("Email is not registered.");
        }

        var _ = await _identityService.SendResetPasswordCodeViaEmail(user);

        return Ok(new
        {
            Message = "Reset password email sent successfully",
            UserId = user.Id
        });
    }

    [HttpPost("account/password/reset-confirm")]
    public async Task<IActionResult> ConfirmResetPassword([FromBody] ResetPasswordRequest req)
    {
        if (string.IsNullOrEmpty(req.Code))
        {
            return BadRequest("Verification code is required.");
        }
        if (req.UserId == Guid.Empty)
        {
            return BadRequest("Invalid user id");
        }

        var user = await _identityService.ConfirmResetPassword(req);
        if (user == null)
        {
            return BadRequest("Invalid verification code");
        }

        var accessToken = _jwtService.GenerateAccessToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken(user);

        return Ok(new
        {
            AccessToken = accessToken,
            TokenType = "Bearer",
            RefreshToken = refreshToken,
        });
    }
}