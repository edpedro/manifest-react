import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ModalUpdate } from "../ModalUpdate";
import { ModalDelete } from "../ModalDelete";

const invoices = [
  {
    id: 3,
    st: "514710",
    supply: "8759420544",
    invoice_number: "1760001",
    invoice_issue_date: "2025-04-08T03",
    destination: "FORTALEZA",
    carrier: "SAMSUNG",
    transport_mode: "RODOVIÁRIO",
    Valeu_invoice: 1,
    category: "MKT",
    status: "Pendente",
    user: "Eduardo",
  },
  {
    id: 2,
    st: "514710",
    supply: "8759420560",
    invoice_number: "1760000",
    invoice_issue_date: "2025-04-08T03",
    destination: "FORTALEZA",
    carrier: "SAMSUNG",
    transport_mode: "RODOVIÁRIO",
    Valeu_invoice: 1425.65,
    category: "FIXA",
    status: "Pendente",
    user: "Eduardo",
  },
  {
    id: 1,
    st: "514710",
    supply: "8759420565",
    invoice_number: "1759999",
    invoice_issue_date: "2025-04-08T03",
    destination: "Eduardo",
    carrier: "SAMSUNG",
    transport_mode: "RODOVIÁRIO",
    Valeu_invoice: 1484,
    category: "FIXA",
    status: "Pendente",
    user: "Eduardo",
  },
  {
    id: 4,
    st: "514711",
    supply: "8759420578",
    invoice_number: "1759999",
    invoice_issue_date: "2025-04-08T03",
    destination: "FORTALEZA",
    carrier: "SAMSUNG",
    transport_mode: "RODOVIÁRIO",
    Valeu_invoice: 1484,
    category: "FIXA",
    status: "Pendente",
    user: "Eduardo",
  },
  {
    id: 5,
    st: "514711",
    supply: "8759420580",
    invoice_number: "1760000",
    invoice_issue_date: "2025-04-08T03",
    destination: "FORTALEZA",
    carrier: "SAMSUNG",
    transport_mode: "RODOVIÁRIO",
    Valeu_invoice: 1425.65,
    category: "FIXA",
    status: "Pendente",
    user: "Eduardo",
  },
  {
    id: 7,
    st: "514714",
    supply: "8759420509",
    invoice_number: "1760001",
    invoice_issue_date: "2025-04-08T03",
    destination: "FORTALEZA",
    carrier: "SAMSUNG",
    transport_mode: "RODOVIÁRIO",
    Valeu_invoice: 1,
    category: "MKT",
    status: "Pendente",
    user: "Eduardo",
  },
  {
    id: 8,
    st: "514714",
    supply: "8759420511",
    invoice_number: "1760001",
    invoice_issue_date: "2025-04-08T03",
    destination: "FORTALEZA",
    carrier: "SAMSUNG",
    transport_mode: "RODOVIÁRIO",
    Valeu_invoice: 1,
    category: "MKT",
    status: "Pendente",
    user: "Eduardo",
  },
  {
    id: 6,
    st: "514714",
    supply: "8759420570",
    invoice_number: "1760001",
    invoice_issue_date: "2025-04-08T03",
    destination: "FORTALEZA",
    carrier: "SAMSUNG",
    transport_mode: "RODOVIÁRIO",
    Valeu_invoice: 1,
    category: "MKT",
    status: "Pendente",
    user: "Eduardo",
  },
];

export function ShipmentTable() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState<string>("");

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const handleEdit = (id) => {
    setOpenUpdate(true);
    setIdUpdate(id);
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    setIdDelete(id);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ST</TableHead>
            <TableHead>Fornecimento</TableHead>
            <TableHead>NF</TableHead>
            <TableHead>Data NF</TableHead>
            <TableHead>Destino</TableHead>
            <TableHead>Transportadora</TableHead>
            <TableHead>Modal</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            // Definir a classe de fundo para o status
            let statusClass = "";
            if (invoice.status === "Pendente") {
              statusClass = "bg-yellow-300"; // Amarelo claro
            } else if (invoice.status === "Concluído") {
              statusClass = "bg-green-200"; // Verde claro
            } else {
              statusClass = "bg-gray-200"; // Cor padrão para outros status
            }

            return (
              <TableRow key={invoice.supply}>
                <TableCell>{invoice.st}</TableCell>
                <TableCell>{invoice.supply}</TableCell>
                <TableCell>{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.invoice_issue_date}</TableCell>
                <TableCell>{invoice.destination}</TableCell>
                <TableCell>{invoice.carrier}</TableCell>
                <TableCell>{invoice.transport_mode}</TableCell>
                <TableCell>{invoice.Valeu_invoice}</TableCell>
                <TableCell>{invoice.category}</TableCell>
                <TableCell className={`p-2 ${statusClass}`}>
                  {invoice.status}
                </TableCell>
                <TableCell>{invoice.user}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleEdit(invoice.id)}
                  >
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {openUpdate && (
        <ModalUpdate
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          idUpdate={idUpdate}
        />
      )}
      {openDelete && (
        <ModalDelete
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          idDelete={idDelete}
        />
      )}
    </>
  );
}
