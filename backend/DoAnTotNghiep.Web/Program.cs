using DoAnTotNghiep.Application.Users;
using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Infrastructure.Persistence;
using DoAnTotNghiep.Infrastructure.Persistence.Persistence;
using DoAnTotNghiep.Infrastructure.Repositories;
using DoAnTotNghiep.Web;

var builder = WebApplication.CreateBuilder(args);

var mongoSettings = builder.Configuration
    .GetSection("MongoDb")
    .Get<MongoSettings>();

builder.Services.AddSingleton(mongoSettings!);
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddInfrastructure();
builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();
app.UseHttpsRedirection();

app.Run();