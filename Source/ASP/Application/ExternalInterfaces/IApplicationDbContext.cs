using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Movie> Movies { get; set; }
        DbSet<Genre> Genres { get; set; }
        DbSet<MovieGenre> MovieGenres { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<UserMovie> UserMovies { get; set; }
        DbSet<SearchHistory> SearchHistories { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}