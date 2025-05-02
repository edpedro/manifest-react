import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useShipment } from "../../contexts/hooks/Shipment";

interface ShipmentData {
  st: string;
  supply: string;
  invoice_number: string;
  invoice_issue_date: string;
  destination: string;
  carrier: string;
  transport_mode: string;
  Valeu_invoice: number;
  category: string;
  status: string;
  user: string;
}

interface UIPropsModal {
  setOpenDelete: (value: boolean) => void;
  openDelete: boolean;
  idDelete: string;
}

export function ModalDelete({ openDelete, setOpenDelete }: UIPropsModal) {
  const { shipmentData, handleDeleteShipment } = useShipment();

  const [formData, setFormData] = useState<ShipmentData>({
    st: "",
    supply: "",
    invoice_number: "",
    invoice_issue_date: "",
    destination: "",
    carrier: "",
    transport_mode: "",
    Valeu_invoice: 0,
    category: "",
    status: "",
    user: "",
  });

  useEffect(() => {
    function formatDate(date: Date | string | null): string {
      if (!date) return "";
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    if (openDelete && shipmentData) {
      setFormData({
        st: shipmentData.st || "",
        supply: shipmentData.supply || "",
        invoice_number: shipmentData.invoice_number || "",
        invoice_issue_date: formatDate(shipmentData.invoice_issue_date || ""),
        destination: shipmentData.destination || "",
        carrier: shipmentData.carrier || "",
        transport_mode: shipmentData.transport_mode || "",
        Valeu_invoice: shipmentData.Valeu_invoice || 0,
        category: shipmentData.category || "",
        status: shipmentData.status || "",
        user: shipmentData.user.first_name || "",
      });
    }
  }, [openDelete, shipmentData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "Valeu_invoice" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    try {
      if (shipmentData) {
        handleDeleteShipment(shipmentData.id);
      }
    } catch (error) {
      // Mantém os campos preenchidos em caso de erro para o usuário corrigir
      console.error("Erro no login:", error);
    }

    setOpenDelete(false);
  };

  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="items-center">
          <DialogTitle>Deseja deletar?</DialogTitle>
          <DialogDescription>
            Para deletar as informações "Deletar"
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="st" className="text-right">
              ST
            </Label>
            <Input
              id="st"
              value={formData.st}
              onChange={handleChange}
              className="col-span-3"
              disabled={true}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supply" className="text-right">
              Fornecimento
            </Label>
            <Input
              id="supply"
              value={formData.supply}
              onChange={handleChange}
              className="col-span-3"
              disabled={true}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="invoice_number" className="text-right">
              NF
            </Label>
            <Input
              id="invoice_number"
              value={formData.invoice_number}
              onChange={handleChange}
              className="col-span-3"
              disabled={true}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenDelete(false)}
            className="mr-2 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="cursor-pointer"
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
