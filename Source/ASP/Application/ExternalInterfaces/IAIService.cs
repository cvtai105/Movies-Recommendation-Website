using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Application.DTOs;

namespace Application.ExternalInterfaces;

public interface IAIService
{
    Task<string?> Navigate(string search);
    Task<AIProccessedSearchDTO> ProccessRequest(string search);
}
