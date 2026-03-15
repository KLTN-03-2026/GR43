# Hệ Thống Ghép Đôi & Phát Hiện Lừa Đảo / Matchmaking & Scam Detection

Build status: backend API pipelines + server health overview.
[![Backend CI/CD](https://github.com/hiamchubbybear/DATN2026-STT43/actions/workflows/backend-ci.yml/badge.svg?branch=main)](https://github.com/hiamchubbybear/DATN2026-STT43/actions/workflows/backend-ci.yml)
![Realtime server status](https://img.shields.io/badge/server-online-brightgreen?style=for-the-badge)

## Bản dịch ngôn ngữ / Language editions

- Vietnamese (ghi chú chi tiết + vai trò của từng thành viên + stack)[`README_vi.md`](README_vi.md)
- English (full overview + stack + process): [`README_en.md`](README_en.md)

## API và trạng thái server / API & Server Status

- **Đường dẫn API**: `https://datn.chessy.dev`
- **Tài liệu API**: Các endpoint API chi tiết [API_PLAN.md](API_PLAN.md)

## Sắp ra mắt / Coming Soon

- **Admin Dashboard**: Giao diện quản lý toàn diện cho người điều hành hệ thống.
- **Server Health Dashboard**: Hiển thị trạng thái của server và các thông tin liên quan.
- **Mobile Application**: Phiên bản ứng dụng di động cho iOS và Android.

## Quick summary

- Frontend: ReactJS + React Native + Tailwind + WebSocket
- Backend: ASP.NET Core 8 + WebSocket server + MongoDB + Redis + JWT
- AI: Python + FastAPI + XGBoost + Sentence Transformers
- Call system: WebRTC + STUN + Coturn, deployed via Docker / Nginx on VPS / Vercel

## Vai trò trong nhóm / Team roles spotlight

- Frontend: Chu Phương Anh (UI/UX, React web/mobile)
- Backend: Phan Công Danh & Trần Huy (ASP.NET Core APIs + WebSocket)
- Machine Learning: Phùng Đinh Quang Huy (XGBoost + embeddings)
- System / DevOps: Trần Văn Huy (Docker, Cloudflared Tunnel, VPS + Vercel)

## Thông tin thêm / Additional info

- Xây dựng thêm các hướng dẫn chi tiết cho mỗi ngôn ngữ README với các bước bắt đầu, ví dụ môi trường, cổng và các script chạy cho web/mobile/backend/AI.
- Tài liệu API base URLs, WebSocket paths, FastAPI inference routes, TURN hosts, và service monitoring dashboards để tham khảo nhanh chóng.
- Xác định quy trình triển khai: Docker compose commands, Nginx config, VPS/Vercel steps, release checklist (env vars, migrations, smoke tests).
