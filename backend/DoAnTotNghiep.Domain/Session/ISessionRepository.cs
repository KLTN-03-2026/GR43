namespace DoAnTotNghiep.Domain.Users;

public interface ISessionRepository
{
    Task CreateSession(Session session);
}