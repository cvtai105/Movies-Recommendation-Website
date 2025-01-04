using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("")]
public class SwaggerRedirect : Controller
{

    public SwaggerRedirect()
    {
    }
    [HttpGet]
    public IActionResult Redirect()
    {
        return Redirect("/swagger/index.html");
    }
}
