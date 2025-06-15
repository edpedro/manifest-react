"use client";

import { CartesianGrid, LabelList, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import { useDashboard } from "../../../contexts/hooks/Dashboard";

export const description = "A line chart with a custom label";

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function LineHighLowCharts() {
  const { dashboardData } = useDashboard();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Picos - Horas Expedição</CardTitle>
        <CardDescription>Volume de coleta entre 08h e 17h</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-hidden">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={dashboardData?.timeShippinng}
            margin={{
              top: 30,
              left: 30,
              right: 30,
              bottom: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="total"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="total"
              type="natural"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-total)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="hora"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
