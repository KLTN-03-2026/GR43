# Google Sign-In Android Setup

## 1) Thông tin app Android hiện tại

- Package name: `com.tranvanhuy16032004.datn2026`
- Debug SHA-1: `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25`
- Debug SHA-256: `FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C`

## 2) Tạo OAuth Client trên Google Cloud Console

Vào `APIs & Services` -> `Credentials` -> `Create Credentials` -> `OAuth client ID`:

1. Chọn loại `Android`.
2. Nhập:
   - Package name: `com.tranvanhuy16032004.datn2026`
   - SHA-1 certificate fingerprint: `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25`
3. Tạo thêm OAuth client loại `Web application` (để backend verify `idToken`).
4. (Nếu có iOS) tạo thêm OAuth client loại `iOS`.

## 3) Cập nhật biến môi trường

File `.env`:

- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...apps.googleusercontent.com`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=...apps.googleusercontent.com`
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=...apps.googleusercontent.com`

## 4) Rebuild native app

Sau khi đổi OAuth clients, cần build lại Android app:

```powershell
Set-Location "L:\DATN2026-STT43\frontend\mobile-react-native"
npx expo run:android
```

## 5) Lấy SHA cho máy/build khác

Nếu đổi keystore hoặc CI build, lấy lại SHA bằng:

```powershell
Set-Location "L:\DATN2026-STT43\frontend\mobile-react-native\android"
.\gradlew.bat signingReport
```

> Với production, nhớ đăng ký thêm SHA-1/SHA-256 của **release keystore** vào cùng Android OAuth client hoặc tạo client riêng.
