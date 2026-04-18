using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Domain.Users;
using MediatR;

namespace DoAnTotNghiep.Application.Users.CompleteProfile;

public class CompleteProfileHandler(
    IUserProfileRepository profileRepository,
    IUserRepository userRepository
) : IRequestHandler<CompleteProfileCommand, bool>
{
    public async Task<bool> Handle(CompleteProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByIdAsync(request.UserId);
        if (user == null)
            throw new NotFoundException("User not found");

        var existingProfile = await profileRepository.GetByUserIdAsync(request.UserId);
        
        if (existingProfile == null)
        {
            var profile = new UserProfile(request.UserId);
            profile.UpdateBasicInfo(request.DisplayName, request.Dob, request.Gender, request.Languages);
            
            if (!string.IsNullOrEmpty(request.Education) || !string.IsNullOrEmpty(request.Occupation))
            {
                profile.UpdateBackground(request.Education ?? string.Empty, request.Occupation ?? string.Empty);
            }
            
            await profileRepository.CreateAsync(profile);
        }
        else
        {
            existingProfile.UpdateBasicInfo(request.DisplayName, request.Dob, request.Gender, request.Languages);
            
            if (!string.IsNullOrEmpty(request.Education) || !string.IsNullOrEmpty(request.Occupation))
            {
                existingProfile.UpdateBackground(request.Education ?? string.Empty, request.Occupation ?? string.Empty);
            }
            
            await profileRepository.UpdateAsync(existingProfile);
        }

        return true;
    }
}
