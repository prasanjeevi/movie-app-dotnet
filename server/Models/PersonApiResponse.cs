using Newtonsoft.Json;

namespace server.Models
{
    public partial class PersonApiResponse
    {
        [JsonProperty("page")]
        public long Page { get; set; }

        [JsonProperty("total_results")]
        public long TotalResults { get; set; }

        [JsonProperty("total_pages")]
        public long TotalPages { get; set; }

        [JsonProperty("results")]
        public Person[] People { get; set; }
    }
}