import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Filter } from "lucide-react";
import { useState } from "react";

export function FilterCard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="
            bg-neutral-950 
            hover:bg-neutral-800 
            text-white font-medium 
            px-3 py-1.5 
            h-6
            rounded-md 
            shadow-md hover:shadow-lg 
            transition-all duration-200 
            border-0
            flex items-center gap-1.5
            text-xs
            relative
            group
            cursor-pointer
          "
        >
          <Filter className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-200" />
          <span className="font-medium">Filtros</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[280px] sm:w-[350px]">
        <SheetHeader className="space-y-3">
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-950" />
            Filtros Avançados
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Personalize e refine os dados exibidos no seu dashboard com filtros
            específicos.
          </SheetDescription>
        </SheetHeader>

        <div className="p-2 overflow-y-auto max-h-[calc(100vh-12rem)] py-4 space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="month-select"
              className="text-sm font-semibold text-gray-700"
            >
              Período - Mês
            </Label>
            <Select>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mês</SelectLabel>
                  <SelectItem value="janeiro">Janeiro</SelectItem>
                  <SelectItem value="fevereiro">Fevereiro</SelectItem>
                  <SelectItem value="marco">Março</SelectItem>
                  <SelectItem value="abril">Abril</SelectItem>
                  <SelectItem value="maio">Maio</SelectItem>
                  <SelectItem value="junho">Junho</SelectItem>
                  <SelectItem value="julho">Julho</SelectItem>
                  <SelectItem value="agosto">Agosto</SelectItem>
                  <SelectItem value="setembro">Setembro</SelectItem>
                  <SelectItem value="outubro">Outubro</SelectItem>
                  <SelectItem value="novembro">Novembro</SelectItem>
                  <SelectItem value="dezembro">Dezembro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label
                htmlFor="start-date"
                className="text-sm font-semibold text-gray-700"
              >
                Data Inicial
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="end-date"
                className="text-sm font-semibold text-gray-700"
              >
                Data Final
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Categoria
            </Label>
            <Select>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  <SelectItem value="categoria1">Categoria 1</SelectItem>
                  <SelectItem value="categoria2">Categoria 2</SelectItem>
                  <SelectItem value="categoria3">Categoria 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Modal</Label>
            <Select>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todos os modais" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Modal</SelectLabel>
                  <SelectItem value="modal1">Modal 1</SelectItem>
                  <SelectItem value="modal2">Modal 2</SelectItem>
                  <SelectItem value="modal3">Modal 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Transportadora
            </Label>
            <Select>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todas as transportadoras" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transportadora</SelectLabel>
                  <SelectItem value="transp1">Transportadora 1</SelectItem>
                  <SelectItem value="transp2">Transportadora 2</SelectItem>
                  <SelectItem value="transp3">Transportadora 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Transporte
            </Label>
            <Select>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transporte</SelectLabel>
                  <SelectItem value="transporte1">Transporte 1</SelectItem>
                  <SelectItem value="transporte2">Transporte 2</SelectItem>
                  <SelectItem value="transporte3">Transporte 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Status
            </Label>
            <Select>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="mt-6 flex gap-3 justify-end pt-4 border-t">
          <Button
            variant="outline"
            className="h-10 px-6 text-sm font-medium border-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Limpar Filtros
          </Button>
          <Button
            type="submit"
            className="h-10 px-6 text-sm font-medium bg-neutral-950 hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Aplicar Filtros
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
