import React, { useEffect, useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";
import { SectionCards } from "../../components/section-cards";
import { LineChartSupply } from "../../components/chart-area-interactive";
import { useShipment } from "../../contexts/hooks/Shipment";
import { ModalDisplayPendingShipping } from "../../components/ModalDisplayPendingShipping";
import { LighthouseStatus } from "../../components/Farol/LighthouseStatus";
import { Status } from "../../types";

export default function Painel() {
  const { loadInvoicePendingShipping, lighthouse, invoicePendingData } =
    useShipment();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadInvoicePendingShipping();
  }, []);

  const handleDisplay = () => {
    if (invoicePendingData && invoicePendingData?.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-row px-2 lg:px-6 mt-3 -mb-5">
                {invoicePendingData && invoicePendingData.length > 0 ? (
                  <LighthouseStatus
                    status={lighthouse as Status}
                    onClick={handleDisplay}
                  />
                ) : (
                  <LighthouseStatus status="gray" onClick={handleDisplay} />
                )}
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
