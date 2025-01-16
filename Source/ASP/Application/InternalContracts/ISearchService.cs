using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs;
using Application.DTOs.IdentityDTOs;
using Domain.Entities;

namespace Application.InternalContracts;

public interface ISearchService
{
    Task<SearchResponseDTO> SearchAI(SearchDTO search);
}
