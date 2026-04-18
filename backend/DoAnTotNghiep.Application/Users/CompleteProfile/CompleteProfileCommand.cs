using MediatR;

namespace DoAnTotNghiep.Application.Users.CompleteProfile;

public class CompleteProfileCommand : IRequest<bool>
{
    public Guid UserId { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public DateTime Dob { get; set; }
    public string Gender { get; set; } = string.Empty;
    public List<string> Languages { get; set; } = new();
    
    // Optional background info for first setup
    public string? Education { get; set; }
    public string? Occupation { get; set; }
}
