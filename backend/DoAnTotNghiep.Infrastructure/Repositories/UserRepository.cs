using MongoDB.Driver;
using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Infrastructure.Persistence;

namespace DoAnTotNghiep.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<UserAccount> _users;

    public UserRepository(MongoDbContext context)
    {
        _users = context.UserAccounts;
    }

    public async Task CreateAccount(UserAccount user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task Create(UserAccount user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task<UserAccount?> GetByEmail(string email)
    {
        return await _users
            .Find(x => x.Email == email)
            .FirstOrDefaultAsync();
    }

    public async Task<UserAccount?> ResetPassword(String newHashedPassword, String email)
    {
        var filter = Builders<UserAccount>.Filter.Eq(x => x.Email, email);
        var update = Builders<UserAccount>.Update.Set(x => x.HashPassword, newHashedPassword);
        var options = new FindOneAndUpdateOptions<UserAccount>()
        {
            ReturnDocument = ReturnDocument.Before
        };
        var response = await _users.FindOneAndUpdateAsync(filter, update, options);
        return response;
    }

    public async Task<UserAccount?> GetByRefreshToken(string refreshToken)
    {
        var filter = Builders<UserAccount>.Filter.ElemMatch(x => x.RefreshTokens, x => x.Token == refreshToken);
        return await _users.Find(filter).FirstOrDefaultAsync();
    }

    public async Task UpdateAsync(UserAccount user)
    {
        var filter = Builders<UserAccount>.Filter.Eq(x => x.Id, user.Id);
        await _users.ReplaceOneAsync(filter, user);
    }

    public async Task DeleteAccount(string userId)
    {
        if (Guid.TryParse(userId, out var guid))
        {
            var filter = Builders<UserAccount>.Filter.Eq(x => x.Id, guid);
            await _users.DeleteOneAsync(filter);
        }
    }
}