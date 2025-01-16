using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities;

public class SearchHistory
{
    public int Id { get; set; }
    public string Search { get; set; } = null!;
    public string Proccessed_search { get; set; } = null!;
    public DateTime Search_date { get; set; }
    public int UserId { get; set; }

    public User User { get; set; } = null!;
}
