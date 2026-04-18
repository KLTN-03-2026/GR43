namespace DoAnTotNghiep.Domain.Users
{
    public class Photo
    {
        public Guid Id { get; set; } = Guid.NewGuid();

    public string Url { get; set; } = default!;

    public int Order { get; set; }

    public bool IsPrimary { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}