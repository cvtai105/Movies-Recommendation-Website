using Microsoft.Extensions.DependencyInjection;
using Application.Interfaces;
using Infrastructure.Identity;
using Microsoft.Extensions.Hosting;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Application.ExternalInterfaces;

namespace Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IHostApplicationBuilder builder)
    {
        string connectionString = "";
        var provider = builder.Configuration.GetConnectionString("DatabaseProvider");
        var logger = builder.Services.BuildServiceProvider().GetRequiredService<ILogger<string>>();

        builder.Services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(options =>
        {
            if (provider == "LocalPostgreSQL")
            {
                logger.LogInformation("Using Local PostgreSQL");
                connectionString = builder.Configuration.GetConnectionString("LocalPostgreSQLConnection") ?? "";
                options.UseNpgsql(connectionString);
            }
            else if (provider == "PostgreSQL")
            {
                logger.LogInformation("Using PostgreSQL");
                connectionString = builder.Configuration.GetConnectionString("PostgreSQLConnection") ?? "";
                options.UseNpgsql(connectionString);
            }
            else
            {
                logger.LogInformation("Using SqlServer");
                connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";
                options.UseSqlServer(connectionString);
            }
        });

        builder.Services.AddScoped<IJwtService, JwtService>();
        builder.Services.AddSingleton<IEmailService, SendGrid.EmailService>();

        builder.Services.AddMemoryCache();

    }
}
