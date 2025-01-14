using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Filters;

public class PeopleFilter
{
    public string? Name { get; set; }
    public DateTime? Birthday { get; set; }
    public bool? Gender { get; set; }
    public float? Popularity { get; set; }
    public string? Biography { get; set; }
}