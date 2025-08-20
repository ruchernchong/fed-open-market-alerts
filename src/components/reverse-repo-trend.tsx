import { useQuery } from "@tanstack/react-query";
import { getRecentReverseRepoTrend } from "@/services/reverse-repo.ts";
import { ReverseRepoTrendCharts } from "./reverse-repo-trend-charts.tsx";
import { DataTable } from "./reverse-repo/data-table";
import { columns } from "./reverse-repo/columns";

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

  return (
    <div className="flex flex-col gap-y-6 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Recent Reverse Repo Operations Trend
      </h2>

      <ReverseRepoTrendCharts operations={operations} />

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Detailed Operations</h3>
        <DataTable columns={columns} data={operations} />
      </div>
    </div>
  );
};
