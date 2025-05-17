import React, { useEffect, useState } from "react";
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

import { useShipping } from "../../contexts/hooks/Shipping";
import { CreateShippingDto } from "../../types";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

interface ShippingData {
  name: string;
  cpf: string;
  placa: string;
  dispatch_date: string;
  transport: string;
  estimatedArrival: string;
}

interface UIPropsModal {
  setOpen: (value: boolean) => void;
  open: boolean;
  idUpdate?: number;
}

export function ModalCreateShipping({ open, setOpen, idUpdate }: UIPropsModal) {
  const {
    handleCreateShipping,
    handleUdpateShipping,
    shippingAllData,
    shippingData,
  } = useShipping();

  const [formData, setFormData] = useState<ShippingData>({
    name: "",
    cpf: "",
    placa: "",
    dispatch_date: "",
    transport: "",
    estimatedArrival: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (idUpdate && shippingData) {
      setFormData({
        name: shippingData.name?.toUpperCase() || "",
        cpf: formatCpf(shippingData.cpf || ""),
        placa: shippingData.placa?.toUpperCase() || "",
        dispatch_date: formatDate(shippingData.dispatch_date) || "",
        transport: shippingData.transport?.toUpperCase() || "",
        estimatedArrival: shippingData.estimatedArrival || "",
      });
    }
  }, [idUpdate, shippingData]);

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

  const formatCpf = (cpf: string) => {
    const digits = cpf.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
      6,
      9
    )}-${digits.slice(9, 11)}`;
  };

  const autoFillForm = (value: string, type: "cpf" | "name") => {
    const sanitizedValue =
      type === "cpf" ? value.replace(/\D/g, "") : value.trim().toLowerCase();

    const match = shippingAllData?.find((item: ShippingData) => {
      if (type === "cpf") {
        return item.cpf.replace(/\D/g, "") === sanitizedValue;
      } else {
        return item.name.trim().toLowerCase() === sanitizedValue;
      }
    });

    if (match) {
      setFormData((prev) => ({
        ...prev,
        name: match.name.toUpperCase(),
        cpf: formatCpf(match.cpf),
        placa: match.placa.toUpperCase(),
        transport: match.transport.toUpperCase(),
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let newValue = value;

    if (id === "cpf") {
      newValue = formatCpf(value);
    } else if (id === "placa") {
      newValue = value
        .replace(/[^A-Za-z0-9]/g, "")
        .toUpperCase()
        .slice(0, 7);
    } else if (id === "name" || id === "transport") {
      newValue = value.toUpperCase();
    }

    setFormData((prev) => ({ ...prev, [id]: newValue }));

    if (errors[id]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    if (id === "cpf") autoFillForm(value, "cpf");
    if (id === "name") autoFillForm(value, "name");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Campo obrigatório";
        isValid = false;
      } else {
        if (key === "name") {
          const nameParts = value.trim().split(/\s+/);
          if (nameParts.length < 2) {
            newErrors[key] = "Informe o nome completo (nome e sobrenome)";
            isValid = false;
          }
        }

        if (key === "cpf") {
          const cpfOnlyDigits = value.replace(/\D/g, "");
          if (!cpfValidator.isValid(cpfOnlyDigits)) {
            newErrors[key] = "CPF inválido";
            isValid = false;
          }
        }

        if (key === "placa") {
          const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
          if (!placaRegex.test(value.replace(/\s/g, ""))) {
            newErrors[key] = "Placa inválida (formato: AAA0000 ou AAA0A00)";
            isValid = false;
          }
        }
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

    const data: CreateShippingDto = {
      name: formData.name.toUpperCase(),
      cpf: formData.cpf.replace(/\D/g, ""),
      placa: formData.placa.toUpperCase(),
      dispatch_date: formatEnvioDate(formData.dispatch_date),
      transport: formData.transport.toUpperCase(),
      estimatedArrival: formData.estimatedArrival,
    };

    if (idUpdate && shippingData?.id) {
      handleUdpateShipping(shippingData.id, data);
    } else {
      handleCreateShipping(data);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Romaneio</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              list="name-list"
              value={formData.name}
              onChange={handleChange}
              onInput={handleInput}
              className={errors.name ? "border-red-500" : ""}
            />
            <datalist id="name-list">
              {[
                ...new Set(
                  shippingAllData?.map((item) => item.name.toUpperCase())
                ),
              ]
                .sort()
                .map((name, index) => (
                  <option key={index} value={name} />
                ))}
            </datalist>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              list="cpf-list"
              value={formData.cpf}
              onChange={handleChange}
              onInput={handleInput}
              className={errors.cpf ? "border-red-500" : ""}
            />
            <datalist id="cpf-list">
              {[...new Set(shippingAllData?.map((item) => formatCpf(item.cpf)))]
                .sort()
                .map((cpf, index) => (
                  <option key={index} value={cpf} />
                ))}
            </datalist>
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
          </div>

          <div>
            <Label htmlFor="placa">Placa</Label>
            <Input
              id="placa"
              value={formData.placa}
              onChange={handleChange}
              className={errors.placa ? "border-red-500" : ""}
            />
            {errors.placa && (
              <p className="text-red-500 text-sm">{errors.placa}</p>
            )}
          </div>

          <div>
            <Label htmlFor="dispatch_date">Data de Saída</Label>
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

          <div>
            <Label htmlFor="transport">Transportadora</Label>
            <Input
              id="transport"
              value={formData.transport}
              onChange={handleChange}
              className={errors.transport ? "border-red-500" : ""}
            />
            {errors.transport && (
              <p className="text-red-500 text-sm">{errors.transport}</p>
            )}
          </div>

          <div>
            <Label htmlFor="estimatedArrival">Previsão de Chegada</Label>
            <Input
              id="estimatedArrival"
              type="time"
              value={formData.estimatedArrival}
              onChange={handleChange}
              autoComplete="off"
              className={errors.estimatedArrival ? "border-red-500" : ""}
            />
            {errors.estimatedArrival && (
              <p className="text-red-500 text-sm">{errors.estimatedArrival}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit} className="cursor-pointer">
            {idUpdate ? "Atualizar" : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
