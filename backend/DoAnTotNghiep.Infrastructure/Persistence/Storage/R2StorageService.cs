using Amazon.S3;
using Amazon.S3.Model;
using DoAnTotNghiep.Application.Common;

namespace DoAnTotNghiep.Infrastructure.Persistence.Storage
{
    public class R2StorageService : IFileStorageService
    {
        private readonly IAmazonS3 _s3;
        private readonly R2Settings _settings;

        public R2StorageService(R2Settings settings)
        {
            _settings = settings;

            var config = new AmazonS3Config
            {
                ServiceURL = settings.Endpoint,
                ForcePathStyle = true
            };

            _s3 = new AmazonS3Client(
                settings.AccessKey,
                settings.SecretKey,
                config);
        }

        public async Task<string> UploadAsync(Stream stream, string key, string contentType)
        {
            var request = new PutObjectRequest
            {
                BucketName = _settings.BucketName,
                Key = key,
                InputStream = stream,
                ContentType = contentType
            };

            await _s3.PutObjectAsync(request);

            return $"{_settings.PublicBaseUrl}/{key}";
        }
    }
}
