using Newtonsoft.Json;

public partial class MovieApiResponse
{
    [JsonProperty("page")]
    public long Page { get; set; }

    [JsonProperty("total_results")]
    public long TotalResults { get; set; }

    [JsonProperty("total_pages")]
    public long TotalPages { get; set; }

    [JsonProperty("results")]
    public Movie[] Movies { get; set; }
}