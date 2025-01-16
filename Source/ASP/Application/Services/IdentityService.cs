using Application.DTOs;
using Application.DTOs.IdentityDTOs;
using Application.Extensions;
using Application.ExternalInterfaces;
using Application.Interfaces;
using Application.InternalContracts;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace Application.Services;

public class IdentityService : IIdentityService
{
    private readonly IApplicationDbContext _context;
    private readonly IJwtService _jwtService;
    private readonly IEmailService _emailService;
    private readonly IMemoryCache _memoryCache;
    public IdentityService(IMemoryCache memoryCache, IApplicationDbContext context, IJwtService jwtService, IEmailService emailService, IConfiguration configuration)
    {
        _memoryCache = memoryCache;
        _context = context;
        _jwtService = jwtService;
        _emailService = emailService;
    }

    public Task<User?> ActiveUser(int userId)
    {
        var user = _context.Users.FirstOrDefault(x => x.Id == userId);
        if (user != null)
        {
            user.Status = "Active";
            _context.Users.Update(user);
            _context.SaveChangesAsync();
            return Task.FromResult<User?>(user);
        }
        return Task.FromResult<User?>(null);
    }

    public Task<User?> ConfirmEmail(int userId, string code)
    {
        // Try to retrieve the token from memory
        if (_memoryCache.TryGetValue($"EmailConfirmation_{userId}", out string? storedToken))
        {
            if (storedToken == code)
            {
                // Token is valid; proceed with email confirmation
                _memoryCache.Remove($"EmailConfirmation_{userId}");
                var user = _context.Users.FirstOrDefault(x => x.Id == userId);
                if (user != null)
                {
                    user.Status = "Active";
                    _context.Users.Update(user);
                    _context.SaveChangesAsync();
                    return Task.FromResult<User?>(user);
                }
            }
            else
            {
                throw new ArgumentException("Wrong code", nameof(code));
            }
        }
        return Task.FromResult<User?>(null);
    }

    public Task<User?> ConfirmResetPassword(ResetPasswordRequest req)
    {
        // Try to retrieve the token from memory
        if (_memoryCache.TryGetValue($"PasswordReset_{req.UserId}", out string? storedToken))
        {
            if (storedToken == req.Code)
            {
                // Token is valid; proceed with password reset
                _memoryCache.Remove($"PasswordReset_{req.UserId}");
                var user = _context.Users.FirstOrDefault(x => x.Id == req.UserId);
                if (user != null)
                {
                    user.Hash = req.Password.HashPassword();
                    _context.Users.Update(user);
                    _context.SaveChangesAsync();
                    return Task.FromResult<User?>(user);
                }
            }
        }
        return Task.FromResult<User?>(null);
    }

    public async Task<User> CreateUser(Registration param)
    {
        var user = new User
        {
            Email = param.Email,
            Name = param.Name,
            Role = "User",
            Status = "Inactive",
            Avatar = param.Avatar
        };

        user.Hash = param.Password.HashPassword();

        var check = _context.Users.FirstOrDefault(x => x.Email == param.Email);

        if (check != null)
        {
            throw new Exception("Email already exists");
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();


        return user;
    }

    public async Task<User?> GetByEmail(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        return user;
    }

    public async Task<bool> SendActiveCodeViaEmail(User user)
    {
        string code = new Random().Next(100000, 999999).ToString();

        string message = $"Active code: {code}";

        _memoryCache.Set($"EmailConfirmation_{user.Id}", code, TimeSpan.FromMinutes(15));

        await _emailService.SendEmailAsync(user.Email, "Active Code Movies Recommendation Website", message);
        return true;
    }

    public async Task<bool> SendResetPasswordCodeViaEmail(User user)
    {
        string code = new Random().Next(100000, 999999).ToString();

        string message = $"Reset password code: {code}";

        _memoryCache.Set($"PasswordReset_{user.Id}", code, TimeSpan.FromMinutes(15));

        await _emailService.SendEmailAsync(user.Email, "Reset Password Code Movies Recommendation Website", message);
        return true;
    }
}
