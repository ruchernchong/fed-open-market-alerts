import { useQuery } from "@tanstack/react-query";
import { getLatestReverseRepo } from "@/services/reverse-repo.ts";
import {
  Calendar,
  DollarSign,
  Percent,
  Building2,
  Clock,
  Settings,
  Users,
  CheckCircle2,
} from "lucide-react";
import { MetricCard } from "@/components/metric-card";

export const LatestReverseRepo = () => {
  const {
    data: operation,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["latest-reverse-repo"],
    queryFn: getLatestReverseRepo,
  });

  if (loading)
    return (
      <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></div>
          <span className="font-medium">
            Loading latest reverse repo operation...
          </span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-red-700">
          <div className="size-5 rounded-full bg-red-500"></div>
          <span className="font-semibold">Error: {error.message}</span>
        </div>
      </div>
    );
  if (!operation)
    return (
      <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-amber-700">
          <Building2 className="size-5" />
          <span className="font-medium">No reverse repo operations found</span>
        </div>
      </div>
    );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-lg transition-all hover:shadow-xl">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/10 p-2">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Latest Reverse Repo Operation
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              Operation Date
            </div>
            <div className="font-semibold text-slate-900">
              {new Date(operation.operationDate).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              Maturity Date
            </div>
            <div className="font-semibold text-slate-900">
              {new Date(operation.maturityDate).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Clock className="h-4 w-4" />
              Term
            </div>
            <div className="font-semibold text-slate-900">{operation.term}</div>
          </div>

          <div className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Settings className="h-4 w-4" />
              Method
            </div>
            <div className="font-semibold text-slate-900">
              {operation.operationMethod}
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            title="Total Submitted"
            value={formatCurrency(operation.totalAmtSubmitted)}
            icon={DollarSign}
          />
          <MetricCard
            title="Total Accepted"
            value={formatCurrency(operation.totalAmtAccepted)}
            icon={CheckCircle2}
          />
          <MetricCard
            title="Award Rate"
            value={`${operation.details[0]?.percentAwardRate.toFixed(2)}%`}
            icon={Percent}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-600">
              <Users className="h-4 w-4" />
              Counterparties
            </div>
            <div className="text-lg font-semibold text-slate-900">
              <span className="text-slate-700">
                {operation.participatingCpty}
              </span>
              <span className="mx-2 text-slate-400">•</span>
              <span className="text-green-600">
                {operation.acceptedCpty} awarded
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-600">
              <Settings className="h-4 w-4" />
              Settlement Type
            </div>
            <div className="text-lg font-semibold text-slate-900">
              {operation.settlementType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
