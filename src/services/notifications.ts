import type { Operation } from "../types/reverse-repo.ts";

const NOTIFICATION_CONFIG = {
  ICON: "icon-48.png",
  TITLE: "New Fed Reverse Repo Data",
} as const;

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatOperationDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatUpdateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

export const showFedDataNotification = async (
  operation: Operation,
): Promise<void> => {
  const amount = formatCurrency(operation.totalAmtAccepted);
  const operationDate = formatOperationDate(operation.operationDate);
  const updateTime = formatUpdateTime(operation.lastUpdated);

  await chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL(NOTIFICATION_CONFIG.ICON),
    title: NOTIFICATION_CONFIG.TITLE,
    message: `${amount} accepted on ${operationDate}`,
    contextMessage: `Updated: ${updateTime}`,
  });
};
