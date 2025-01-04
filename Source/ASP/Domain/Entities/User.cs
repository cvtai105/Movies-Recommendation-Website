using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    [StringLength(40)]
    public string Name { get; set; } = null!;
    [StringLength(200)]
    public string? Avatar { get; set; } = null!;
    [EmailAddress]
    public string Email { get; set; } = null!;
    [JsonIgnore]
    public string Hash { get; set; } = null!;
    [StringLength(20)]
    public string? Status { get; set; }

    public ICollection<SearchHistory> SearchHistories { get; set; } = [];
    public ICollection<UserMovie> UserMovies { get; set; } = [];

}