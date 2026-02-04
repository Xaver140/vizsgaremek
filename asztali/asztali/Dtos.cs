namespace asztali;

    public class LoginReq
    {
        public string email { get; set; } = "";
        public string password { get; set; } = "";
    }

    public class LoginRes
    {
        public string token { get; set; } = "";
    }

    public class FilmDto
    {
        public int film_id { get; set; }
        public string title { get; set; } = "";
        public string? description { get; set; }
        public int duration_minutes { get; set; }
        public int? release_year { get; set; }
        public string? genre { get; set; }
        public bool is_active { get; set; }
    }