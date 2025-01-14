using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs;

public class ResetPasswordRequest
{
    public int UserId { get; set; } = 0;
    public string Password { get; set; } = null!;
    public string Code { get; set; } = null!;
}
