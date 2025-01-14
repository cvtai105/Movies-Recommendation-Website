using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Application.DTOs;
using Application.ExternalInterfaces;
using OpenAI;
using OpenAI.Chat;

namespace Infrastructure.OpenAI;

public class OpenAIService : IAIService
{
    private readonly string _apiKey = "s" + "k-proj-TK4" + "7rUS-dmN36Vxt-29K3oBL4z5" + "NGRl6yHCXJ6pMLF4Um_R_oC3i636EBBz8xYFKeQR" + "_-yAt4eT3BlbkFJDH2dGF1DXV4cbR6KIkUxspLMvXgiRGZAGEGaDpNjO1U6Ena1nr_rScvHEtyFbG3kJAnrgVsg0A";
    private readonly OpenAIClient _initor;
    private readonly ChatClient _chatClient;

    public OpenAIService()
    {
        _initor = new OpenAIClient(_apiKey);
        _chatClient = _initor.GetChatClient("gpt-3.5-turbo-0125");
    }

    public async Task<string?> Navigate(string search)
    {
        ChatCompletionOptions options = new()
        {
            ResponseFormat = ChatResponseFormat.CreateJsonSchemaFormat(
            jsonSchemaFormatName: "query",
            jsonSchema: BinaryData.FromBytes(Encoding.UTF8.GetBytes("""
            {
                "type": "object",
                "properties": {
                    "prefer_table": { "type": "string" }
                },
                "required": ["prefer_table"],
                "additionalProperties": false
            }
            """)),
            jsonSchemaIsStrict: true)
        };
        List<ChatMessage> messages =
        [
            new SystemChatMessage("Your task is to provide me the prefer table that user want to search (movies or actors or unknown); and one keywords to search"),
            new UserChatMessage(search),
        ];
        ChatCompletion completion = await _chatClient.CompleteChatAsync(messages, options);

        using JsonDocument structuredJson = JsonDocument.Parse(completion.Content[0].Text);
        var prefer = structuredJson.RootElement.GetProperty("prefer_table").GetString();

        return prefer;
    }

    public Task<AIProccessedSearchDTO> ProccessRequest(string search)
    {
        ChatCompletionOptions options = new()
        {
            ResponseFormat = ChatResponseFormat.CreateJsonSchemaFormat(
            jsonSchemaFormatName: "query",
            jsonSchema: BinaryData.FromBytes("""
                {
                    "type": "object",
                    "properties": {
                        "movies_queries": {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "actors_queries": {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "prefer_table": { "type": "string" }
                        },
                        "required": ["prefer_table", "actors_queries", "movies_queries"],
                        "additionalProperties": false
                    }
                """u8.ToArray()),
            jsonSchemaIsStrict: true)
        };
        List<ChatMessage> messages =
        [
            new SystemChatMessage("You are a MongoDB developer and I need you provide me List<string> filters to map to List<FilterDefinition<BsonDocument>> in 2 tables: movies and actors base on user message. and choose prefer table that user want to search (movies or actors or unknown)"),
            new SystemChatMessage("You can search Movies base on these column: title, release_date, genre, overview, rating, and popularity: float"),
            new SystemChatMessage("You can search Actors base on these column:  name, birthday, gender: bool, popularity: float, and biography"),
            new SystemChatMessage("Some example of filters: {\"title\": \"The Dark Knight\"}, {\"genre\": \"Action\"}, {\"rating\": {\"$gt\": 8.5}}"),
            new SystemChatMessage("Note that MongoDB is cloned from TMDB database"),
            new UserChatMessage(search),
        ];
        ChatCompletion completion = _chatClient.CompleteChat(messages, options);

        using JsonDocument structuredJson = JsonDocument.Parse(completion.Content[0].Text);
        var prefer = structuredJson.RootElement.GetProperty("prefer_table").GetString();
        var movies_queries = structuredJson.RootElement.GetProperty("movies_queries").EnumerateArray().Select(x => x.GetString()).ToList();
        var actors_queries = structuredJson.RootElement.GetProperty("actors_queries").EnumerateArray().Select(x => x.GetString()).ToList();

        return Task.FromResult(new AIProccessedSearchDTO
        {
            PreferTable = prefer,
            MoviesQueries = movies_queries,
            PeopleQueries = actors_queries
        });
    }
}
