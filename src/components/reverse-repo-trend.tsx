import { useQuery } from "@tanstack/react-query";
import { getRecentReverseRepoTrend } from "@/services/reverse-repo.ts";
import { ReverseRepoTrendCharts } from "./reverse-repo-trend-charts.tsx";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ReverseRepoTrend = () => {
  const {
    data: operations,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["reverse-repo-trend"],
    queryFn: getRecentReverseRepoTrend,
  });

  if (loading)
    return <div className="p-4">Loading reverse repo trend data...</div>;
  if (error)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  if (!operations || operations.length === 0)
    return <div className="p-4">No reverse repo operations found</div>;

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getChangeIndicator = (current: number, previous: number) => {
    if (current > previous) {
      return <span className="text-green-600">↑</span>;
    } else if (current < previous) {
      return <span className="text-red-600">↓</span>;
    }
    return <span className="text-gray-400">→</span>;
  };

  return (
    <div className="flex flex-col gap-y-6 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Recent Reverse Repo Operations Trend
      </h2>

      <ReverseRepoTrendCharts operations={operations} />

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Detailed Operations</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-left text-sm font-medium">Date</th>
                <th className="p-3 text-left text-sm font-medium">Term</th>
                <th className="p-3 text-right text-sm font-medium">
                  Amount Accepted
                </th>
                <th className="p-3 text-right text-sm font-medium">
                  Award Rate
                </th>
                <th className="p-3 text-right text-sm font-medium">
                  Counterparties
                </th>
                <th className="p-3 text-right text-sm font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((operation, index) => {
                const previousOperation = operations[index + 1];
                return (
                  <tr
                    key={operation.operationId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 text-sm">
                      {formatDate(operation.operationDate)}
                    </td>
                    <td className="p-3 text-sm">{operation.term}</td>
                    <td className="p-3 text-right text-sm font-medium">
                      {formatCurrency(operation.totalAmtAccepted)}
                    </td>
                    <td className="p-3 text-right text-sm">
                      {operation.details[0]?.percentAwardRate.toFixed(2) ||
                        "N/A"}
                      %
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex w-full max-w-24 flex-col gap-2">
                                <Progress
                                  value={
                                    (operation.acceptedCpty /
                                      operation.participatingCpty) *
                                    100
                                  }
                                />
                                <div className="text-muted-foreground text-center text-xs">
                                  {Math.round(
                                    (operation.acceptedCpty /
                                      operation.participatingCpty) *
                                      100,
                                  )}
                                  %
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {operation.acceptedCpty} Accepted /{" "}
                                {operation.participatingCpty} Participating
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="p-3 text-right text-sm">
                      {previousOperation &&
                        getChangeIndicator(
                          operation.totalAmtAccepted,
                          previousOperation.totalAmtAccepted,
                        )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
