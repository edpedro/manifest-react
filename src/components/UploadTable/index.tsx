import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useShipment } from "../../contexts/hooks/Shipment";

export function UploadTable() {
  const { createShipment } = useShipment();

  return (
    <>
      {createShipment?.dataError && createShipment.dataError.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ST</TableHead>
                <TableHead>Fornecimento</TableHead>
                <TableHead>NF</TableHead>
                <TableHead>Data NF</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Transportadora</TableHead>
                <TableHead>Modal</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {createShipment.dataError.map((invoice) => {
                // Definir a classe de fundo para o status
                let statusClass = "";
                if (invoice.status === "Pendente") {
                  statusClass = "bg-yellow-300"; // Amarelo claro
                } else if (invoice.status === "Concluído") {
                  statusClass = "bg-green-200"; // Verde claro
                } else {
                  statusClass = "bg-gray-200"; // Cor padrão para outros status
                }

                function formatDate(date: Date | string | null): string {
                  if (!date) return ""; // Retorna vazio se for null
                  return new Date(date).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  });
                }

                return (
                  <TableRow key={invoice.supply}>
                    <TableCell className="font-medium">{invoice.st}</TableCell>
                    <TableCell>{invoice.supply}</TableCell>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>
                      {formatDate(invoice.invoice_issue_date)}
                    </TableCell>
                    <TableCell>{invoice.destination}</TableCell>
                    <TableCell>{invoice.carrier}</TableCell>
                    <TableCell>{invoice.transport_mode}</TableCell>
                    <TableCell>
                      {invoice.Valeu_invoice &&
                        invoice.Valeu_invoice.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                    </TableCell>
                    <TableCell>{invoice.category}</TableCell>
                    <TableCell className={`p-2 ${statusClass}`}>
                      {invoice.status}
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.user.first_name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
