using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Filters;
public class MovieFilter
{
    public string? Title { get; set; }
    public DateTime? ReleaseDate { get; set; }
    public List<string> Genre { get; set; } = [];
    public string? Overview { get; set; }
    public float? Rating { get; set; }
    public float? Popularity { get; set; }
}
