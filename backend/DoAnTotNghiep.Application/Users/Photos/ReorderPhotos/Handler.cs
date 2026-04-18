using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Domain.Users;
using MediatR;
using MongoDB.Driver;

namespace DoAnTotNghiep.Application.Users.Photos.ReorderPhotos
{
    public class Handler : IRequestHandler<ReoderPhotosCommand>
    {
        private readonly IUserProfileRepository _repo;
        private readonly ICurrentUserService _current;
        private readonly ICacheService _cache;

        public Handler(IUserProfileRepository repo, ICurrentUserService current, 
            ICacheService cache)
        {
            _repo = repo;
            _current = current;
            _cache = cache;
        }

        public async Task Handle(ReoderPhotosCommand request, CancellationToken cancellationToken)
        {
            var userId = _current.UserId;
            var profile = await _repo.GetByUserIdAsync(Guid.TryParse(userId, out var guid) ? guid : throw new ArgumentNullException());
            if (profile == null)
                throw new NotFoundException("Profile not found");
            if (request.PhotoIds.Count != profile.Photos.Count)
                throw new BadRequestException("Invalid data");
            var map = profile.Photos.ToDictionary(x => x.Id, x => x);
            var newPhotos = new List<Photo>();
            for (int i = 0; i < request.PhotoIds.Count; i++){
                if (!map.ContainsKey(request.PhotoIds[i]))
                    throw new BadRequestException("Invalid photo");
                var photo = map[request.PhotoIds[i]];
                photo.Order = i;
                photo.IsPrimary = i == 0;
                newPhotos.Add(photo);
            }
            profile.Photos = newPhotos;
            await _repo.UpdateAsync(profile);
            await _cache.RemoveAsync(
                $"user:{userId}:photos");
        }
    }
}
