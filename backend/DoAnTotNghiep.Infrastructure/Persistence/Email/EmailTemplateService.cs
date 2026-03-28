using DoAnTotNghiep.Application.Email;

namespace DoAnTotNghiep.Infrastructure.Persistence.Email.Template;

public class EmailTemplateService : IEmailTemplateService
{
    private readonly string _templatePath = "Templates";

    public async Task<string> RenderAsync(string templateName, object model)
    {
        var path = Path.Combine(
            AppContext.BaseDirectory,
            "Persistence",
            "Email",
            "Templates",
            $"{templateName}.html"
        );

        if (!File.Exists(path))
            throw new Exception("Template not found");

        var content = await File.ReadAllTextAsync(path);

        var properties = model.GetType().GetProperties();

        foreach (var prop in properties)
        {
            var value = prop.GetValue(model)?.ToString() ?? "";
            content = content.Replace($"{{{{{prop.Name}}}}}", value);
        }

        return content;
    }
}