import { Loader2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import React, { useEffect } from "react";
import { useLoading } from "../contexts/hooks/Loanding";
import { useDashboard } from "../contexts/hooks/Dashboard";

export function SectionCards() {
  const { isDashboard } = useLoading();
  const { loadFilterDashboard, dashboardData } = useDashboard();

  useEffect(() => {
    loadFilterDashboard();
  }, []);

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex flex-row">
            Total Fornecimentos
            {isDashboard && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin ml-1" />
            )}
          </CardDescription>

          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {dashboardData?.TotalSupply}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex flex-row">
            Total STs
            {isDashboard && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin ml-1" />
            )}
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {dashboardData?.TotalSt}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex flex-row">
            Total Expedição
            {isDashboard && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin ml-1" />
            )}
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {dashboardData?.TotalExpedition}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex flex-row">
            Soma Valor
            {isDashboard && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin ml-1" />
            )}
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {dashboardData?.SomaValeu &&
              dashboardData?.SomaValeu.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
