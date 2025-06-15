"use client";

import { LabelList, Pie, PieChart, Cell } from "recharts";

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

export const description = "A pie chart with a label list";

const chartConfig = {
  total: {
    label: "Total",
  },
  RODOVIÁRIO: {
    label: "Rodoviário",
    color: "var(--color-rodoviario)",
  },
  AÉREO: {
    label: "Aéreo",
    color: "var(--color-aereo)",
  },
} satisfies ChartConfig;

export function PieModalCharts() {
  const { dashboardData } = useDashboard();

  const getColorForCategory = (categoryName: string) => {
    return chartConfig[categoryName]?.color || "var(--color-rodoviario)";
  };

  // Arredondando valores do total
  const pieData =
    dashboardData?.modalTotal?.map((item) => ({
      ...item,
      total: Math.round(item.total), // arredondar
    })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modal - FIXA</CardTitle>
        <CardDescription>Faturamento por modal</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[170px] overflow-hidden">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[170px]"
          style={{
            "--primary": "#8884d8",
            "--color-aereo": "#82ca9d",
          }}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="total" hideLabel />}
            />
            <Pie data={pieData} dataKey="total" nameKey="name">
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColorForCategory(entry.name)}
                />
              ))}
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={10}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label || value
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
