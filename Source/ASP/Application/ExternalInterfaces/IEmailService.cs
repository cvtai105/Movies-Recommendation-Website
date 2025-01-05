using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ExternalInterfaces;

public interface IEmailService
{
    Task SendEmailAsync(string toEmail, string subject, string message);
}
