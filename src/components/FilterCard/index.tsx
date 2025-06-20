import { useDashboard } from "../../contexts/hooks/Dashboard";
import { FilterSearch } from "../../types";
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
  const { filterDataDash, loadFilterDashboard } = useDashboard();
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedTransportadora, setSelectedTransportadora] = useState("");
  const [selectedTransporte, setSelectedTransporte] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedUF, setSelectedUF] = useState("");
  const [dateError, setDateError] = useState("");

  const validateDates = () => {
    if ((startDate && !endDate) || (!startDate && endDate)) {
      setDateError("Ambas as datas (inicial e final) devem ser preenchidas.");
      return false;
    }
    if (startDate && endDate && startDate > endDate) {
      setDateError("A data inicial não pode ser maior que a data final.");
      return false;
    }
    setDateError("");
    return true;
  };

  const handleClearFilters = async () => {
    setStartDate("");
    setEndDate("");
    setSelectedMonth("");
    setSelectedCategory("");
    setSelectedModal("");
    setSelectedTransportadora("");
    setSelectedTransporte("");
    setSelectedStatus("");
    setSelectedCity("");
    setSelectedUF("");
    setDateError("");

    await loadFilterDashboard();
  };

  const handleApplyFilters = async () => {
    if (!validateDates()) {
      return;
    }

    const filters: FilterSearch = {
      dateStart: startDate,
      dateEnd: endDate,
      month: selectedMonth,
      category: selectedCategory,
      transport_mode: selectedModal,
      transport_mode_carrier: selectedTransportadora,
      transportEnd: selectedTransporte,
      status: selectedStatus,
      city: selectedCity,
      uf: selectedUF,
    };

    await loadFilterDashboard(filters);

    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="sm"
          onClick={() => setOpen(true)}
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
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mês</SelectLabel>
                  {filterDataDash?.month &&
                    filterDataDash.month.map((months) => (
                      <SelectItem value={months}>{months}</SelectItem>
                    ))}
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
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setDateError("");
                }}
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
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setDateError("");
                }}
                className="h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors"
                required
              />
            </div>
          </div>
          {dateError && (
            <div className="text-red-500 text-xs mt-1 px-2">{dateError}</div>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Categoria
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  {filterDataDash?.category &&
                    filterDataDash.category.map((categorys) => (
                      <SelectItem value={categorys}>{categorys}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Modal</Label>
            <Select value={selectedModal} onValueChange={setSelectedModal}>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todos os modais" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Modal</SelectLabel>
                  {filterDataDash?.transport_mode &&
                    filterDataDash.transport_mode.map((transport_modes) => (
                      <SelectItem value={transport_modes}>
                        {transport_modes}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Transportadora
            </Label>
            <Select
              value={selectedTransportadora}
              onValueChange={setSelectedTransportadora}
            >
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todas as transportadoras" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transportadora</SelectLabel>
                  {filterDataDash?.carrier &&
                    filterDataDash.carrier.map((carriers) => (
                      <SelectItem value={carriers}>{carriers}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Transporte
            </Label>
            <Select
              value={selectedTransporte}
              onValueChange={setSelectedTransporte}
            >
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transporte</SelectLabel>
                  {filterDataDash?.transport &&
                    filterDataDash.transport.map((transports) => (
                      <SelectItem value={transports}>{transports}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Status
            </Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {filterDataDash?.status &&
                    filterDataDash.status.map((statuss) => (
                      <SelectItem value={statuss}>{statuss}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Cidade
            </Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todas as cidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cidade</SelectLabel>
                  {filterDataDash?.city &&
                    filterDataDash.city.map((citys) => (
                      <SelectItem value={citys}>{citys}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">UF</Label>
            <Select value={selectedUF} onValueChange={setSelectedUF}>
              <SelectTrigger className="w-full h-10 text-sm border-2 border-gray-200 hover:border-neutral-950 transition-colors">
                <SelectValue placeholder="Todos os estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  {filterDataDash?.uf &&
                    filterDataDash.uf.map((ufs) => (
                      <SelectItem value={ufs}>{ufs}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="mt-6 flex gap-3 justify-end pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="h-10 px-6 text-sm font-medium border-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Limpar Filtros
          </Button>
          <Button
            type="submit"
            onClick={handleApplyFilters}
            className="h-10 px-6 text-sm font-medium bg-neutral-950 hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Aplicar Filtros
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
