using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs;

public class ResetPasswordRequest
{
    public Guid UserId { get; set; }
    public string Password { get; set; } = null!;
    public string Code { get; set; } = null!;
}
