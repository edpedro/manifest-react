import React, { useEffect, useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";
import { useShipment } from "../../contexts/hooks/Shipment";
import { ModalDisplayPendingShipping } from "../../components/ModalDisplayPendingShipping";
import { LighthouseStatus } from "../../components/Farol/LighthouseStatus";
import { Status } from "../../types";
import { FilterCard } from "../../components/FilterCard";
import { SectionCardDash } from "../../components/SectionCardDash";
import { BarUFChats } from "../../components/Dashboard/BarUFCharts";
import { AreInvoiceCharts } from "../../components/Dashboard/AreInvoiceCharts";
import { PieCategoryCharts } from "../../components/Dashboard/PieCategoryCharts";
import { BarCityCharts } from "../../components/Dashboard/BarCityCharts";
import { BarTransporteCharts } from "../../components/Dashboard/BarTransporteCharts";
import { LineHighLowCharts } from "../../components/Dashboard/LineHighLowCharts";
import { SectionDriverPendingInvoices } from "../../components/Dashboard/SectionDriverPendingInvoices";
import { BillingTranspCharts } from "../../components/Dashboard/BillingTranspCharts";
import { useDashboard } from "../../contexts/hooks/Dashboard";
import { PieModalCharts } from "../../components/Dashboard/PieModalCharts";

export default function Dashboard() {
  const { loadInvoicePendingShipping, lighthouse, invoicePendingData } =
    useShipment();
  const { loadFilterDashboard, loadFilterData } = useDashboard();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadInvoicePendingShipping();
    loadFilterDashboard();
    loadFilterData();
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
            <div className="@container/main flex flex-1 flex-col space-y-6 pb-6">
              {/* Lighthouse Status */}
              <div className="flex flex-row px-2 ml-2 lg:ml-0 lg:px-6 pt-3">
                {invoicePendingData && invoicePendingData.length > 0 ? (
                  <LighthouseStatus
                    status={lighthouse as Status}
                    onClick={handleDisplay}
                  />
                ) : (
                  <LighthouseStatus status="gray" onClick={handleDisplay} />
                )}
              </div>

              {/* Filter Card - Posicionamento fixo */}
              <div className="relative h-0">
                <div className="fixed right-6 top-19 -translate-y-1/2 z-50">
                  <FilterCard />
                </div>
              </div>

              {/* Section Cards Dashboard */}
              <div className="px-2 lg:px-4">
                <SectionCardDash />
              </div>

              {/* Area Charts + Pie Chart */}
              <div className="px-2 lg:px-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="w-full lg:w-2/3">
                    <AreInvoiceCharts />
                  </div>
                  <div className="w-full lg:w-1/3">
                    <PieCategoryCharts />
                  </div>
                </div>
              </div>

              {/* Bar Charts Grid */}
              <div className="px-2 lg:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <div className="w-full h-full">
                    <BarUFChats />
                  </div>
                  <div className="w-full h-full">
                    <BarCityCharts />
                  </div>
                  <div className="w-full h-full">
                    <BarTransporteCharts />
                  </div>
                </div>
              </div>

              {/* Seção inferior - 3 componentes em grade responsiva */}
              <div className="px-2 lg:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
                  <div className="w-full">
                    <SectionDriverPendingInvoices />
                  </div>
                </div>
              </div>
              <div className="px-2 lg:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
                  <div className="w-full h-full">
                    <LineHighLowCharts />
                  </div>

                  <div className="w-full h-full">
                    <PieModalCharts />
                  </div>

                  <div className="w-full h-full">
                    <BillingTranspCharts />
                  </div>
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
