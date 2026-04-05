using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Infrastructure.Persistence;
using MongoDB.Driver;

namespace DoAnTotNghiep.Infrastructure.Repositories;

public class UserSessionRepository : ISessionRepository
{
    private readonly IMongoCollection<Session> _sessions;

    public UserSessionRepository(MongoDbContext context)
    {
        _sessions = context.UserSessions;
    }

    public Task CreateSession(Session session)
    {
        return _sessions.InsertOneAsync(session);
    }
}