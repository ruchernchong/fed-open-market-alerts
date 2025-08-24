import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Building2, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { Loader } from "@/components/loader";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
  getLatestReverseRepo,
  getRecentReverseRepoTrend,
} from "@/services/reverse-repo.ts";
import { setHasUnreadNotification } from "@/services/storage.ts";

export const Popup = () => {
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      setHasUnreadNotification(false);
    }
  }, []);

  const {
    data: operation,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["latest-reverse-repo"],
    queryFn: getLatestReverseRepo,
  });

  const { data: trendData } = useQuery({
    queryKey: ["reverse-repo-trend"],
    queryFn: getRecentReverseRepoTrend,
  });

  const handleMoreDetails = () => {
    const webAppUrl = "/";
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.create({
        url: webAppUrl,
      });
    } else {
      window.open(webAppUrl, "_blank");
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      notation: "compact",
      compactDisplay: "short",
    }).format(amount);

  const chartConfig = {
    amountAccepted: {
      label: "Amount",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const chartData =
    trendData
      ?.slice(0, 7)
      .reverse()
      .map((operation) => ({
        date: new Date(operation.operationDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amountAccepted: operation.totalAmtAccepted / 1000000000,
        formattedAmount: formatCurrency(operation.totalAmtAccepted),
      })) || [];

  if (loading) {
    return <Loader message="Loading latest operation..." />;
  }

  if (error)
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Error: {error.message}</AlertTitle>
      </Alert>
    );

  if (!operation)
    return (
      <Alert>
        <Building2 />
        <AlertTitle>No operations found</AlertTitle>
      </Alert>
    );

  return (
    <div className="w-80 bg-white">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-white" />
          <h1 className="text-lg font-bold text-white">
            Fed Open Market Alerts
          </h1>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Date</span>
            <span className="font-semibold">
              {new Date(operation.operationDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">Amount</span>
            <span className="font-semibold text-green-600">
              {formatCurrency(operation.totalAmtAccepted)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">Rate</span>
            <span className="font-semibold text-blue-600">
              {operation.details[0]?.percentAwardRate.toFixed(2)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">Last Updated</span>
            <span className="font-semibold text-slate-500">
              {new Date(operation.lastUpdated).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <Separator />

        {chartData.length > 0 && (
          <>
            <div className="mb-2 text-xs font-medium text-slate-600">
              7-Day Trend
            </div>
            <ChartContainer config={chartConfig} className="h-32 w-full">
              <LineChart accessibilityLayer data={chartData}>
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis hide />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      nameKey="amountAccepted"
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="amountAccepted"
                  stroke="var(--color-amountAccepted)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </>
        )}

        <button
          type="button"
          onClick={handleMoreDetails}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700"
        >
          <span>More Details</span>
          <ExternalLink className="size-4" />
        </button>
      </div>
    </div>
  );
};
