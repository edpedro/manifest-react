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
import { Pencil, Trash2, Mail, MailCheck, FilePlus, Truck } from "lucide-react";

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
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingAllData?.map((invoice) => {
                // Definir a classe de fundo para o status
                let statusClass = "";
                if (invoice.status === "Pendente") {
                  statusClass = "bg-yellow-300"; // Amarelo claro
                } else if (invoice.status === "Expedido") {
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
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.name}</TableCell>
                    <TableCell>{invoice.transport}</TableCell>
                    <TableCell>{formatDate(invoice.dispatch_date)}</TableCell>
                    <TableCell>{invoice.estimatedArrival}</TableCell>
                    <TableCell className={`${statusClass}`}>
                      {invoice.status}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {authData?.type !== "driver" &&
                        invoice.isConfirm === false ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex flex-col items-center gap-1  p-2 hover:bg-transparent cursor-pointer"
                            onClick={() => handleFinish(invoice.id)}
                          >
                            <Truck className="h-4 w-4 text-black-600" />
                            <span className="text-xs">Finalizar</span>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex flex-col items-center gap-1  p-2 hover:bg-transparent"
                          >
                            <Truck className="h-4 w-4 text-green-600" />
                            <span className="text-xs">Finalizado</span>
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex flex-col items-center gap-1  p-2 hover:bg-transparent cursor-pointer"
                          onClick={() => handleInvoice(invoice.id)}
                        >
                          <FilePlus className="h-4 w-4 text-green-600" />
                          <span className="text-xs">NFs</span>
                        </Button>
                        {invoice.statusEmail === undefined ||
                        invoice.statusEmail === null ||
                        invoice.statusEmail === "" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex flex-col items-center gap-1  p-2 hover:bg-transparent cursor-pointer"
                            onClick={() => sendMail(invoice.id)}
                          >
                            <Mail className="h-4 w-4 text-red-600" />
                            <span className="text-xs">Enviar</span>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex flex-col items-center gap-1  p-2 hover:bg-transparent"
                          >
                            <MailCheck className="h-4 w-4 text-green-600" />
                            <span className="text-xs">Enviado</span>
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex flex-col items-center gap-1  p-2 hover:bg-transparent cursor-pointer"
                          onClick={() => handleEdit(invoice.id)}
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                          <span className="text-xs">Editar</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex flex-col items-center gap-1  p-2 hover:bg-transparent cursor-pointer"
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
