using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Application.DTOs;
using Application.ExternalInterfaces;

namespace Infrastructure.Gemini;

public class GeminiService : IAIService
{
    private readonly string _apiKey = "AIz"+"aSyBchT9"+"xBWP_6bjYDw-Ew64JHnrqz6EMC6c";
    private readonly HttpClient _httpClient;

    public GeminiService()
    {
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent")
        };
    }

    public async Task<string?> Navigate(string search)
    {
        var requestBody = new
        {
            contents = new[]
            {
                new
                {
                    role = "model",
                    parts = new[]
                    {
                        new { text = "Provide one word indicating the preferred table for the user's search (movies, actors, or unknown); and one keywords to search on tmdb" }
                    }
                },
                new
                {
                    role = "user",
                    parts = new[]
                    {
                        new { text = search }
                    }
                }
            }
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync($"?key={_apiKey}", content);
        var responseContent = await response.Content.ReadAsStringAsync();

        using JsonDocument json = JsonDocument.Parse(responseContent);
        var result = json.RootElement.GetProperty("candidates")[0].GetProperty("content").GetProperty("parts")[0].GetProperty("text").GetString();
        return result;
    }

    public Task<AIProccessedSearchDTO> ProccessRequest(string search)
    {
        throw new NotImplementedException();
    }
}