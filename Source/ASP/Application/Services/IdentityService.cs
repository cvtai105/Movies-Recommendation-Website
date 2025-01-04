using Application.DTOs.IdentityDTOs;
using Application.Extensions;
using Application.Interfaces;
using Application.InternalContracts;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class IdentityService : IIdentityService
{
    IApplicationDbContext _context;
    IJwtService _jwtService;

    public IdentityService(IApplicationDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<User> CreateUser(Registration param)
    {
        var user = new Domain.Entities.User
            {
                Id = Guid.NewGuid(),
                Email = param.Email,
                Name = param.Name
            };



            user.Hash = param.Password.HashPassword();

            var check = _context.Users.FirstOrDefault(x => x.Email == param.Email);

            if (check != null)
            {
                throw new Exception("Email already exists");
            }

            //check role
            // var validRoles = typeof(Roles)
            //     .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)
            //     .Select(f => f.GetValue(null)?.ToString()?.ToLower())
            //     .ToList();

            // for (int i = 0; i < validRoles.Count; i++)
            // {
            //     if (param.Role.ToLower() == validRoles[i]?.ToLower())
            //     {
            //         user.Role = validRoles[i] ?? throw new UnsupportedRoleException(param.Role);
            //         break;
            //     }
            //     if (i == validRoles.Count - 1)
            //     {
            //         throw new UnsupportedRoleException(param.Role);
            //     }
            // }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();


            return user;
    }

    public async Task<User?> GetByEmail(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        return user;
    }
}
