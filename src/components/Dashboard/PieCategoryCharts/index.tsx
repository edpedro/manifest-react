"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart, Cell } from "recharts";

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
import { useDashboard } from "../../../contexts/hooks/Dashboard";

export const description = "A pie chart with a label list";

const chartConfig = {
  total: {
    label: "Total",
  },
  CASA_CLIENTE: {
    label: "CASA_CLIENTE",
    color: "var(--color-casa-cliente)",
  },
  MARKETING: {
    label: "MARKETING",
    color: "var(--color-marketing)",
  },
  FERRAMENTAL: {
    label: "FERRAMENTAL",
    color: "var(--color-ferramental)",
  },
  REDE_EXTERNA: {
    label: "REDE_EXTERNA",
    color: "var(--color-rede-externa)",
  },
  ENGENHARIA: {
    label: "ENGENHARIA",
    color: "var(--color-engenharia)",
  },
} satisfies ChartConfig;

export function PieCategoryCharts() {
  const { dashboardData } = useDashboard();

  // Função para obter a cor baseada no nome da categoria
  const getColorForCategory = (categoryName) => {
    return chartConfig[categoryName]?.color || "var(--color-casa-cliente)";
  };

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
          style={{
            "--color-casa-cliente": "#8884d8",
            "--color-marketing": "#82ca9d",
            "--color-ferramental": "#ffc658",
            "--color-rede-externa": "#ff7300",
            "--color-engenharia": "#00ff88",
          }}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="total" hideLabel />}
            />
            <Pie data={dashboardData?.categoryTotal} dataKey="total">
              {dashboardData?.categoryTotal?.map((entry, index) => (
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
