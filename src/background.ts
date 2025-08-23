import type { Operation } from "./types/reverse-repo.ts";

const FED_MARKETS_API_BASE =
  "https://markets.newyorkfed.org/api/rp/reverserepo/all/results";

interface FedMarketsResponse {
  repo: {
    operations: Operation[];
  };
}

// Storage keys
const STORAGE_KEYS = {
  LAST_UPDATED_TIMESTAMP: "last_updated_timestamp",
} as const;

// Alarm names
const ALARM_NAMES = {
  FED_DATA_CHECK: "fedDataCheck",
} as const;

const getLatestReverseRepo = async () => {
  try {
    const response = await fetch(`${FED_MARKETS_API_BASE}/lastTwoWeeks.json`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Fed Markets data: ${response.statusText}`,
      );
    }

    const data: FedMarketsResponse = await response.json();
    const reverseRepoOps = data.repo.operations;

    return reverseRepoOps[0] ?? null;
  } catch (error) {
    console.error("Error fetching latest reverse repo operation:", error);
    return null;
  }
};

const getStoredTimestamp = async () => {
  const result = await chrome.storage.local.get([
    STORAGE_KEYS.LAST_UPDATED_TIMESTAMP,
  ]);
  return result[STORAGE_KEYS.LAST_UPDATED_TIMESTAMP] || null;
};

const setStoredTimestamp = async (timestamp: string) => {
  await chrome.storage.local.set({
    [STORAGE_KEYS.LAST_UPDATED_TIMESTAMP]: timestamp,
  });
};

const showNotification = async (operation: Operation) => {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(operation.totalAmtAccepted);

  await chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("vite.png"),
    title: "New Fed Reverse Repo Data",
    message: `${amount} accepted on ${new Date(
      operation.operationDate,
    ).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })}`,
    contextMessage: `Updated: ${new Date(
      operation.lastUpdated,
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    })}`,
  });
};

const scheduleNextCheck = async () => {
  const now = new Date();
  const targetTime = new Date();

  // Set to 1:20 PM EST (13:20)
  // Note: This sets time in user's local timezone, but we want EST
  // We'll handle EST conversion properly
  targetTime.setHours(13, 20, 0, 0);

  // Convert from EST to user's local timezone
  // EST is UTC-5 (Standard Time) or UTC-4 (Daylight Time)
  const estOffset = -5 * 60; // EST is UTC-5 in minutes
  const userOffset = now.getTimezoneOffset(); // User's offset from UTC in minutes
  const offsetDiff = estOffset - userOffset; // Difference in minutes

  targetTime.setMinutes(targetTime.getMinutes() + offsetDiff);

  // If target time already passed today, schedule for tomorrow
  if (targetTime <= now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  // Ensure the target date is a weekday (Monday-Friday)
  // getDay() returns 0=Sunday, 1=Monday, ..., 6=Saturday
  while (targetTime.getDay() === 0 || targetTime.getDay() === 6) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  console.log(
    "Scheduling next Fed data check for:",
    targetTime.toLocaleString(),
  );

  await chrome.alarms.create(ALARM_NAMES.FED_DATA_CHECK, {
    when: targetTime.getTime(),
  });
};

const checkFedData = async () => {
  console.log("Checking Fed API for new data...");

  try {
    const currentOperation = await getLatestReverseRepo();

    if (!currentOperation) {
      console.error("No Fed data available");
      return;
    }

    const storedTimestamp = await getStoredTimestamp();

    console.log("Current lastUpdated:", currentOperation.lastUpdated);
    console.log("Stored lastUpdated:", storedTimestamp);

    // Check if this is new data
    if (storedTimestamp !== currentOperation.lastUpdated) {
      console.log("New Fed data detected! Showing notification...");

      // Show notification
      await showNotification(currentOperation);

      // Update stored timestamp
      await setStoredTimestamp(currentOperation.lastUpdated);

      console.log("Notification sent and timestamp updated");
    } else {
      console.log("No new Fed data found");
    }
  } catch (error) {
    console.error("Error checking Fed data:", error);
  }
};

// Extension startup
chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started - scheduling Fed data checks");
  scheduleNextCheck();
});

// Extension installation
chrome.runtime.onInstalled.addListener(async () => {
  console.log("Extension installed - scheduling Fed data checks");
  scheduleNextCheck();
});

// Alarm handler
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAMES.FED_DATA_CHECK) {
    console.log("Fed data check alarm fired");
    await checkFedData();

    // Schedule next day's check
    scheduleNextCheck();
  }
});

// Optional: Manual trigger for testing
chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
  if (message.action === "checkFedDataNow") {
    console.log("Manual Fed data check triggered");
    await checkFedData();
    sendResponse({ success: true });
  }
});

console.log("Background script loaded");
