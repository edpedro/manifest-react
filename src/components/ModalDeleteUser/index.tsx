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
import { useUsers } from "../../contexts/hooks/User";

interface UserDeleteDto {
  first_name: string;
  email: string;
}

interface UIPropsModal {
  setOpenDelete: (value: boolean) => void;
  openDelete: boolean;
  idDelete: string;
}

export function ModalDeleteUser({ openDelete, setOpenDelete }: UIPropsModal) {
  const { userFindData, deleteUser } = useUsers();

  const [formData, setFormData] = useState<UserDeleteDto>({
    first_name: "",
    email: "",
  });

  useEffect(() => {
    if (openDelete && userFindData) {
      setFormData({
        first_name: userFindData.first_name,
        email: userFindData.email,
      });
    }
  }, [openDelete, userFindData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (userFindData) {
      deleteUser(userFindData.id);
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
            <Label htmlFor="first_name" className="text-right">
              Nome
            </Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="col-span-3"
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={formData.email}
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
