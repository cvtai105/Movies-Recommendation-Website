using System.Diagnostics;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Api.Middlewares;
public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger, IHostEnvironment environment) : IExceptionHandler
{
    private const bool IsLastStopInPipeline = true;

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext,
        Exception exception, CancellationToken cancellationToken)
    {
        var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;
        logger.LogError(exception, "Could not process a request on machine {MachineName} with trace id {TraceId}",
            Environment.MachineName, traceId);

        (int statusCode, string title) = MapException(exception);

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Extensions = { ["traceId"] = traceId },
            Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}"
        };
        if (!environment.IsProduction())
        {
            problemDetails.Detail = exception.Message;
        }

        await httpContext.Response
            .WriteAsJsonAsync(problemDetails, cancellationToken);
        return IsLastStopInPipeline;
    }

    private static (int statusCode, string title) MapException(Exception exception)
    {
        return exception switch
        {
            NotImplementedException => (501, "This api is still under development"),
            ArgumentException => (400, "Invalid arguments"),
            KeyNotFoundException => (404, "Resource not found"),
            _ => (500, "An unhandled error occurred")
        };
    }
}