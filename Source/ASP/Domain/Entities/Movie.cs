using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Release_date { get; set; } = null!;
    public string Poster_path { get; set; } = null!;
    public double Vote_average { get; set; }
    public int Vote_count { get; set; }

    public List<MovieGenre> MovieGenres { get; set; } = [];
    public List<UserMovie> UserMovies { get; set; } = [];

}
