# Matchmaking & Scam Detection System

## Build & Server Status

- Backend API build: passing.
- Realtime + WebRTC server: online, handling WebSocket and call traffic.

## Table of Contents

- [Overview](#overview)
- [Team & Roles](#team--roles)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Repository Rules](#repository-rules)
  - [Branch strategy](#branch-strategy)
  - [Commit convention](#commit-convention)
  - [Pull Request](#pull-request)
  - [Milestones](#milestones)
  - [Issues](#issues)
  - [Branch protection](#branch-protection)
  - [Release process](#release-process)
  - [Sample workflow](#sample-workflow)
- [Folder structure](#folder-structure)

## Overview

Building a matchmaking platform augmented with machine-learning-powered scam detection. The stack ties React/React Native frontends to an ASP.NET Core 8 API, WebSocket real-time layer, AI services (FastAPI + XGBoost + Sentence Transformers), and a call system that leverages WebRTC, STUN, and Coturn TURN servers.

## Team & Roles

| Student ID  | Full Name            | Email                          | Role             |
| ----------- | -------------------- | ------------------------------ | ---------------- |
| 28209051610 | Chu Phương Anh       | chuphuonganh21082004@gmail.com | Frontend         |
| 28211153072 | Phan Công Danh       | cdanh1324@gmail.com            | Backend          |
| 28211152835 | Trần Huy             | tranhuy142004@gmail.com        | Backend / Leader |
| 28211152784 | Phùng Định Quang Huy | huyphung00@gmail.com           | Machine Learning |
| 28211152835 | Trần Văn Huy         | tranvanhuy160304@gmail.com     | System / DevOps  |

## Tech Stack

- Frontend: ReactJS + React Native, TypeScript, TailwindCSS, WebSocket real-time communication.
- Backend: ASP.NET Core 8, FluentValidation, JWT Authentication, WebSocket Server.
- Database: MongoDB.
- Cache: Redis.
- AI/ML: Python + FastAPI, XGBoost, Sentence Transformers.
- Call System: WebRTC + STUN + Coturn (TURN).
- DevOps: Docker, Nginx, Vercel (frontend hosting), VPS deployment (API + call servers).

## Architecture

Client (Web / Mobile) → Frontend (React / React Native) → Backend API (ASP.NET Core)
↓ MongoDB · Redis · AI (FastAPI + XGBoost + Sentence Transformers)
Realtime layer: WebSocket (api + call)
Call system: WebRTC plus STUN/TURN via Coturn.

## Repository Rules

### Branch strategy

- GitFlow: `main` (production, no direct commits), `develop`, `feature/*`, `release/*`, `hotfix/*`.
- Example branches: `feature/authentication`, `release/v0.1.0`.

### Commit convention

- Conventional Commit: `<type>(<scope>): <message>`.
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.
- Example: `feat(auth): implement user login API`.

### Pull Request

- Open PR from a feature branch into `develop`, describe changes, include checklist (build, review, conflict).
- Suggested template: Description / Related Issue / Changes / Checklist.

### Milestones

- v0.1.0: User authentication + profile
- v0.2.0: Swipe system
- v0.3.0: Recommendation engine
- v0.4.0: Scam detection ML
- v1.0.0: Production release

### Issues

- Every feature ships with an issue before implementation; assign milestone and owner.

### Branch protection

- `main`: requires PR, code review, CI pass.
- `develop`: requires CI pass.

### Release process

- After milestone completion: `develop → release/vX.X.X` → test → merge `release → main` → tag `vX.X.X`.

### Sample workflow

1. Create issue `#45 Build swipe API` (milestone v0.2.0).
2. Branch: `git checkout develop` → `git checkout -b feature/swipe-api`.
3. Commit: `feat(swipe): implement swipe API`.
4. Push: `git push origin feature/swipe-api`.
5. Open PR `feature/swipe-api → develop`.

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
