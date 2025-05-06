import React, { FormEvent, useState } from "react";
import { Search } from "lucide-react";

import { Label } from "../../components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "../../components/ui/sidebar";

import { Button } from "../../components/ui/button";
import { useShipment } from "../../contexts/hooks/Shipment";
import { toast } from "react-toastify";
import { SearchDto } from "../../types";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const { search } = useShipment();

  const [formData, setFormData] = useState<SearchDto>({
    searchData: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.searchData) {
      toast.error("Favor preencher campo de pesquisa");
      return;
    }

    try {
      await search(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form {...props} onSubmit={handleSearch}>
      <SidebarGroup className="py-1">
        <SidebarGroupContent className="relative flex max-w-lg items-center space-x-4 ml-5">
          <Label htmlFor="searchData" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="searchData"
            name="searchData"
            type="text"
            value={formData.searchData}
            onChange={handleChange}
            placeholder="Procurar... ST, Fornecimento e Nota Fiscal"
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          <Button type="submit" className="cursor-pointer">
            Pesquisar
          </Button>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
