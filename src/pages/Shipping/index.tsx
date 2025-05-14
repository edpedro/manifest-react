import React, { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";
import { CirclePlus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ShippingTable } from "../../components/ShippingTable";
import { ModalCreateShipping } from "../../components/ModalCreateShipping";

export default function Shipping() {
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    setOpen(true);
  };
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-row ">
            <div className="@container/main flex flex-1  flex-col gap-2">
              <div className="flex flex-row p-6">
                <span className="truncate font-medium">Criar Romaneio</span>
                <Button
                  type="submit"
                  className="cursor-pointer ml-3 h-7"
                  onClick={handleCreate}
                >
                  <CirclePlus />
                </Button>
              </div>

              <div className="px-4 lg:px-6">
                <ShippingTable />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {open && <ModalCreateShipping open={open} setOpen={setOpen} />}
    </>
  );
}
