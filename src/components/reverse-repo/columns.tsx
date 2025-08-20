"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Operation } from "@/types/reverse-repo";

export const columns: ColumnDef<Operation>[] = [
  {
    accessorKey: "operationDate",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("operationDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "term",
    header: "Term",
  },
  {
    accessorKey: "totalAmtAccepted",
    header: "Amount Accepted",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmtAccepted") as number;
      return `$${amount.toLocaleString()}`;
    },
  },
  {
    accessorFn: (row) => row.details[0]?.percentAwardRate,
    header: "Award Rate",
    cell: ({ row }) => {
      const rate = row.original.details[0]?.percentAwardRate;
      return rate ? `${rate.toFixed(2)}%` : "N/A";
    },
  },
  {
    accessorKey: "participatingCpty",
    header: "Counterparties",
    cell: ({ row }) => {
      const operation = row.original;
      return (
        <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex w-full max-w-24 flex-col gap-2">
                  <Progress
                    value={
                      (operation.acceptedCpty / operation.participatingCpty) *
                      100
                    }
                  />
                  <div className="text-muted-foreground text-center text-xs">
                    {Math.round(
                      (operation.acceptedCpty / operation.participatingCpty) *
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
      );
    },
  },
  {
    accessorKey: "totalAmtAccepted",
    header: "Change",
    cell: ({ row, table }) => {
      const currentAmount = row.getValue("totalAmtAccepted") as number;
      const rowIndex = row.index;
      const nextRow = table.getRowModel().rows[rowIndex + 1];

      if (!nextRow) return null;

      const previousAmount = nextRow.getValue("totalAmtAccepted") as number;

      if (currentAmount > previousAmount) {
        return <span className="text-green-600">↑</span>;
      } else if (currentAmount < previousAmount) {
        return <span className="text-red-600">↓</span>;
      }
      return <span className="text-gray-400">→</span>;
    },
  },
];
