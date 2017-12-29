using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

public partial class Movie
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("title")]
    public string Title { get; set; }

    [JsonProperty("overview")]
    public string Overview { get; set; }

    [JsonProperty("backdrop_path")]
    public string BackdropPath { get; set; }

    [JsonProperty("vote_average")]
    public double VoteAverage { get; set; }

    [NotMapped]
    [JsonProperty("recommended")]
    public bool IsRecommended { get; set; }
}