"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

export const description = "A pie chart with a label list";

const chartData = [
  { browser: "casa_cliente", total: 275, fill: "var(--color-casa_cliente)" },
  { browser: "marketing", total: 200, fill: "var(--color-marketing)" },
  { browser: "ferrmental", total: 187, fill: "var(--color-ferrmental)" },
  { browser: "rede_externa", total: 173, fill: "var(--color-rede_externa)" },
  { browser: "engenharia", total: 90, fill: "var(--color-engenharia)" },
];

const chartConfig = {
  total: {
    label: "Total",
  },
  casa_cliente: {
    label: "Casa Cliente",
    color: "var(--chart-1)",
  },
  marketing: {
    label: "Marketing",
    color: "var(--chart-2)",
  },
  ferrmental: {
    label: "Ferramental",
    color: "var(--chart-3)",
  },
  rede_externa: {
    label: "Rede Externa",
    color: "var(--chart-4)",
  },
  engenharia: {
    label: "Engenharia",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function PieCategoryCharts() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Categoria - FIXA</CardTitle>
        <CardDescription>Pedidos por setor</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[205px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="total" hideLabel />}
            />
            <Pie data={chartData} dataKey="total">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
