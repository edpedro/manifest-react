import React from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";

import { ShipmentTable } from "../../components/ShipmentTable";
import { SearchForm } from "../../components/SearchForm";
import { useShipment } from "../../contexts/hooks/Shipment";

export default function Search() {
  const { searchData } = useShipment();
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="flex flex-row">
                <SearchForm />
                {searchData && searchData?.length > 0 && (
                  <span className="ml-2 block text-center mt-2">
                    Total de NFs {searchData?.length}
                  </span>
                )}
              </div>

              <div className="px-4 lg:px-6">
                <ShipmentTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
