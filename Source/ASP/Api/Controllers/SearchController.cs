using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.ExternalInterfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers;

[Route("api/llm/search")]
public class SearchController : Controller
{
    private readonly ILogger<SearchController> _logger;
    private readonly IAIService _aIService;

    public SearchController(ILogger<SearchController> logger, IAIService aIService)
    {
        _logger = logger;
        _aIService = aIService;
    }


    [HttpGet]
    public async Task<IActionResult> Navigate([FromQuery] string search)
    {
        return Ok(new
        {
            status = 200,
            message = await _aIService.Navigate(search)
        });
    }
}
