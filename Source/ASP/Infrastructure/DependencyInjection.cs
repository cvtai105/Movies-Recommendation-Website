// ProjectName.Infrastructure/DependencyInjection.cs
using Microsoft.Extensions.DependencyInjection;
using Application.Interfaces;
using Infrastructure.Identity;
using Microsoft.Extensions.Hosting;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IHostApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        var provider = builder.Configuration.GetConnectionString("DatabaseProvider");
        var logger = builder.Services.BuildServiceProvider().GetRequiredService<ILogger<string>>();

        builder.Services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(options =>{
            if (provider == "PostgreSQL")
            {
                logger.LogInformation("Using PostgreSQL");

                connectionString = builder.Configuration.GetConnectionString("PostgreSQLConnection");
                options.UseNpgsql(connectionString);
            }
            else
            {
                logger.LogInformation("Using SqlServer");
                options.UseSqlServer(connectionString);
            }
        });

        builder.Services.AddScoped<IJwtService, JwtService>();
    }
}
