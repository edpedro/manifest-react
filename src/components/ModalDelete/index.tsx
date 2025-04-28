import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ShipmentData {
  id: number;
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
  const [formData, setFormData] = useState<ShipmentData>({
    id: 0,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "Valeu_invoice" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    setOpenDelete(false);
  };

  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="items-center">
          <DialogTitle>Deseja deletar?</DialogTitle>
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
            className="mr-2"
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
