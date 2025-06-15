import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useShipment } from "../../contexts/hooks/Shipment";

interface ShipmentData {
  name: string;
  transport: string;
  cpf: string;
  dispatch_date: string;
  dispatch_time: string;
}

interface UIPropsModal {
  setOpenDisplay: (value: boolean) => void;
  openDisplay: boolean;
}

export function ModalDisplay({ openDisplay, setOpenDisplay }: UIPropsModal) {
  const { shipmentData } = useShipment();

  const [formData, setFormData] = useState<ShipmentData>({
    name: "",
    transport: "",
    cpf: "",
    dispatch_date: "",
    dispatch_time: "",
  });

  useEffect(() => {
    function formatDate(date: Date | string | null): string {
      if (!date) return "";
      const d = new Date(date);
      const year = d.getUTCFullYear();
      const month = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    if (openDisplay && shipmentData) {
      setFormData({
        name: shipmentData.name || "",
        transport: shipmentData.transport || "",
        cpf: shipmentData.cpf || "",
        dispatch_date: formatDate(shipmentData.dispatch_date || ""),
        dispatch_time: shipmentData.dispatch_time || "",
      });
    }
  }, [openDisplay, shipmentData]);

  const formatCpf = (cpf: string) => {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "Valeu_invoice" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <Dialog open={openDisplay} onOpenChange={setOpenDisplay}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="items-center">
          <DialogTitle>Informações da Expedição</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome Motorista
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              disabled
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transport" className="text-right">
              Transportadora
            </Label>
            <Input
              id="transport"
              value={formData.transport}
              onChange={handleChange}
              className="col-span-3"
              disabled
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpf" className="text-right">
              CPF
            </Label>
            <Input
              id="cpf"
              value={formatCpf(formData.cpf)}
              onChange={handleChange}
              className="col-span-3"
              disabled
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dispatch_date" className="text-right">
              Data Expedição
            </Label>
            <Input
              id="dispatch_date"
              type="date"
              value={formData.dispatch_date}
              onChange={handleChange}
              className="col-span-3"
              disabled
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dispatch_time" className="text-right">
              Hora Expedição
            </Label>
            <Input
              id="dispatch_time"
              type="time"
              value={formData.dispatch_time}
              onChange={handleChange}
              className="col-span-3"
              disabled
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
