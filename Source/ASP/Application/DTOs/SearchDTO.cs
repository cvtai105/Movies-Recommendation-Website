using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Application.DTOs;

public class SearchDTO
{
    public string Search { get; set; } = null!;
    public int Page { get; set; } = 0;
    public int PageSize { get; set; } = 0;
    public List<string> Genres { get; set; } = [];
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

public class AIProccessedSearchDTO
{
    public string PreferTable { get; set; } = null!;
    public List<string> MoviesQueries { get; set; } = null!;
    public List<string> PeopleQueries { get; set; } = null!;
}

public class SearchResponseDTO
{
    public string PreferTable { get; set; } = null!;
    public List<BsonDocument> Movies { get; set; } = [];
    public List<BsonDocument> People { get; set; } = [];
}