namespace DoAnTotNghiep.Application.Email;

public class EmailMessage
{
    public required string To { get; set; }
    public required string Subject { get; set; }
    public required string Body { get; set; }
}