"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", invoice: 222, dispatched: 150 },
  { date: "2024-04-02", invoice: 97, dispatched: 180 },
  { date: "2024-04-03", invoice: 167, dispatched: 120 },
  { date: "2024-04-04", invoice: 242, dispatched: 260 },
  { date: "2024-04-05", invoice: 373, dispatched: 290 },
  { date: "2024-04-06", invoice: 301, dispatched: 340 },
  { date: "2024-04-07", invoice: 245, dispatched: 180 },
  { date: "2024-04-08", invoice: 409, dispatched: 320 },
  { date: "2024-04-09", invoice: 59, dispatched: 110 },
  { date: "2024-04-10", invoice: 261, dispatched: 190 },
  { date: "2024-04-11", invoice: 327, dispatched: 350 },
  { date: "2024-04-12", invoice: 292, dispatched: 210 },
  { date: "2024-04-13", invoice: 342, dispatched: 380 },
  { date: "2024-04-14", invoice: 137, dispatched: 220 },
  { date: "2024-04-15", invoice: 120, dispatched: 170 },
  { date: "2024-04-16", invoice: 138, dispatched: 190 },
  { date: "2024-04-17", invoice: 446, dispatched: 360 },
  { date: "2024-04-18", invoice: 364, dispatched: 410 },
  { date: "2024-04-19", invoice: 243, dispatched: 180 },
  { date: "2024-04-20", invoice: 89, dispatched: 150 },
  { date: "2024-04-21", invoice: 137, dispatched: 200 },
  { date: "2024-04-22", invoice: 224, dispatched: 170 },
  { date: "2024-04-23", invoice: 138, dispatched: 230 },
  { date: "2024-04-24", invoice: 387, dispatched: 290 },
  { date: "2024-04-25", invoice: 215, dispatched: 250 },
  { date: "2024-04-26", invoice: 75, dispatched: 130 },
  { date: "2024-04-27", invoice: 383, dispatched: 420 },
  { date: "2024-04-28", invoice: 122, dispatched: 180 },
  { date: "2024-04-29", invoice: 315, dispatched: 240 },
  { date: "2024-04-30", invoice: 454, dispatched: 380 },
  { date: "2024-05-01", invoice: 165, dispatched: 220 },
  { date: "2024-05-02", invoice: 293, dispatched: 310 },
  { date: "2024-05-03", invoice: 247, dispatched: 190 },
  { date: "2024-05-04", invoice: 385, dispatched: 420 },
  { date: "2024-05-05", invoice: 481, dispatched: 390 },
  { date: "2024-05-06", invoice: 498, dispatched: 520 },
  { date: "2024-05-07", invoice: 388, dispatched: 300 },
  { date: "2024-05-08", invoice: 149, dispatched: 210 },
  { date: "2024-05-09", invoice: 227, dispatched: 180 },
  { date: "2024-05-10", invoice: 293, dispatched: 330 },
  { date: "2024-05-11", invoice: 335, dispatched: 270 },
  { date: "2024-05-12", invoice: 197, dispatched: 240 },
  { date: "2024-05-13", invoice: 197, dispatched: 160 },
  { date: "2024-05-14", invoice: 448, dispatched: 490 },
  { date: "2024-05-15", invoice: 473, dispatched: 380 },
  { date: "2024-05-16", invoice: 338, dispatched: 400 },
  { date: "2024-05-17", invoice: 499, dispatched: 420 },
  { date: "2024-05-18", invoice: 315, dispatched: 350 },
  { date: "2024-05-19", invoice: 235, dispatched: 180 },
  { date: "2024-05-20", invoice: 177, dispatched: 230 },
  { date: "2024-05-21", invoice: 82, dispatched: 140 },
  { date: "2024-05-22", invoice: 81, dispatched: 120 },
  { date: "2024-05-23", invoice: 252, dispatched: 290 },
  { date: "2024-05-24", invoice: 294, dispatched: 220 },
  { date: "2024-05-25", invoice: 201, dispatched: 250 },
  { date: "2024-05-26", invoice: 213, dispatched: 170 },
  { date: "2024-05-27", invoice: 420, dispatched: 460 },
  { date: "2024-05-28", invoice: 233, dispatched: 190 },
  { date: "2024-05-29", invoice: 78, dispatched: 130 },
  { date: "2024-05-30", invoice: 340, dispatched: 280 },
  { date: "2024-05-31", invoice: 178, dispatched: 230 },
  { date: "2024-06-01", invoice: 178, dispatched: 200 },
  { date: "2024-06-02", invoice: 470, dispatched: 410 },
  { date: "2024-06-03", invoice: 103, dispatched: 160 },
  { date: "2024-06-04", invoice: 439, dispatched: 380 },
  { date: "2024-06-05", invoice: 88, dispatched: 140 },
  { date: "2024-06-06", invoice: 294, dispatched: 250 },
  { date: "2024-06-07", invoice: 323, dispatched: 370 },
  { date: "2024-06-08", invoice: 385, dispatched: 320 },
  { date: "2024-06-09", invoice: 438, dispatched: 480 },
  { date: "2024-06-10", invoice: 155, dispatched: 200 },
  { date: "2024-06-11", invoice: 92, dispatched: 150 },
  { date: "2024-06-12", invoice: 492, dispatched: 420 },
  { date: "2024-06-13", invoice: 81, dispatched: 130 },
  { date: "2024-06-14", invoice: 426, dispatched: 380 },
  { date: "2024-06-15", invoice: 307, dispatched: 350 },
  { date: "2024-06-16", invoice: 371, dispatched: 310 },
  { date: "2024-06-17", invoice: 475, dispatched: 520 },
  { date: "2024-06-18", invoice: 107, dispatched: 170 },
  { date: "2024-06-19", invoice: 341, dispatched: 290 },
  { date: "2024-06-20", invoice: 408, dispatched: 450 },
  { date: "2024-06-21", invoice: 169, dispatched: 210 },
  { date: "2024-06-22", invoice: 317, dispatched: 270 },
  { date: "2024-06-23", invoice: 480, dispatched: 530 },
  { date: "2024-06-24", invoice: 132, dispatched: 180 },
  { date: "2024-06-25", invoice: 141, dispatched: 190 },
  { date: "2024-06-26", invoice: 434, dispatched: 380 },
  { date: "2024-06-27", invoice: 448, dispatched: 490 },
  { date: "2024-06-28", invoice: 149, dispatched: 200 },
  { date: "2024-06-29", invoice: 103, dispatched: 160 },
  { date: "2024-06-30", invoice: 446, dispatched: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Nota Fiscal",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Expedidos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function AreInvoiceCharts() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="w-full max-w-[870px] mx-auto">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Análise Temporal de Notas x Expedido</CardTitle>
          <CardDescription>
            Mostrando o total de notas dos últimos 3 meses
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 3 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[140px] ">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-br", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-br", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="dispatched"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="invoice"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
