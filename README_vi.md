# Hệ Thống Ghép Đôi Người Dùng & Phát Hiện Tài Khoản Lừa Đảo

## Trạng thái build & server
- Backend API build: passing / pipeline đang chạy ổn định.
- Realtime server: online, WebSocket + WebRTC services trên VPS.

## Mục lục
- [Giới thiệu](#giới-thiệu)
- [Thành viên & vai trò](#thành-viên--vai-trò)
- [Công nghệ](#công-nghệ)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Quy tắc repository](#quy-tắc-repository)
  - [Branch strategy](#branch-strategy)
  - [Quy ước commit](#quy-ước-commit)
  - [Pull Request](#pull-request)
  - [Milestone](#milestone)
  - [Issue](#issue)
  - [Bảo vệ branch](#bảo-vệ-branch)
  - [Release](#release)
  - [Workflow mẫu](#workflow-mẫu)
- [Folder structure](#folder-structure)

## Giới thiệu
Xây dựng hệ thống ghép đôi người dùng tích hợp mô hình học máy để phát hiện tài khoản lừa đảo. Người dùng được đánh giá liên tục từ giao tiếp WebRTC, hành vi chat/kéo. ML model hỗ trợ bằng XGBoost + Sentence Transformers. Backend/API dùng ASP.NET Core 8, realtime layer WebSocket, call system WebRTC + STUN/TURN.

## Thành viên & vai trò
| MSSV | Họ và tên | Email | Vai trò |
| --- | --- | --- | --- |
| 28209051610 | Chu Phương Anh | chuphuonganh21082004@gmail.com | Frontend |
| 28211153072 | Phan Công Danh | cdanh1324@gmail.com | Backend |
| 28211152835 | Trần Huy | tranhuy142004@gmail.com | Backend |
| 28211152784 | Phùng Định Quang Huy | huyphung00@gmail.com | Machine Learning |
| 28211152835 | Trần Văn Huy | tranvanhuy160304@gmail.com | System / DevOps |

## Công nghệ
- Frontend: ReactJS, React Native, TypeScript, TailwindCSS, WebSocket.
- Backend: ASP.NET Core 8 (JWT, FluentValidation), WebSocket Server.
- Database: MongoDB.
- Cache: Redis.
- AI/ML: Python + FastAPI, XGBoost, Sentence Transformers.
- Call System: WebRTC + STUN + Coturn (TURN).
- DevOps: Docker + Nginx, Vercel cho frontend, VPS cho backend + call server.

## Kiến trúc hệ thống
Client (Web/Mobile) → Frontend (React/React Native) → Backend API (ASP.NET Core)  
└→ MongoDB · Redis · AI service (FastAPI + XGBoost + Sentence Transformers)  
Realtime layer: WebSocket gateways (API + call)  
Call system: WebRTC + STUN/TURN + Coturn.

## Quy tắc repository

### Branch strategy
- GitFlow: `main` (production, không commit trực tiếp), `develop`, `feature/*`, `release/*`, `hotfix/*`.
- Ví dụ branch: `feature/authentication`, `release/v0.1.0`, `hotfix/login-bug`.

### Quy ước commit
- Conventional Commit: `<type>(<scope>): <message>`.
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.
- Ví dụ: `feat(auth): implement user login API`.

### Pull Request
- Từ feature branch merge vào `develop`, tiêu đề rõ ràng, checklist: build, review, conflict.
- Template: Description / Related Issue / Changes / Checklist.

### Milestone
- v0.1.0: Authentication + profile
- v0.2.0: Swipe system
- v0.3.0: Recommendation engine
- v0.4.0: Scam detection ML
- v1.0.0: Production release

### Issue
- Mỗi feature cần issue trước khi code, kèm milestone/assignee.

### Bảo vệ branch
- `main`: PR + code review + CI pass.  
- `develop`: CI pass.

### Release
- Khi milestone xong: `develop → release/vX.X.X` → test → `release → main` → tag `vX.X.X`.

### Workflow mẫu
1. Tạo issue `#45 Build swipe API` (Milestone v0.2.0).  
2. Checkout: `git checkout develop` → `git checkout -b feature/swipe-api`.  
3. Commit: `feat(swipe): implement swipe API`.  
4. Push: `git push origin feature/swipe-api`.  
5. Tạo PR từ feature vào develop.

## Chức năng chính

### Đối với Người dùng
- **Đăng ký & Hồ sơ**: Tạo tài khoản và quản lý thông tin cá nhân.
- **Ghép đôi (Swipe)**: Hệ thống gợi ý và ghép đôi người dùng linh hoạt.
- **Chat thời gian thực**: Nhắn tin tức thì qua WebSocket.
- **Cuộc gọi Video/Audio**: Gọi điện bảo mật tích hợp WebRTC.
- **Phát hiện lừa đảo**: Bảo vệ người dùng bằng AI, cảnh báo hành vi nghi vấn.

### Đối với Quản trị viên (Admin)
- **Quản lý người dùng**: Theo dõi và quản lý tài khoản người dùng hệ thống.
- **Báo cáo lừa đảo**: Xem xét và xử lý các báo cáo từ mô hình ML.
- **Giám sát hệ thống**: Theo dõi trạng thái server và lưu lượng cuộc gọi.

## Danh sách API Endpoints

### Xác thực & Người dùng
- `POST /api/users`: Đăng ký tài khoản mới.
- `POST /api/auth/login`: (Dự kiến) Đăng nhập hệ thống.
- `GET /api/users/{id}`: (Dự kiến) Lấy thông tin chi tiết hồ sơ.

### Ghép đôi & Real-time
- `GET /api/swipe/recommendations`: (Dự kiến) Lấy danh sách gợi ý ghép đôi.
- `POST /api/swipe/action`: (Dự kiến) Thả tim hoặc Bỏ qua hồ sơ.
- `GET /health`: Kiểm tra trạng thái hệ thống (MongoDB, Redis, API).

## Folder structure
```
repo
├── .github
├── k8s
├── backend
│   ├── web
│   ├── infrash
│   ├── domain
│   └── application
├── frontend
│   ├── mobile
│   └── web
├── ai
├── docs
└── README.md
```
