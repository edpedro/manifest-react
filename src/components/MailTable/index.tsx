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
import { useMail } from "../../contexts/hooks/Mail";
import { ModalCreateMail } from "../ModalCreateMail";
import { ModalDeleteMail } from "../ModalDeleteMail";

export function MailTable() {
  const { mailAllData, handleFindIdMail } = useMail();

  const [open, setOpen] = useState(false);

  const [idUpdate, setIdUpdate] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const handleEdit = (id) => {
    setOpen(true);
    handleFindIdMail(id);
    setIdUpdate(id);
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    handleFindIdMail(id);
    setIdDelete(id);
  };
  return (
    <>
      {mailAllData && mailAllData.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mailAllData.map((invoice) => {
                return (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.name}</TableCell>
                    <TableCell>{invoice.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                          onClick={() => handleEdit(invoice.id)}
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                          <span className="text-xs">Editar</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 px-2 py-1 cursor-pointer"
                          onClick={() => handleDelete(invoice.id)}
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
            <ModalDeleteMail
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              idDelete={idDelete}
            />
          )}

          {open && (
            <ModalCreateMail
              open={open}
              setOpen={setOpen}
              idUpdate={idUpdate}
            />
          )}
        </>
      )}
    </>
  );
}
