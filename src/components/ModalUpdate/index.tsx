import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useShipment } from "../../contexts/hooks/Shipment";
import { UpdateShipmentDto } from "../../types";

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
  setOpenUpdate: (value: boolean) => void;
  openUpdate: boolean;
}

export function ModalUpdate({ openUpdate, setOpenUpdate }: UIPropsModal) {
  const { shipmentData, handleUpdateShipment } = useShipment();

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

    if (openUpdate && shipmentData) {
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
  }, [openUpdate, shipmentData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "Valeu_invoice" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      if (shipmentData) {
        const updateData: UpdateShipmentDto = {
          st: formData.st,
          supply: formData.supply,
          invoice_number: formData.invoice_number,
          invoice_issue_date: new Date(formData.invoice_issue_date),
          destination: formData.destination.toUpperCase(),
          carrier: formData.carrier.toUpperCase(),
          transport_mode: formData.transport_mode.toUpperCase(),
          Valeu_invoice: formData.Valeu_invoice,
          category: formData.category.toUpperCase(),
          status: formData.status,
        };

        handleUpdateShipment(shipmentData.id, updateData);
      }
    } catch (error) {
      // Mantém os campos preenchidos em caso de erro para o usuário corrigir
      console.error("Erro no login:", error);
    }

    setOpenUpdate(false);
  };

  return (
    <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="items-center">
          <DialogTitle>Deseja atualizar?</DialogTitle>
          <DialogDescription>
            Atualize os campos necessários e clique em "Salvar alterações"
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
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="invoice_issue_date" className="text-right">
              Data NF
            </Label>
            <Input
              id="invoice_issue_date"
              type="datetime-local"
              value={formData.invoice_issue_date}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destination" className="text-right">
              Destino
            </Label>
            <Input
              id="destination"
              value={formData.destination}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="carrier" className="text-right">
              Transportadora
            </Label>
            <Input
              id="carrier"
              value={formData.carrier}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transport_mode" className="text-right">
              Modal
            </Label>
            <Select
              value={formData.transport_mode}
              onValueChange={(value) =>
                handleSelectChange("transport_mode", value)
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o modal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RODOVIÁRIO">RODOVIÁRIO</SelectItem>
                <SelectItem value="AÉREO">AÉREO</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Valeu_invoice" className="text-right">
              Valor
            </Label>
            <Input
              id="Valeu_invoice"
              type="number"
              step="0.01"
              value={formData.Valeu_invoice}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoria
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MKT">MKT</SelectItem>
                <SelectItem value="FIXA">FIXA</SelectItem>
                <SelectItem value="OSP">OSP</SelectItem>
                <SelectItem value="OUTROS">FERRAMENTAL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Em romaneio">Em romaneio</SelectItem>
                <SelectItem value="Expedido">Expedido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user" className="text-right">
              Usuário
            </Label>
            <Input
              id="user"
              value={formData.user}
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
            onClick={() => setOpenUpdate(false)}
            className="mr-2"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="cursor-pointer"
          >
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
