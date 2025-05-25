import React, { FormEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Label } from "../../components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar";

import { Button } from "../../components/ui/button";
import { useShipment } from "../../contexts/hooks/Shipment";
import { toast } from "react-toastify";
import { SearchDto } from "../../types";
import { AppSidebar } from "../../components/app-sidebar";
import { SiteHeader } from "../../components/site-header";
import { ShipmentCreateTable } from "../../components/ShipmentCreateTable";
import { useShipping } from "../../contexts/hooks/Shipping";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../../contexts/hooks/Loanding";

export function ShippingInvoice({ ...props }: React.ComponentProps<"form">) {
  const { searchInvoiceShipping } = useShipment();
  const { shippingData, handleFindIdShipping } = useShipping();
  const { isLoadingFetch, isLoadingContext } = useLoading();

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SearchDto>({
    searchData: "",
  });

  const [hasTriedLoad, setHasTriedLoad] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      await handleFindIdShipping(Number(id));
      setHasTriedLoad(true);
    };

    fetch();
  }, [id, handleFindIdShipping, isLoadingContext]);

  useEffect(() => {
    if (hasTriedLoad && !isLoadingFetch && !shippingData) {
      navigate("/romaneio");
    }
  }, [hasTriedLoad, isLoadingFetch, shippingData, navigate]);

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
      await searchInvoiceShipping(formData, Number(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleManifest = () => {
    navigate("/romaneio");
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <form {...props} onSubmit={handleSearch}>
          <SidebarGroup className="py-1">
            <span className="ml-2 block text-center font-bold mb-1">
              Adicionar nota fiscal para Romaneio nº {id}
            </span>
            <SidebarGroupContent className="relative flex flex-col sm:flex-row max-w-lg items-center gap-2 sm:gap-4 sm:space-x-4 px-2 sm:px-0 sm:ml-2">
              <Label htmlFor="searchData" className="sr-only">
                Search
              </Label>
              <div className="relative w-full sm:w-auto">
                <SidebarInput
                  id="searchData"
                  name="searchData"
                  type="text"
                  value={formData.searchData}
                  onChange={handleChange}
                  placeholder="Procurar... ST, Fornecimento e Nota Fiscal"
                  className="pl-8 w-full sm:w-auto"
                />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
              </div>
              <div className="flex flex-row items-center ">
                <Button type="submit" className="cursor-pointer">
                  Adicionar
                </Button>
                <Button
                  type="button"
                  onClick={handleManifest}
                  className="cursor-pointer ml-1 bg-green-600 hover:bg-green-700"
                >
                  Finalizar
                </Button>
                {shippingData?.shipmentShipping &&
                  shippingData.shipmentShipping?.length > 0 && (
                    <span className="ml-2 block text-center mt-2">
                      Total: {shippingData.shipmentShipping.length}
                    </span>
                  )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
        <div className="px-4 lg:px-6">
          <ShipmentCreateTable id={Number(id)} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
