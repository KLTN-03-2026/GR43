using DoAnTotNghiep.Domain.Users;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace DoAnTotNghiep.Infrastructure.Persistence;

public class MongoDbContext
{
    static MongoDbContext()
    {
        try
        {
            BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
        }
        catch (BsonSerializationException)
        {
            // Already registered, ignore
        }
    }

    private readonly IMongoDatabase _database;

    public MongoDbContext(MongoSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        _database = client.GetDatabase(settings.Database);
    }

    public IMongoCollection<Users> Users => _database.GetCollection<Users>("users");
}

public class MongoDbInitializer
{
    private readonly IMongoDatabase _database;

    public MongoDbInitializer(MongoSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        _database = client.GetDatabase(settings.Database);
    }

    public async Task InitializeAsync()
    {
        var usersCollection = _database.GetCollection<Users>("users");
        await usersCollection.Indexes.CreateOneAsync(new CreateIndexModel<Users>(
            Builders<Users>.IndexKeys.Ascending(u => u.Email),
            new CreateIndexOptions { Unique = true }
        ));
    }
}