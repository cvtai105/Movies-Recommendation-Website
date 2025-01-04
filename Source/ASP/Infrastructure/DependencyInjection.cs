// ProjectName.Infrastructure/DependencyInjection.cs
using Microsoft.Extensions.DependencyInjection;
using Application.Interfaces;
using Infrastructure.Identity;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            // services.AddDbContext<ApplicationDbContext>(options =>
            //     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IJwtService, JwtService>();
            return services;
        }
    }
}
