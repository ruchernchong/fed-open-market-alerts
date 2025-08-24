const STORAGE_KEYS = {
  LAST_UPDATED_TIMESTAMP: "last_updated_timestamp",
  HAS_UNREAD_NOTIFICATION: "has_unread_notification",
} as const;

export const getLastUpdatedTimestamp = async (): Promise<string | null> => {
  const result = await chrome.storage.local.get([
    STORAGE_KEYS.LAST_UPDATED_TIMESTAMP,
  ]);
  return result[STORAGE_KEYS.LAST_UPDATED_TIMESTAMP] ?? null;
};

export const setLastUpdatedTimestamp = async (
  timestamp: string,
): Promise<void> => {
  await chrome.storage.local.set({
    [STORAGE_KEYS.LAST_UPDATED_TIMESTAMP]: timestamp,
  });
};

export const getHasUnreadNotification = async (): Promise<boolean> => {
  const result = await chrome.storage.local.get([
    STORAGE_KEYS.HAS_UNREAD_NOTIFICATION,
  ]);
  return result[STORAGE_KEYS.HAS_UNREAD_NOTIFICATION] ?? false;
};

export const setHasUnreadNotification = async (
  hasUnread: boolean,
): Promise<void> => {
  await chrome.storage.local.set({
    [STORAGE_KEYS.HAS_UNREAD_NOTIFICATION]: hasUnread,
  });
};
