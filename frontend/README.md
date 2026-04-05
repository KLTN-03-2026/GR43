# Frontend Workspace Structure

## Overview
- `admin-react/`: web admin app (Vite + React).
- `mobile-react-native/`: mobile app (Expo + Expo Router).

## Mobile App Conventions (`mobile-react-native`)

### Routing layer
- `app/` only contains route entry files (`index.tsx`, `signup.tsx`, etc).
- Route files should be thin wrappers that export feature screens.

### Feature layer
- `features/onboarding/`
  - `components/` (onboarding-specific reusable UI)
  - `screens/OnboardingScreen.tsx`
- `features/signup/`
  - `screens/SignUpScreen.tsx`
  - `components/ActionButton.tsx`
  - `components/SocialButton.tsx`

### Shared UI/logic
- `components/`: reusable app-wide generic components (shared, non-feature specific).
- `constants/`: shared static data (`onboarding-images.ts`, `onboarding-copy.ts`).
- `hooks/`: app-wide hooks.

## Why this layout
- Keeps Expo Router files simple and stable.
- Groups business logic by feature for easier scaling.
- Reduces coupling between route paths and UI implementation.
- Makes onboarding/sign-up flow easier to modify independently.
