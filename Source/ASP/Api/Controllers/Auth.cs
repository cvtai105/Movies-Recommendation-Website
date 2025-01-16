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

        if (user == null) return Unauthorized(new { title = "Email was not registered" });

        if (user.Status != "Active") return Unauthorized(new { title = "Account is not active" });

        var passwordHash = loginInfo.Password.HashPassword();
        if (passwordHash != user.Hash)
            return Unauthorized(new { title = "Wrong password" });

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
            return BadRequest(new { title = "Email, Password, FullName, and Phone are required." });
        }

        var user = await _identityService.GetByEmail(info.Email);
        if (user != null)
        {
            if (user.Status == "Active")
            {
                return BadRequest(new { title = "Email is already registered" });
            }
            else
            {
                await _identityService.SendActiveCodeViaEmail(user);
                return Ok(new
                {
                    title = "Resend active code successfully",
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
            title = "User created successfully",
            UserId = newUser.Id
        });
    }

    [HttpPost("account/confirm-email")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string code, [FromQuery] string userId)
    {
        if (string.IsNullOrEmpty(code))
        {
            return BadRequest(
                new
                {
                    title = "Verification code is required.",
                    status = 400
                }
            );
        }
        if (!int.TryParse(userId, out var userIdGuid))
        {
            return BadRequest(new
            {
                title = "Invalid user id",
                status = 400
            });
        }

        var user = await _identityService.ConfirmEmail(userIdGuid, code);
        if (user == null)
        {
            return BadRequest(new
            {
                title = "Invalid verification code",
                status = 400,
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
            return BadRequest(
                new
                {
                    title = "Email is required.",
                    Status = 400,
                }
            );
        }

        var user = await _identityService.GetByEmail(email);
        if (user == null)
        {
            return BadRequest(new
            {
                title = "Email is not registered.",
                Status = 400,
            });
        }

        var _ = await _identityService.SendResetPasswordCodeViaEmail(user);

        return Ok(new
        {
            Status = 200,
            title = "Reset password email sent successfully",
            UserId = user.Id
        });
    }

    [HttpPost("account/password/reset-confirm")]
    public async Task<IActionResult> ConfirmResetPassword([FromBody] ResetPasswordRequest req)
    {
        if (string.IsNullOrEmpty(req.Code))
        {
            return BadRequest(new
            {
                title = "Verification code is required.",
                Status = 400,
            });
        }
        if (req.UserId == 0)
        {
            return BadRequest(
                new
                {
                    title = "Invalid user id",
                    Status = 400,
                }
            );
        }

        var user = await _identityService.ConfirmResetPassword(req);
        if (user == null)
        {
            return BadRequest(
                new
                {
                    title = "Invalid verification code",
                    Status = 400,
                }
            );
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