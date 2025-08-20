import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export const MetricCard = ({ title, value, icon: Icon }: MetricCardProps) => {
  return (
    <div className="rounded-xl border-0 bg-gradient-to-br from-slate-600 to-slate-700 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-200">
          <Icon className="size-4" />
          {title}
        </div>
        <div className="rounded-full bg-white/20 p-1">
          <Icon className="size-4" />
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};
