using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

public static class FilterMap
{
    public static FilterDefinition<BsonDocument> Map(string field, string comparison, object value)
    {
        switch (comparison.ToLower())
        {
            case "eq":
                return Builders<BsonDocument>.Filter.Eq(field, value);
            case "ne":
                return Builders<BsonDocument>.Filter.Ne(field, value);
            case "gt":
                return Builders<BsonDocument>.Filter.Gt(field, value);
            case "gte":
                return Builders<BsonDocument>.Filter.Gte(field, value);
            case "lt":
                return Builders<BsonDocument>.Filter.Lt(field, value);
            case "lte":
                return Builders<BsonDocument>.Filter.Lte(field, value);
            case "in":
                return Builders<BsonDocument>.Filter.In(field, (IEnumerable<object>)value);
            case "nin":
                return Builders<BsonDocument>.Filter.Nin(field, (IEnumerable<object>)value);
            case "exists":
                return Builders<BsonDocument>.Filter.Exists(field, (bool)value);
            case "regex":
                return Builders<BsonDocument>.Filter.Regex(field, new BsonRegularExpression(value.ToString()));
            case "text":
                return Builders<BsonDocument>.Filter.Text(value.ToString());
            case "all":
                return Builders<BsonDocument>.Filter.All(field, (IEnumerable<object>)value);
            case "elemmatch":
                return Builders<BsonDocument>.Filter.ElemMatch(field, (FilterDefinition<BsonDocument>)value);
            default:
                throw new ArgumentException($"Invalid comparison operator: {comparison}");
        }
    }
}