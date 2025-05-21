import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

import { Pencil, Trash2 } from "lucide-react";
import { useUsers } from "../../contexts/hooks/User";
import { ModalUpdate } from "../ModalUpdateUser";
import { ModalDeleteUser } from "../ModalDeleteUser";

export function UserTable() {
  const { listUserFindOneData, lisUserData } = useUsers();

  const [open, setOpen] = useState(false);
  const [idUpdate, setIdUpdate] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const handleEdit = (id) => {
    setOpen(true);
    listUserFindOneData(id);
    setIdUpdate(id);
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    listUserFindOneData(id);
    setIdDelete(id);
  };

  return (
    <>
      {lisUserData && lisUserData.length > 0 && (
        <>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Sobrenome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lisUserData.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      {user.type === "driver"
                        ? "Motorista"
                        : user.type === "user"
                        ? "Analista"
                        : "Administrador"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                          onClick={() => handleEdit(user.id)}
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                          <span className="text-xs">Editar</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                          <span className="text-xs">Deletar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {openDelete && (
            <ModalDeleteUser
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              idDelete={idDelete}
            />
          )}

          {open && (
            <ModalUpdate open={open} setOpen={setOpen} idUpdate={idUpdate} />
          )}
        </>
      )}
    </>
  );
}
