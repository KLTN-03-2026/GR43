using DoAnTotNghiep.Domain.Token;
using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Infrastructure.Persistence;
using MongoDB.Driver;

namespace DoAnTotNghiep.Infrastructure.Repositories;

public class PasswordResetTokenRepository : IPasswordResetToken
{
    private MongoDbContext _database;

    public PasswordResetTokenRepository(MongoDbContext database)
    {
        this._database = database;
    }

    

    public  async Task InsertToken(PasswordResetToken token)
    {
        await _database.PasswordResetToken.InsertOneAsync(token);
        return;
    }
    
}