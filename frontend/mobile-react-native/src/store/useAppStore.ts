import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>()((set: any) => ({
  theme: 'light',
  setTheme: (theme: 'light' | 'dark') => set({ theme }),
}));
