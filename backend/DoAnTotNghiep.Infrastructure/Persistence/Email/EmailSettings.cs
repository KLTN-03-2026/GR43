namespace DoAnTotNghiep.Infrastructure.Persistence;

public class EmailSettings
{
    public int Port { get; set; } = 578!;
    public String DefaultCredentials { get; set; } = null!;
    public String EnableSsl { get; set; } = null!;
    public String SenderName { get; set; } = "DATN2026-STT43"!;
    public String Password { get; set; } = null!;
    public String Username { get; set; } = null!;
    public string Server { get; set; } = "smtp.gmail.com";
}
