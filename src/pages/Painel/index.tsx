import React, { useEffect, useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";
import { SectionCards } from "../../components/section-cards";
import { LineChartSupply } from "../../components/chart-area-interactive";
import { Siren } from "lucide-react";
import { useShipment } from "../../contexts/hooks/Shipment";
import { ModalDisplayPendingShipping } from "../../components/ModalDisplayPendingShipping";

export default function Painel() {
  const { loadInvoicePendingShipping, lighthouse } = useShipment();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadInvoicePendingShipping();
  }, []);

  const handleDisplay = () => {
    setOpen(true);
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-row px-2 lg:px-6 mt-2">
                <span className="ml-2">Farol</span>

                <Siren
                  className={`ml-2 cursor-pointer text-${lighthouse}-600`}
                  onClick={handleDisplay}
                />
              </div>

              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <LineChartSupply />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      {open && <ModalDisplayPendingShipping open={open} setOpen={setOpen} />}
    </>
  );
}
