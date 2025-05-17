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
import { FinishManifestDto } from "../../types";
import { useShipping } from "../../contexts/hooks/Shipping";
import { toast } from "react-toastify";

interface UIPropsModal {
  setOpenFinish: (value: boolean) => void;
  openFinish: boolean;
  idFinish: number;
}

export function ModalFinishShipping({
  openFinish,
  setOpenFinish,
  idFinish,
}: UIPropsModal) {
  const { handleFinishShipping, shippingData } = useShipping();
  const [formData, setFormData] = useState<FinishManifestDto>({
    dispatch_date: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Campo obrigatório";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formatEnvioDate = (date: string): string => {
      const d = new Date(date);
      return d.toISOString();
    };

    const time = formData.dispatch_date.split("T")[1];

    const data: FinishManifestDto = {
      dispatch_date: formatEnvioDate(formData.dispatch_date),
      dispatch_time: time,
    };

    if (shippingData && shippingData?.shipmentShipping.length > 0) {
      handleFinishShipping(idFinish, data);
    } else {
      toast.error("Romaneio sem nota fiscal");
    }

    setOpenFinish(false);
  };

  return (
    <Dialog open={openFinish} onOpenChange={setOpenFinish}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cdastrar Romaneio</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="dispatch_date" className="mb-1">
              Data da coleta
            </Label>
            <Input
              id="dispatch_date"
              type="datetime-local"
              value={formData.dispatch_date}
              onChange={handleChange}
              autoComplete="off"
              className={errors.dispatch_date ? "border-red-500" : ""}
            />
            {errors.dispatch_date && (
              <p className="text-red-500 text-sm">{errors.dispatch_date}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit} className="cursor-pointer">
            finalizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
