using System.Globalization;
using System.Reflection;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options), IApplicationDbContext
    {
        public DbSet<Movie> Movies { get; set; } = null!;
        public DbSet<Genre> Genres { get; set; } = null!;
        public DbSet<MovieGenre> MovieGenres { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserMovie> UserMovies { get; set; } = null!;
        public DbSet<SearchHistory> SearchHistories { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().HasData( //all passwords are "123456"
                new User { Id = Guid.Parse("9e4f49fe-0783-44c6-9061-53d2ed84fab3"), Role="User", Email = "user@example.com", Hash = "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=", Name = "User 1", Status = "Active" }
            );
           
        }

    }
}