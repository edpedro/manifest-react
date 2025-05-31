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

        <div className="flex-1 overflow-y-auto mt-4 min-h-0">
          {filteredData.length > 0 ? (
            <Table className="min-w-full text-sm">
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>ST</TableHead>
                  <TableHead>Fornecimento</TableHead>
                  <TableHead>NF</TableHead>
                  <TableHead>Data NF</TableHead>
                  <TableHead>Destinatário</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>UF</TableHead>
                  <TableHead>Transportadora</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableRow key={invoice.supply}>
                      <TableCell>
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
                      <TableCell>{invoice.st}</TableCell>
                      <TableCell>{invoice.supply}</TableCell>
                      <TableCell>{invoice.invoice_number}</TableCell>
                      <TableCell>
                        {formatDate(invoice.invoice_issue_date)}
                      </TableCell>
                      <TableCell>{invoice.destination}</TableCell>
                      <TableCell>{invoice.city}</TableCell>
                      <TableCell>{invoice.uf}</TableCell>
                      <TableCell>{invoice.carrier}</TableCell>
                      <TableCell>{invoice.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 ${statusClass}`}
                        >
                          {status === "Expedido" ? (
                            <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                          ) : (
                            <LoaderIcon />
                          )}
                          {status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
