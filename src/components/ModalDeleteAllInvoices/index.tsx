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

interface UIPropsModal {
  setOpen: (value: boolean) => void;
  open: boolean;
  idDelete: number;
}

export function ModalDeleteAllInvoice({
  open,
  setOpen,
  idDelete,
}: UIPropsModal) {
  const { shippingData, handleDeleteAllManifestShipping } = useShipping();

  const handleSubmit = () => {
    try {
      if (shippingData) {
        handleDeleteAllManifestShipping(idDelete);
      }
    } catch (error) {
      // Mantém os campos preenchidos em caso de erro para o usuário corrigir
      console.error("Erro no login:", error);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              Romaneio
            </Label>
            <Input
              id="st"
              value={`Nº ${idDelete}`}
              className="col-span-3"
              disabled={true}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
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
