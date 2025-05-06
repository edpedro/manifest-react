"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

import { useShipment } from "../contexts/hooks/Shipment";
import { Loader2 } from "lucide-react";
import { useLoading } from "../contexts/hooks/Loanding";

// UIDashboard interface definition
export interface UIDashboard {
  totaisPorMes: {
    dataCompleta: string;
    count: number;
  }[];
}

const chartConfig = {
  shipments: {
    label: "Entregas",
  },
  count: {
    label: "Quantidade",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Função auxiliar para verificar se uma data é válida
function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function LineChartSupply() {
  const { isDashboard } = useLoading();
  const { dashData } = useShipment();

  // Transform UIDashboard data into chart format
  const chartData = React.useMemo(() => {
    if (!dashData?.totaisPorMes || dashData.totaisPorMes.length === 0) {
      return [];
    }

    // Filtrar datas inválidas e transformar os dados
    return dashData.totaisPorMes
      .filter((item) => isValidDate(item.dataCompleta))
      .map((item) => ({
        date: item.dataCompleta,
        count: item.count,
      }));
  }, [dashData?.totaisPorMes]);

  // Abordagem simplificada - mostrar todos os dados de uma vez
  // e apenas ordenar por data para garantir visualização correta
  const displayData = React.useMemo(() => {
    if (!chartData || chartData.length === 0) return [];

    return [...chartData].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [chartData]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="flex flex-row">
            Visão geral de Pedidos
            {isDashboard && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin ml-1" />
            )}
          </CardTitle>
          <CardDescription>
            Mostrando total de pedidos por período
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {displayData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={displayData}>
              <defs>
                <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-count)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-count)"
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
                minTickGap={10} // Reduzido para mostrar mais rótulos de data
                tickFormatter={(value) => {
                  const date = new Date(value + "T00:00:00");
                  return date.toLocaleDateString("pt-BR", {
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
                      const date = new Date(value + "T00:00:00");
                      return new Date(date).toLocaleDateString("pt-BR", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="count"
                type="natural"
                fill="url(#fillCount)"
                stroke="var(--color-count)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground">Nenhum dado disponível</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Componente auxiliar para debug - adicione temporariamente no seu código
export function DateDebugger() {
  const { dashData } = useShipment();

  if (!dashData?.totaisPorMes) return <div className="p-4">Sem dados</div>;

  // Agrupar dados por mês
  const dataByMonth = {};

  dashData.totaisPorMes.forEach((item) => {
    const date = new Date(item.dataCompleta);
    if (isNaN(date.getTime())) {
      // Data inválida
      if (!dataByMonth["inválido"]) {
        dataByMonth["inválido"] = [];
      }
      dataByMonth["inválido"].push(item);
      return;
    }

    const month = date.getMonth() + 1; // +1 porque getMonth() retorna 0-11

    if (!dataByMonth[month]) {
      dataByMonth[month] = [];
    }

    dataByMonth[month].push({
      data: item.dataCompleta,
      count: item.count,
    });
  });

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Dados por Mês (Debug)</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(dataByMonth).length === 0 ? (
          <p>Nenhum dado disponível</p>
        ) : (
          Object.keys(dataByMonth).map((month) => (
            <div key={month} className="mb-4">
              <h4 className="font-semibold mb-2">
                {month === "inválido" ? "Datas Inválidas" : `Mês ${month}`}
              </h4>
              <ul className="text-sm space-y-1">
                {dataByMonth[month].map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.data}</span>
                    <span>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
