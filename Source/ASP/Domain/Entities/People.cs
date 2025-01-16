using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities;

public class People
{
    public int Id { get; set; }
    public int Tmdb_id { get; set; }
    public string Name { get; set; } = null!;
    public bool Gender { get; set; }
    public string Profile_path { get; set; } = null!;
    public float Popularity { get; set; }
    public DateTime Birthday { get; set; }
    public string Biography { get; set; } = null!;

}
