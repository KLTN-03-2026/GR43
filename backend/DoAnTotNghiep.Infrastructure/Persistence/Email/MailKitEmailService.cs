using DoAnTotNghiep.Application.Email;
using DoAnTotNghiep.Infrastructure.Persistence;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

public class MailKitEmailService(IOptions<EmailSettings> emailSettings) : IEmailService
{
    private readonly EmailSettings _emailSettings = emailSettings.Value;

    public async Task SendAsync(string to, string subject, string body, bool isHtml = true)
    {
        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(_emailSettings.SenderName));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;

        message.Body = new TextPart(isHtml ? "html" : "plain")
        {
            Text = body
        };

        using var client = new SmtpClient();

        await client.ConnectAsync(_emailSettings.Server, _emailSettings.Port, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password);

        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}