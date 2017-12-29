using Newtonsoft.Json;

public partial class Person
{
    [JsonProperty("popularity")]
    public double Popularity { get; set; }

    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("profile_path")]
    public string ProfilePath { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("known_for")]
    public Movie[] KnownFor { get; set; }

    [JsonProperty("adult")]
    public bool Adult { get; set; }
}
