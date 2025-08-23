import { showFedDataNotification } from "./services/notifications.ts";
import { getLatestReverseRepo } from "./services/reverse-repo.ts";
import { ALARM_NAMES, scheduleNextFedDataCheck } from "./services/scheduler.ts";
import {
  getLastUpdatedTimestamp,
  setLastUpdatedTimestamp,
} from "./services/storage.ts";

const checkFedData = async () => {
  console.log("Checking Fed API for new data...");

  try {
    const currentOperation = await getLatestReverseRepo();

    if (!currentOperation) {
      console.error("No Fed data available");
      return;
    }

    const storedTimestamp = await getLastUpdatedTimestamp();

    console.log("Current lastUpdated:", currentOperation.lastUpdated);
    console.log("Stored lastUpdated:", storedTimestamp);

    if (storedTimestamp !== currentOperation.lastUpdated) {
      console.log("New Fed data detected! Showing notification...");

      await showFedDataNotification(currentOperation);
      await setLastUpdatedTimestamp(currentOperation.lastUpdated);

      console.log("Notification sent and timestamp updated");
    } else {
      console.log("No new Fed data found");
    }
  } catch (error) {
    console.error("Error checking Fed data:", error);
  }
};

chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started - scheduling Fed data checks");
  scheduleNextFedDataCheck();
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed - scheduling Fed data checks");
  scheduleNextFedDataCheck();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAMES.FED_DATA_CHECK) {
    console.log("Fed data check alarm fired");
    await checkFedData();
    scheduleNextFedDataCheck();
  }
});

chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
  if (message.action === "checkFedDataNow") {
    console.log("Manual Fed data check triggered");
    await checkFedData();
    sendResponse({ success: true });
  }
});

console.log("Background script loaded");
