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
import { DeletarManifestDto, DeleteShipmentDto } from "../../types";
import { useShipping } from "../../contexts/hooks/Shipping";

interface ShipmentData {
  st: string;
  supply: string;
  invoice_number: string;
}

interface UIPropsModal {
  setOpenDelete: (value: boolean) => void;
  deleteinvoice: DeletarManifestDto;
  dataShipmentDelete: DeleteShipmentDto;
  openDelete: boolean;
  idDelete: number;
}

export function ModalDeleteInvoice({
  openDelete,
  setOpenDelete,
  deleteinvoice,
  idDelete,
  dataShipmentDelete,
}: UIPropsModal) {
  const { handleDeleteManifestShipping } = useShipping();

  const [formData, setFormData] = useState<ShipmentData>({
    st: "",
    supply: "",
    invoice_number: "",
  });

  useEffect(() => {
    if (openDelete && dataShipmentDelete) {
      setFormData({
        st: dataShipmentDelete.st || "",
        supply: dataShipmentDelete.supply || "",
        invoice_number: dataShipmentDelete.invoice_number || "",
      });
    }
  }, [openDelete, dataShipmentDelete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "Valeu_invoice" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    try {
      if (idDelete) {
        handleDeleteManifestShipping(idDelete, deleteinvoice);
      }
    } catch (error) {
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
