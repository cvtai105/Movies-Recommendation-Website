using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities;

public class MovieGenre
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public int GenreId { get; set; }  

    public Movie Movie { get; set; } = null!;
    public Genre Genre { get; set; } = null!;
     
}
