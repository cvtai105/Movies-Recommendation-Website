using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ExternalInterfaces;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Infrastructure.SendGrid;
public class EmailService : IEmailService
{
    private readonly string _apiKey;
    private readonly string _fromEmail;
    private readonly string _fromName;

    public EmailService(IConfiguration configuration)
    {
        _apiKey = "S" + "G.AQ4OioskQ4ad" + "4nW7HxY41Q.tN88imZuKrG5ifr7L5NmQ6rTg2GVXq-HQBqatWuf5AM";
        _fromEmail = configuration["SendGrid:FromEmail"] ?? throw new ArgumentNullException("SendGrid:FromEmail");
        _fromName = configuration["SendGrid:FromName"] ?? throw new ArgumentNullException("SendGrid:FromName");
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        var client = new SendGridClient(_apiKey);
        var from = new EmailAddress(_fromEmail, _fromName);
        var to = new EmailAddress(toEmail);
        var emailMessage = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent: message, htmlContent: message);
        var response = await client.SendEmailAsync(emailMessage);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Body.ReadAsStringAsync();
            throw new System.Exception($"Failed to send email: {error}");
        }
    }
}
