import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useShipment } from "../../contexts/hooks/Shipment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CheckCircle2Icon, LoaderIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface UIPropsModal {
  setOpen: (value: boolean) => void;
  open: boolean;
}

export function ModalDisplayPendingShipping({ open, setOpen }: UIPropsModal) {
  const { invoicePendingData, categoryData } = useShipment();
  const [filterCategory, setFilterCategory] = useState("");

  const formatDate = (date: Date | string | null): string => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  };

  const filteredData = useMemo(() => {
    if (!invoicePendingData) return [];
    return filterCategory
      ? invoicePendingData.filter((item) => item.category === filterCategory)
      : invoicePendingData;
  }, [invoicePendingData, filterCategory]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px] h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Categoria</span>
              <Select
                defaultValue={filterCategory}
                onValueChange={(value) =>
                  setFilterCategory(value === "Todos" ? "" : value)
                }
              >
                <SelectTrigger className="w-[140px] cursor-pointer">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  {categoryData &&
                    categoryData.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <DialogTitle className="text-left sm:text-right w-full sm:w-auto ml-10">
              Relatório de Notas Fiscais
            </DialogTitle>
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* Container principal com scroll vertical */}
        <div className="flex-1 overflow-y-auto mt-4 min-h-0">
          {filteredData.length > 0 ? (
            /* Container com scroll horizontal forçado */
            <div className="w-full overflow-x-auto overflow-y-visible">
              <div className="min-w-max">
                <Table className="w-full text-sm border-collapse">
                  <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
                    <TableRow className="border-b">
                      <TableHead className="w-16 text-center p-2"></TableHead>
                      <TableHead className="w-32 p-2">Status</TableHead>
                      <TableHead className="w-28 p-2">Categoria</TableHead>
                      <TableHead className="w-16 p-2">ST</TableHead>
                      <TableHead className="w-36 p-2">Fornecimento</TableHead>
                      <TableHead className="w-24 p-2">NF</TableHead>
                      <TableHead className="w-28 p-2">Data NF</TableHead>
                      <TableHead className="w-48 p-2">Destinatário</TableHead>
                      <TableHead className="w-32 p-2">Cidade</TableHead>
                      <TableHead className="w-16 p-2">UF</TableHead>
                      <TableHead className="w-48 p-2">Transportadora</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((invoice) => {
                      const statusColors: Record<string, string> = {
                        Pendente: "bg-yellow-300",
                        "Em romaneio": "bg-blue-200",
                        Expedido: "bg-green-200",
                      };

                      const status = invoice.status ?? "Indefinido";
                      const statusClass = statusColors[status] || "bg-gray-200";

                      return (
                        <TableRow
                          key={invoice.supply}
                          className="border-b hover:bg-muted/50"
                        >
                          <TableCell className="w-16 text-center p-2">
                            <div
                              className={`h-3 w-3 rounded-full mx-auto ${
                                invoice.cor === "yellow"
                                  ? "bg-yellow-300"
                                  : invoice.cor === "red"
                                  ? "bg-red-600"
                                  : "bg-green-600"
                              }`}
                            />
                          </TableCell>
                          <TableCell className="w-32 p-2">
                            <Badge
                              variant="outline"
                              className={`flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 ${statusClass} whitespace-nowrap`}
                            >
                              {status === "Expedido" ? (
                                <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                              ) : (
                                <LoaderIcon />
                              )}
                              {status}
                            </Badge>
                          </TableCell>
                          <TableCell className="w-28 p-2 whitespace-nowrap">
                            {invoice.category}
                          </TableCell>
                          <TableCell className="w-16 p-2 whitespace-nowrap">
                            {invoice.st}
                          </TableCell>
                          <TableCell className="w-36 p-2 whitespace-nowrap">
                            {invoice.supply}
                          </TableCell>
                          <TableCell className="w-24 p-2 whitespace-nowrap">
                            {invoice.invoice_number}
                          </TableCell>
                          <TableCell className="w-28 p-2 whitespace-nowrap">
                            {formatDate(invoice.invoice_issue_date)}
                          </TableCell>
                          <TableCell className="w-48 p-2">
                            <div
                              className="truncate"
                              title={invoice.destination}
                            >
                              {invoice.destination}
                            </div>
                          </TableCell>
                          <TableCell className="w-32 p-2 whitespace-nowrap">
                            {invoice.city}
                          </TableCell>
                          <TableCell className="w-16 p-2 whitespace-nowrap">
                            {invoice.uf}
                          </TableCell>
                          <TableCell className="w-48 p-2">
                            <div className="truncate" title={invoice.carrier}>
                              {invoice.carrier}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              Nenhuma nota encontrada.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
