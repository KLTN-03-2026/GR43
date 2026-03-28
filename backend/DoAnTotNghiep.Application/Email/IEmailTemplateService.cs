namespace DoAnTotNghiep.Application.Email;

public interface IEmailTemplateService
{
    public Task<string> RenderAsync(string templateName, object model);
}