# Hệ Thống Ghép Đôi & Phát Hiện Lừa Đảo / Matchmaking & Scam Detection

Build status: backend API pipelines + server health overview.

## Build Status
![Backend API build](https://img.shields.io/badge/backend%20build-passing-brightgreen?style=for-the-badge)
![Realtime server status](https://img.shields.io/badge/server-online-brightgreen?style=for-the-badge)

## Bản dịch ngôn ngữ / Language editions
- Vietnamese (ghi chú chi tiết + vai trò + stack): [`README_vi.md`](README_vi.md)
- English (full overview + stack + process): [`README_en.md`](README_en.md)

## Quick summary
- Frontend: ReactJS + React Native + Tailwind + WebSocket
- Backend: ASP.NET Core 8 + WebSocket server + MongoDB + Redis + JWT
- AI: Python + FastAPI + XGBoost + Sentence Transformers
- Call system: WebRTC + STUN + Coturn, deployed via Docker / Nginx on VPS / Vercel

## Team roles spotlight
- Frontend: Chu Phương Anh (UI/UX, React web/mobile)
- Backend: Phan Công Danh & Trần Huy (ASP.NET Core APIs + WebSocket)
- Machine Learning: Phùng Đinh Quang Huy (XGBoost + embeddings)
- System / DevOps: Trần Văn Huy (Docker, Nginx, VPS + Vercel)

## Info to add
- Expand each language README with Getting Started steps, env examples, ports, and run scripts for web/mobile/backend/AI.
- Document API base URLs, WebSocket paths, FastAPI inference routes, TURN hosts, and service monitoring dashboards for quick reference.
- Outline deployment flow: Docker compose commands, Nginx config, VPS/Vercel steps, release checklist (env vars, migrations, smoke tests).
