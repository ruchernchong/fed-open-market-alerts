import { useQuery } from "@tanstack/react-query";
import { getRecentReverseRepoTrend } from "@/services/reverse-repo.ts";
import { ReverseRepoTrendCharts } from "./reverse-repo-trend-charts.tsx";
import { DataTable } from "./reverse-repo/data-table";
import { columns } from "./reverse-repo/columns";
import { TrendingUp, Table2, Building2 } from "lucide-react";

export const ReverseRepoTrend = () => {
  const {
    data: operations,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["reverse-repo-trend"],
    queryFn: getRecentReverseRepoTrend,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></div>
          <span className="font-medium">
            Loading reverse repo trend data...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-red-700">
          <div className="size-5 rounded-full bg-red-500"></div>
          <span className="font-semibold">Error: {error.message}</span>
        </div>
      </div>
    );
  }

  if (!operations || operations.length === 0) {
    return (
      <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-amber-700">
          <Building2 className="size-5" />
          <span className="font-medium">No reverse repo operations found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-lg transition-all hover:shadow-xl">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/10 p-2">
            <TrendingUp className="size-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Recent Reverse Repo Operations Trend
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <ReverseRepoTrendCharts operations={operations} />

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <Table2 className="size-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-800">
                Detailed Operations
              </h3>
            </div>
          </div>
          <div className="p-6">
            <DataTable columns={columns} data={operations} />
          </div>
        </div>
      </div>
    </div>
  );
};
