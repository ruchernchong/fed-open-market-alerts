import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loaderVariants = cva(
  "flex items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-slate-300 border-t-slate-600",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  message?: string;
}

const Loader = ({
  className,
  size,
  message = "Loading...",
  ...props
}: LoaderProps) => {
  return (
    <div className={cn(loaderVariants({ size, className }))} {...props}>
      <div className="flex items-center gap-3 text-slate-600">
        <div className={cn(spinnerVariants({ size }))} />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export { Loader, loaderVariants };
