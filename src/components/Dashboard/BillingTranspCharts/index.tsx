"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

export const description = "A bar chart with a custom label";

const chartConfig = {
  valeu: {
    label: "Valor",
    color: "var(--primary)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

// Função para formatar valores monetários
const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("R$", "")
    .trim();
};

// Função para formatar valores grandes (abreviação)
const formatValue = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return formatCurrency(value);
};

export function BillingTranspCharts() {
  const { dashboardData } = useDashboard();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faturamento - Transportadoras Top 5</CardTitle>
        <CardDescription>Análise de faturamento por transporte</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dashboardData?.top5InvoiceTransportValueTotal}
            layout="vertical"
            margin={{
              right: 80,
              left: 80,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="valeu" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => [formatCurrency(value), " Valor"]}
                />
              }
            />
            <Bar
              dataKey="valeu"
              layout="vertical"
              fill="var(--color-valeu)"
              radius={4}
            >
              <LabelList
                dataKey="name"
                position="left"
                offset={8}
                className="fill-foreground font-medium"
                fontSize={12}
                style={{ textAnchor: "end" }}
              />
              <LabelList
                dataKey="valeu"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value) => formatValue(value)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
