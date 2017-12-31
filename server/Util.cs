using server.Models;
using System;

namespace server
{
    public class Util
    {
        public static StandardResponse SendErrorResponse(string description, Exception ex)
        {
            Console.WriteLine(ex.Message);

            return new StandardResponse()
            {
                Status = 500,
                Description = description
            };
        }
    }
}
