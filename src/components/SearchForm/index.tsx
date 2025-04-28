import React from "react";
import { Search } from "lucide-react";

import { Label } from "../../components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "../../components/ui/sidebar";

import { Button } from "../../components/ui/button";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup className="py-1">
        <SidebarGroupContent className="relative flex max-w-lg items-center space-x-4 ml-5">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Procurar... ST, Fornecimento e Nota fsical"
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          <Button type="submit">Pesquisar</Button>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
