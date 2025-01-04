using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities;

public class UserMovie
{
    public int Id { get; set; }
    public double? Rating { get; set; } = null;
    public bool Favorite { get; set; } = false;
    public bool Watched { get; set; } = false;
    public DateTime? Watched_date { get; set; } = null;

    public Guid UserId { get; set; }
    public int MovieId { get; set; }
}
