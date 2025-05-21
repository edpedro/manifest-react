import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUsers } from "../../contexts/hooks/User";

interface UserUpdateDto {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  type: string;
}

interface UIPropsModal {
  setOpen: (value: boolean) => void;
  open: boolean;
  idUpdate?: number;
}

export function ModalUpdate({ open, setOpen, idUpdate }: UIPropsModal) {
  const { userFindData, updateUser } = useUsers();

  const [formData, setFormData] = useState<UserUpdateDto>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    type: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (idUpdate && userFindData) {
      setFormData({
        first_name: userFindData.first_name,
        last_name: userFindData.last_name,
        email: userFindData.email,
        username: userFindData.username,
        type: userFindData.type,
      });
    }
  }, [idUpdate, userFindData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newValue = value;

    setFormData((prev) => ({ ...prev, [id]: newValue }));

    if (errors[id]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleSelectChange = (type: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: value,
    }));
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

    const data: UserUpdateDto = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      username: formData.username,
      type: formData.type,
    };

    if (idUpdate && userFindData?.id) {
      updateUser(userFindData.id, data);
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
            <Label htmlFor="first_name">Nome</Label>
            <Input
              id="first_name"
              list="name-list"
              value={formData.first_name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="last_name">Sobrenome</Label>
            <Input
              id="last_name"
              list="cpf-list"
              value={formData.last_name}
              onChange={handleChange}
              className={errors.last_name ? "border-red-500" : ""}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Analista</SelectItem>
                <SelectItem value="driver">Motorista</SelectItem>
                <SelectItem value="admin">Administrativo</SelectItem>
              </SelectContent>
            </Select>
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
