import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Pencil,
  Trash2,
  Mail,
  MailCheck,
  FilePlus,
  Truck,
  CheckCircle2Icon,
  LoaderIcon,
} from "lucide-react";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { useShipping } from "../../contexts/hooks/Shipping";
import { ModalCreateShipping } from "../ModalCreateShipping";
import { ModalDeleteShipping } from "../ModalDeleteShipping";
import { useNavigate } from "react-router-dom";
import { useMail } from "../../contexts/hooks/Mail";
import { ModalFinishShipping } from "../ModalFinishShipping";
import { useAuth } from "../../contexts/hooks/Auth";

export function ShippingTable() {
  const { shippingAllData, handleFindIdShipping } = useShipping();
  const { authData } = useAuth();
  const { handleSedMail } = useMail();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [idUpdate, setIdUpdate] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");
  const [idFinish, setIdFinish] = useState<number>(0);

  const sendMail = (id) => {
    handleSedMail(id);
  };

  const handleFinish = (id) => {
    setIdFinish(id);
    handleFindIdShipping(id);
    setOpenFinish(true);
  };

  const handleEdit = (id) => {
    setOpen(true);
    handleFindIdShipping(id);
    setIdUpdate(id);
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    handleFindIdShipping(id);
    setIdDelete(id);
  };

  const handleInvoice = (id) => {
    handleFindIdShipping(id);
    navigate(`/romaneio/invoice/${id}`);
  };
  function formatDate(date: Date | string | null): string {
    if (!date) return "";

    try {
      const timeZone = "America/Sao_Paulo";
      const zonedDate = toZonedTime(new Date(date), timeZone);
      return formatInTimeZone(zonedDate, timeZone, "dd/MM/yyyy");
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "";
    }
  }

  return (
    <>
      {shippingAllData && shippingAllData.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numero</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Transportadora</TableHead>
                <TableHead>Data Coleta</TableHead>
                <TableHead>Previsão Coleta</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingAllData.map((invoice) => {
                let statusClass = "";
                if (invoice.status === "Pendente") {
                  statusClass = "bg-yellow-300";
                } else if (invoice.status === "Expedido") {
                  statusClass = "bg-green-200";
                } else {
                  statusClass = "bg-gray-200";
                }

                return (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.name}</TableCell>
                    <TableCell>{invoice.transport}</TableCell>
                    <TableCell>{formatDate(invoice.dispatch_date)}</TableCell>
                    <TableCell>{invoice.estimatedArrival}</TableCell>
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
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {authData?.type !== "driver" ? (
                          invoice.isConfirm === false ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                              onClick={() => handleFinish(invoice.id)}
                            >
                              <Truck className="h-4 w-4 text-black-600" />
                              <span className="text-xs">Finalizar</span>
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 px-2 py-1"
                            >
                              <Truck className="h-4 w-4 text-green-600" />
                              <span className="text-xs">Finalizado</span>
                            </Button>
                          )
                        ) : (
                          ""
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                          onClick={() => handleInvoice(invoice.id)}
                        >
                          <FilePlus className="h-4 w-4 text-green-600" />
                          <span className="text-xs">NFs</span>
                        </Button>

                        {invoice.shipmentShipping.length === 0 ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 px-2 py-1"
                            disabled
                          >
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              Enviar
                            </span>
                          </Button>
                        ) : invoice.status === "Expedido" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 px-2 py-1"
                          >
                            <MailCheck className="h-4 w-4 text-green-600" />
                            <span className="text-xs">Enviado</span>
                          </Button>
                        ) : invoice.statusEmail === null ||
                          invoice.statusEmail === "" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                            onClick={() => sendMail(invoice.id)}
                          >
                            <Mail className="h-4 w-4 text-red-600" />
                            <span className="text-xs">Enviar</span>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 px-2 py-1"
                          >
                            <MailCheck className="h-4 w-4 text-green-600" />
                            <span className="text-xs">Enviado</span>
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                          onClick={() => handleEdit(invoice.id)}
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                          <span className="text-xs">Editar</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                          onClick={() => handleDelete(invoice.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                          <span className="text-xs">Deletar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {openDelete && (
            <ModalDeleteShipping
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              idDelete={idDelete}
            />
          )}

          {open && (
            <ModalCreateShipping
              open={open}
              setOpen={setOpen}
              idUpdate={idUpdate}
            />
          )}

          {openFinish && (
            <ModalFinishShipping
              openFinish={openFinish}
              setOpenFinish={setOpenFinish}
              idFinish={idFinish}
            />
          )}
        </>
      )}
    </>
  );
}
