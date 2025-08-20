import { useQuery } from "@tanstack/react-query";
import { getRecentReverseRepoTrend } from "@/services/reverse-repo.ts";
import { ReverseRepoTrendCharts } from "./reverse-repo-trend-charts.tsx";
import { DataTable } from "./reverse-repo/data-table";
import { columns } from "./reverse-repo/columns";
import { TrendingUp, Table2, Building2, AlertCircle } from "lucide-react";
import { Loader } from "@/components/loader";
import { Alert, AlertTitle } from "@/components/ui/alert";

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
    return <Loader message="Loading reverse repo trend data..." />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Error: {error.message}</AlertTitle>
      </Alert>
    );
  }

  if (!operations || operations.length === 0) {
    return (
      <Alert>
        <Building2 />
        <AlertTitle>No reverse repo operations found</AlertTitle>
      </Alert>
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
