import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import {
  Pencil,
  Trash2,
  Eye,
  CheckCircle2Icon,
  LoaderIcon,
} from "lucide-react";
import { ModalUpdate } from "../ModalUpdate";
import { ModalDelete } from "../ModalDelete";
import { useShipment } from "../../contexts/hooks/Shipment";
import { ModalDisplay } from "../ModalDisplay";
import { Badge } from "../ui/badge";

export function ShipmentTable() {
  const { searchData, setDataSearch, handleFindshipment } = useShipment();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  useEffect(() => {
    return () => {
      setDataSearch([]);
    };
  }, []);

  const handleEdit = (id) => {
    handleFindshipment(id);
    setOpenUpdate(true);
  };

  const handleDisplay = (id) => {
    handleFindshipment(id);
    setOpenDisplay(true);
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    setIdDelete(id);
    handleFindshipment(id);
  };

  return (
    <>
      {searchData && searchData.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ST</TableHead>
                <TableHead>Fornecimento</TableHead>
                <TableHead>NF</TableHead>
                <TableHead>Data NF</TableHead>
                <TableHead>Destinatário</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>UF</TableHead>
                <TableHead>Transportadora</TableHead>
                <TableHead>Modal</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchData?.map((invoice) => {
                let statusClass = "";
                if (invoice.status === "Pendente") {
                  statusClass = "bg-yellow-300";
                } else if (invoice.status === "Expedido") {
                  statusClass = "bg-green-200";
                } else if (invoice.status === "Em romaneio") {
                  statusClass = "bg-blue-200";
                } else {
                  statusClass = "bg-gray-200";
                }

                function formatDate(date: Date | string | null): string {
                  if (!date) return "";
                  return new Date(date).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  });
                }

                return (
                  <TableRow key={invoice.supply}>
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
                    <TableCell>{invoice.transport_mode}</TableCell>
                    <TableCell>
                      {invoice.Valeu_invoice &&
                        invoice.Valeu_invoice.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                    </TableCell>
                    <TableCell>{invoice.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 ${statusClass}`}
                      >
                        {invoice.status === "Expedido" ? (
                          <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                        ) : (
                          <LoaderIcon />
                        )}
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.user.first_name}</TableCell>
                    <TableCell>
                      {invoice.cpf && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => handleDisplay(invoice.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleEdit(invoice.id)}
                      >
                        <Pencil className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleDelete(invoice.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {openUpdate && (
            <ModalUpdate
              openUpdate={openUpdate}
              setOpenUpdate={setOpenUpdate}
            />
          )}
          {openDelete && (
            <ModalDelete
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              idDelete={idDelete}
            />
          )}

          {openDisplay && (
            <ModalDisplay
              openDisplay={openDisplay}
              setOpenDisplay={setOpenDisplay}
            />
          )}
        </>
      )}
    </>
  );
}
