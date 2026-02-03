using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

public class ApiClient
{
    private readonly HttpClient _http;
    private readonly JsonSerializerOptions _json = new() { PropertyNameCaseInsensitive = true };

    public ApiClient(string baseUrl)
    {
        _http = new HttpClient { BaseAddress = new Uri(baseUrl) };
        _http.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public void SetBearerToken(string token)
    {
        _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    }

    private static async Task EnsureOk(HttpResponseMessage res)
    {
        if (res.IsSuccessStatusCode) return;

        var body = await res.Content.ReadAsStringAsync();

        if (res.StatusCode == HttpStatusCode.Unauthorized)
            throw new Exception("401 Unauthorized: hibás email/jelszó. " + body);

        throw new Exception($"HTTP {(int)res.StatusCode}: {body}");
    }

    public async Task<TRes?> PostAsync<TReq, TRes>(string url, TReq body)
    {
        var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
        using var res = await _http.PostAsync(url, content);
        await EnsureOk(res);

        var json = await res.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<TRes>(json, _json);
    }
}
