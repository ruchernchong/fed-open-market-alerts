const STORAGE_KEYS = {
  LAST_UPDATED_TIMESTAMP: "last_updated_timestamp",
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
