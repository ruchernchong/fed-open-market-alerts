export interface UserPreferences {
  immediateNotifications: boolean;
  dailySummary: boolean;
  notificationsEnabled: boolean;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  immediateNotifications: true,
  dailySummary: false,
  notificationsEnabled: true,
};

export const PREFERENCE_LABELS = {
  immediateNotifications: "Immediate notifications",
  dailySummary: "Daily summary",
  notificationsEnabled: "Enable all notifications",
} as const;
