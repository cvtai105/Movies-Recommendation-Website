using Domain.Entities;

namespace Application.Interfaces
{
    public interface IJwtService
    {
        // Token Management
        string GenerateAccessToken(User user);
        string GenerateRefreshToken(User user);
        string GetUserIdFromToken(string token);
        string GetRolesFromToken(string token);
        string RefreshToken(string refreshToken);
    }
}