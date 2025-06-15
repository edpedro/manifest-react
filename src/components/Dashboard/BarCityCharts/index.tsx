"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useDashboard } from "../../../contexts/hooks/Dashboard";

export const description = "A bar chart";

const chartConfig = {
  desktop: {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function BarCityCharts() {
  const { dashboardData } = useDashboard();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos - Cidades</CardTitle>
        <CardDescription>
          Pedidos realizados em diferentes localidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dashboardData?.top10InvoiceCityTotal}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
