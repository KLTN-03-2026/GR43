using MediatR;

namespace DoAnTotNghiep.Application.Users.Profile;

public record UpdateBioCommand(Guid UserId, string Bio, string Gender, string InterestedIn) : IRequest<bool>;

public record UpdateLocationCommand(Guid UserId, double Latitude, double Longitude, string LocationName) : IRequest<bool>;

public record UpdatePreferencesCommand(Guid UserId, int MinAgePreference, int MaxAgePreference, int MaxDistanceKm) : IRequest<bool>;

public record UpdateProfileCommand(Guid UserId, string Bio, string Gender, string InterestedIn, double Latitude, double Longitude, string LocationName, int MinAgePreference, int MaxAgePreference, int MaxDistanceKm) : IRequest<bool>;
