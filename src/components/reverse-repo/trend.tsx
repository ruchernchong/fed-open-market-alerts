import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Building2, Table2, TrendingUp } from "lucide-react";
import { Loader } from "@/components/common/loader";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { getRecentReverseRepoTrend } from "@/services/reverse-repo.ts";
import { Charts } from "./charts";
import { columns } from "./columns";

export const Trend = () => {
  const {
    data,
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

  if (!data || data.length === 0) {
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
        <Charts operations={data} />

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
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
