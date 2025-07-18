import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { CheckCircle2Icon, LoaderIcon, Trash2 } from "lucide-react";
import { useShipment } from "../../contexts/hooks/Shipment";
import { useShipping } from "../../contexts/hooks/Shipping";
import { ModalDeleteInvoice } from "../ModalDeleteInvoice";
import { DeletarManifestDto, DeleteShipmentDto } from "../../types";
import { Badge } from "../ui/badge";
import { useLoading } from "../../contexts/hooks/Loanding";

interface UIPropsModal {
  id: number;
}

export function ShipmentCreateTable({ id }: UIPropsModal) {
  const { setDataSearch } = useShipment();
  const { shippingData, handleFindIdShipping } = useShipping();
  const { isLoadingContext } = useLoading();

  const [cor, setCor] = useState<number[]>([]);

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<number>(0);
  const [dataShipmentDelete, setDataShipmentDelete] =
    useState<DeleteShipmentDto>({
      id: 0,
      st: "",
      supply: "",
      invoice_number: "",
    });
  const [deleteinvoice, setDeleteinvoice] = useState<DeletarManifestDto>({
    shipmentId: [],
  });

  useEffect(() => {
    async function load() {
      await handleFindIdShipping(id);
    }
    if (isLoadingContext) {
      load();
    }
  }, [isLoadingContext, handleFindIdShipping, id]);

  useEffect(() => {
    return () => {
      setDataSearch([]);
    };
  }, []);

  const handleDelete = (shippingId: number, shipmentId: DeleteShipmentDto) => {
    setIdDelete(shippingId);
    setDataShipmentDelete(shipmentId);
    setDeleteinvoice({
      shipmentId: [shipmentId.id],
    });
    setOpenDelete(true);
  };

  const toggleSelection = (id: number) => {
    setCor((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {shippingData?.id === id &&
        shippingData.shipmentShipping &&
        shippingData.shipmentShipping.length > 0 && (
          <>
            <div className="max-h-[70vh] overflow-y-auto overflow-x-auto border rounded-md">
              <Table className="text-sm min-w-[600px]">
                <TableHeader>
                  <TableRow className="h-8">
                    <TableHead className="px-2 py-1"></TableHead>
                    <TableHead className="px-2 py-1">ST</TableHead>
                    <TableHead className="px-2 py-1">Fornecimento</TableHead>
                    <TableHead className="px-2 py-1">NF</TableHead>
                    <TableHead className="px-2 py-1">Destino</TableHead>
                    <TableHead className="px-2 py-1">Categoria</TableHead>
                    <TableHead className="px-2 py-1">Status</TableHead>
                    <TableHead className="px-2 py-1">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippingData.shipmentShipping.map((invoice, index) => {
                    let statusClass = "";

                    if (invoice.shipment.status === "Pendente") {
                      statusClass = "bg-yellow-300";
                    } else if (invoice.shipment.status === "Expedido") {
                      statusClass = "bg-green-200";
                    } else if (invoice.shipment.status === "Em romaneio") {
                      statusClass = "bg-blue-200";
                    } else {
                      statusClass = "bg-gray-200";
                    }

                    return (
                      <TableRow
                        key={index}
                        className={
                          cor.includes(invoice.shipment.id)
                            ? "h-8 bg-neutral-100"
                            : "h-8"
                        }
                      >
                        <TableCell className="px-2 py-1">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms"
                              onCheckedChange={() =>
                                toggleSelection(invoice.shipment.id)
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          {invoice.shipment.st}
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          {invoice.shipment.supply}
                        </TableCell>
                        <TableCell
                          className={
                            cor.includes(invoice.shipment.id)
                              ? "px-2 py-1 font-bold"
                              : "px-2 py-1"
                          }
                        >
                          {invoice.shipment.invoice_number}
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          {invoice.shipment.city}
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          {invoice.shipment.category}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 ${statusClass}`}
                          >
                            {invoice.shipment.status === "Expedido" ? (
                              <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                            ) : (
                              <LoaderIcon />
                            )}
                            {invoice.shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-1 cursor-pointer"
                            onClick={() =>
                              handleDelete(shippingData.id, invoice.shipment)
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {openDelete && (
              <ModalDeleteInvoice
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                idDelete={idDelete}
                deleteinvoice={deleteinvoice}
                dataShipmentDelete={dataShipmentDelete}
              />
            )}
          </>
        )}
    </>
  );
}
