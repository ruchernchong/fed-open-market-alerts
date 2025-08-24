import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  getUserPreferences,
  resetUserPreferences,
  setUserPreferences,
} from "@/services/storage";
import type { UserPreferences } from "@/types/preferences";
import { DEFAULT_PREFERENCES, PREFERENCE_LABELS } from "@/types/preferences";

interface SettingsViewProps {
  onBack: () => void;
}

export const SettingsView = ({ onBack }: SettingsViewProps) => {
  const queryClient = useQueryClient();

  const notificationsEnabledId = useId();
  const immediateNotificationsId = useId();
  const dailySummaryId = useId();

  const { data: preferences = DEFAULT_PREFERENCES } = useQuery({
    queryKey: ["user-preferences"],
    queryFn: getUserPreferences,
    enabled: typeof chrome !== "undefined" && !!chrome.storage,
  });

  const updatePreference = async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    await setUserPreferences(newPreferences);
    queryClient.setQueryData(["user-preferences"], newPreferences);
  };

  const handleReset = async () => {
    await resetUserPreferences();
    queryClient.setQueryData(["user-preferences"], DEFAULT_PREFERENCES);
  };

  return (
    <div className="w-80 bg-white">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-white transition-colors hover:text-slate-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-white">Settings</h1>
        </div>
      </div>

      <div className="space-y-6 p-4">
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            Notifications
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor={notificationsEnabledId}
                className="text-sm font-medium text-slate-700"
              >
                {PREFERENCE_LABELS.notificationsEnabled}
              </label>
              <Switch
                id={notificationsEnabledId}
                checked={preferences.notificationsEnabled}
                onCheckedChange={(checked) =>
                  updatePreference({ notificationsEnabled: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label
                    htmlFor={immediateNotificationsId}
                    className="text-sm text-slate-700"
                  >
                    {PREFERENCE_LABELS.immediateNotifications}
                  </label>
                  <p className="text-xs text-slate-500">
                    Get notified immediately when new Fed data is available
                  </p>
                </div>
                <Switch
                  id={immediateNotificationsId}
                  checked={preferences.immediateNotifications}
                  disabled={!preferences.notificationsEnabled}
                  onCheckedChange={(checked) =>
                    updatePreference({ immediateNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label
                    htmlFor={dailySummaryId}
                    className="text-sm text-slate-700"
                  >
                    {PREFERENCE_LABELS.dailySummary}
                  </label>
                  <p className="text-xs text-slate-500">
                    Receive a daily summary of Fed operations
                  </p>
                </div>
                <Switch
                  id={dailySummaryId}
                  checked={preferences.dailySummary}
                  disabled={!preferences.notificationsEnabled}
                  onCheckedChange={(checked) =>
                    updatePreference({ dailySummary: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-slate-500 hover:text-slate-700"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset to defaults
          </Button>
        </div>
      </div>
    </div>
  );
};
