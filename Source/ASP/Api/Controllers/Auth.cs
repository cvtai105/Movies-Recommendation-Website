using Application.DTOs.IdentityDTOs;
using Application.Extensions;
using Application.Interfaces;
using Application.InternalContracts;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("/api/auth")]
public class Auth : Controller
{
    private readonly ILogger<Auth> _logger;
    private readonly IJwtService _jwtService;
    private readonly IIdentityService _identityService;

    public Auth(ILogger<Auth> logger,  IJwtService jwtService, IIdentityService identityService)
    {
        _logger = logger;
        _jwtService = jwtService;
        _identityService = identityService;
    }
   
    [HttpPost("login")]
    public async Task<IActionResult> Login( [FromBody] LoginRecord loginInfo)
    {
        if (string.IsNullOrEmpty(loginInfo.Email) || string.IsNullOrEmpty(loginInfo.Password))
        {
            return BadRequest("Email and Password are required.");
        }

        var user = await _identityService.GetByEmail(loginInfo.Email);

        if (user == null) return Unauthorized(new { Message = "Email was not registered" });

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
            return BadRequest("Email, Password, FullName, and Phone are required.");
        }

        var user = await _identityService.GetByEmail(info.Email);
        if (user != null)
        {
            return BadRequest("Email is already registered.");
        }

        var newUser = await _identityService.CreateUser(info);

        var accessToken = _jwtService.GenerateAccessToken(newUser);
        var refreshToken = _jwtService.GenerateRefreshToken(newUser);

        return Ok(new
        {
            AccessToken = accessToken,
            TokenType = "Bearer",
            RefreshToken = refreshToken,
        });
    }
}