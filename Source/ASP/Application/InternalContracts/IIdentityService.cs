using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.IdentityDTOs;
using Domain.Entities;

namespace Application.InternalContracts;

public interface IIdentityService
{
    Task<User> CreateUser(Registration info);
    Task<User?> GetByEmail(string email);

}
