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
import { useShipping } from "../../contexts/hooks/Shipping";

interface ShippingDto {
  id: number;
}

interface UIPropsModal {
  setOpenDelete: (value: boolean) => void;
  openDelete: boolean;
  idDelete: string;
}

export function ModalDeleteShipping({
  openDelete,
  setOpenDelete,
}: UIPropsModal) {
  const { shippingData, handleDeleteShipping } = useShipping();

  const [formData, setFormData] = useState<ShippingDto>({
    id: 0,
  });

  useEffect(() => {
    if (openDelete && shippingData) {
      setFormData({
        id: shippingData.id,
      });
    }
  }, [openDelete, shippingData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "Valeu_invoice" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    try {
      if (shippingData) {
        handleDeleteShipping(shippingData.id);
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
            <Label htmlFor="id" className="text-right">
              Numero
            </Label>
            <Input
              id="id"
              value={formData.id}
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
