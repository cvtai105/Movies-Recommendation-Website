using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.ExternalInterfaces;
using Domain.Entities;
using Infrastructure.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Identity
{
    public class JwtService : IJwtService
    {
        private readonly JwtOptions _options;

        public JwtService(IOptions<JwtOptions> options)
        {
            _options = options.Value;
        }

        public string GenerateAccessToken(User user)
        {
            return GenerateToken(user, DateTime.UtcNow.AddHours(5000));
        }

        public string GenerateRefreshToken(User user)
        {
            return GenerateToken(user, DateTime.UtcNow.AddDays(7));
        }

        public string GenerateToken(User user, DateTime? expires = null)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_options.Secret);

            var claims = new List<Claim>()
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Email, user.Email),
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(ClaimTypes.Role, user.Role),
                new Claim("userId", user.Id.ToString()),
                new Claim("picture", user.Avatar?? ""),
                new Claim("name", user.Name),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _options.Issuer,
                Audience = _options.Audience
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GetRolesFromToken(string token)
        {
            throw new NotImplementedException();
        }
        public string GetUserIdFromToken(string token)
        {
            throw new NotImplementedException();
        }

        public string RefreshToken(string refreshToken)
        {
            throw new NotImplementedException();
        }

    }
}