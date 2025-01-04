using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Exceptions;

public class InvalidInputException : Exception
{
    public InvalidInputException(string message) : base(message)
    {
    }
}

    
