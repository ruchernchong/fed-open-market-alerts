import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Operation } from "@/types/reverse-repo.ts";

interface ChartsProps {
  operations: Operation[];
}

const chartConfig = {
  amountAccepted: {
    label: "Amount",
    color: "var(--chart-1)",
  },
  awardRate: {
    label: "Rate",
    color: "var(--chart-2)",
  },
  counterparties: {
    label: "Counterparties",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export const Charts = ({ operations }: ChartsProps) => {
  const chartData = operations
    .slice()
    .reverse()
    .map((operation) => ({
      date: new Date(operation.operationDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amountAccepted: operation.totalAmtAccepted / 1000000000,
      awardRate: operation.details[0]?.percentAwardRate ?? 0,
      counterparties: operation.acceptedCpty,
    }));

  const formatCurrency = (value: number) => `$${value.toFixed(1)}B`;
  const formatRate = (value: number) => `${value.toFixed(2)}%`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Amount Accepted Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
              />
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
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/*<Card>*/}
      {/*  <CardHeader>*/}
      {/*    <CardTitle>Award Rate Trend</CardTitle>*/}
      {/*  </CardHeader>*/}
      {/*  <CardContent>*/}
      {/*    <ChartContainer config={chartConfig} className="h-[300px] w-full">*/}
      {/*      <LineChart accessibilityLayer data={chartData}>*/}
      {/*        <CartesianGrid strokeDasharray="3 3" />*/}
      {/*        <XAxis dataKey="date" tickLine={false} axisLine={false} />*/}
      {/*        <YAxis*/}
      {/*          tickLine={false}*/}
      {/*          axisLine={false}*/}
      {/*          tickFormatter={formatRate}*/}
      {/*        />*/}
      {/*        <ChartTooltip*/}
      {/*          content={*/}
      {/*            <ChartTooltipContent*/}
      {/*              formatter={(value: number) => [*/}
      {/*                formatRate(value),*/}
      {/*                "Award Rate",*/}
      {/*              ]}*/}
      {/*            />*/}
      {/*          }*/}
      {/*        />*/}
      {/*        <Line*/}
      {/*          type="monotone"*/}
      {/*          dataKey="awardRate"*/}
      {/*          stroke="var(--color-awardRate)"*/}
      {/*          strokeWidth={2}*/}
      {/*        />*/}
      {/*      </LineChart>*/}
      {/*    </ChartContainer>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}

      <Card>
        <CardHeader>
          <CardTitle>Amount vs Award Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ComposedChart accessibilityLayer data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickFormatter={formatRate}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                yAxisId="left"
                dataKey="amountAccepted"
                fill="var(--color-amountAccepted)"
                opacity={0.6}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="awardRate"
                stroke="var(--color-awardRate)"
                strokeWidth={2}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
