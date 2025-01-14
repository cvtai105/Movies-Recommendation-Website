using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs;
using Application.DTOs.IdentityDTOs;
using Domain.Entities;

namespace Application.InternalContracts;

public interface IIdentityService
{
    Task<User> CreateUser(Registration info);
    Task<User?> GetByEmail(string email);
    Task<bool> SendActiveCodeViaEmail(User user);
    Task<User?> ConfirmEmail(int userId, string code);
    Task<bool> SendResetPasswordCodeViaEmail(User user);
    Task<User?> ConfirmResetPassword(ResetPasswordRequest request);
    Task<User?> ActiveUser(int userId);
}
