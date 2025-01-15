// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Application.DTOs;
// using Application.ExternalInterfaces;
// using Application.InternalContracts;
// using Domain.Entities;
// using MongoDB.Bson;
// using MongoDB.Driver;

// namespace Application.Services;

// public class SearchService : ISearchService
// {
//     private readonly IAIService _aiService;
//     private readonly IMongoDatabase _database;

//     public SearchService(IAIService aiService, IMongoDatabase database)
//     {
//         _aiService = aiService;
//         _database = database;
//     }

//     public async Task<SearchResponseDTO> SearchAI(SearchDTO search)
//     {
//         AIProccessedSearchDTO proccessed = await _aiService.ProccessRequest(search.Search);

//         List<BsonDocument> movies = [];
//         List<BsonDocument> people = [];

//         foreach (string query in proccessed.MoviesQueries)
//         {
//             try
//             {
//                 var filter = Builders<BsonDocument>.Filter.Eq("genre", "Action");
//                 var collection = _database.GetCollection<BsonDocument>("Movies");
//                 var result = await collection.Find(filter).ToListAsync();
//                 movies.AddRange(result);
//             }
//             catch (Exception)
//             {
//             }
//         }

//         foreach (string query in proccessed.PeopleQueries)
//         {
//             try
//             {
//                 var filter = Builders<BsonDocument>.Filter.Eq("name", "Tom Cruise");
//                 var collection = _database.GetCollection<BsonDocument>("People");
//                 var result = await collection.Find(filter).ToListAsync();
//                 people.AddRange(result);
//             }
//             catch (Exception)
//             {
//             }
//         }



//     }
// }

// internal class Person
// {
// }