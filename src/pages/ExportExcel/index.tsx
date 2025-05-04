import React, { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Calendar, Search } from "lucide-react";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { toast } from "react-toastify";
import { useShipment } from "../../contexts/hooks/Shipment";
import { UIExtratorDateExcel, UIExtratorExcel } from "../../types";

export default function ExcelExtractor() {
  const { extratorDateExcel, extratorSTSupplysExcel } = useShipment();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const [action, setAction] = useState("");

  const processTextFilter = (text) => {
    if (!text.trim()) return [];

    // Divide o texto por quebras de linha ou vírgulas
    const items = text
      .split(/[\n,]+/)
      .map((item) => item.trim()) // Remove espaços extras
      .filter((item) => item); // Remove itens vazios

    return items;
  };

  const handleExtratorDateFile = () => {
    if (action === "date" || action === "") {
      if (!startDate || !endDate) {
        toast.error("Favor preencher todos campos!");
      } else {
        const newData: UIExtratorDateExcel = {
          data_start: startDate,
          date_end: endDate,
        };
        extratorDateExcel(newData);
      }
    } else {
      if (!textFilter) {
        toast.error("Favor preencher todos campos!");
      } else {
        const result = processTextFilter(textFilter);

        const newData: UIExtratorExcel = {
          valeu: result,
        };
        extratorSTSupplysExcel(newData);
      }
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Extração de Planilha Excel
              </CardTitle>
              <CardDescription>
                Selecione a forma que deseja realizar a extração
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filtros em abas separadas */}
              <Tabs
                defaultValue="date"
                className="w-full"
                onValueChange={setAction}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="date"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 " />
                    Período de Extração
                  </TabsTrigger>
                  <TabsTrigger
                    value="text"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Search className="h-4 w-4" />
                    Filtros Adicionais
                  </TabsTrigger>
                </TabsList>

                {/* Aba de Período */}
                <TabsContent value="date" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Data Inicial</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">Data Final</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Defina o período para filtrar os dados da planilha. Ambas as
                    datas são obrigatórias.
                  </p>
                </TabsContent>

                {/* Aba de Filtros Adicionais */}
                <TabsContent value="text" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-filter">
                      Filtro por STs/Fornecimentos
                    </Label>
                    <Textarea
                      id="text-filter"
                      placeholder="Digite termos para filtrar os dados da planilha..."
                      value={textFilter}
                      onChange={(e) => setTextFilter(e.target.value)}
                      className="min-h-32 resize-none"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="w-full cursor-pointer"
                size="lg"
                onClick={handleExtratorDateFile}
              >
                Extrair Dados
              </Button>
            </CardFooter>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
