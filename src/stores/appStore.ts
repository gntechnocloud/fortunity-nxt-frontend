import { create } from 'zustand';
import { storage, STORAGE_KEYS } from '@/utils';
import type { Theme, AppSettings } from '@/types';

interface AppStore {
  theme: Theme;
  settings: AppSettings;
  sidebarOpen: boolean;
  notifications: any[];
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  notifications: true,
  autoRefresh: true,
  refreshInterval: 30000,
};

export const useAppStore = create<AppStore>((set, get) => ({
  theme: storage.get<Theme>(STORAGE_KEYS.theme()) || 'dark',
  settings: (() => {
    const stored = storage.get(STORAGE_KEYS.settings());
    if (
      stored &&
      typeof stored === 'object' &&
      'notifications' in stored &&
      'autoRefresh' in stored &&
      'refreshInterval' in stored &&
      'theme' in stored
    ) {
      return stored as AppSettings;
    }
    // If theme is missing in stored, merge with default
    if (
      stored &&
      typeof stored === 'object' &&
      'notifications' in stored &&
      'autoRefresh' in stored &&
      'refreshInterval' in stored
    ) {
      return {
        ...defaultSettings,
        ...stored,
        notifications: Boolean((stored as any).notifications),
        autoRefresh: Boolean((stored as any).autoRefresh),
        refreshInterval: Number((stored as any).refreshInterval),
        theme: (stored as any).theme as Theme,
      };
    }
    return defaultSettings;
  })(),
  sidebarOpen: false,
  notifications: [],

  setTheme: (theme: Theme) => {
    set({ theme });
    storage.set(STORAGE_KEYS.theme(), theme);

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  },

  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },

  updateSettings: (newSettings: Partial<AppSettings>) => {
    const settings = { ...get().settings, ...newSettings };
    set({ settings });
    storage.set(STORAGE_KEYS.settings(), settings);
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  addNotification: (notification: any) => {
    const notifications = [...get().notifications, { ...notification, id: Date.now().toString() }];
    set({ notifications });
  },

  removeNotification: (id: string) => {
    const notifications = get().notifications.filter(n => n.id !== id);
    set({ notifications });
  },

  clearNotifications: () => {
    set({ notifications: [] });
  }
}));