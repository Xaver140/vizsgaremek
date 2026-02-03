public class LoginReq
{
    public string email { get; set; } = "";
    public string password { get; set; } = "";
}

public class LoginRes
{
    public string token { get; set; } = "";
}
