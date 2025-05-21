import React, { useEffect } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";
import { useLoading } from "../../contexts/hooks/Loanding";
import { useUsers } from "../../contexts/hooks/User";
import { UserTable } from "../../components/UserTable";

export default function User() {
  const { listAllUserData } = useUsers();
  const { isLoadingContext } = useLoading();

  useEffect(() => {
    listAllUserData();
  }, [isLoadingContext]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-row ">
            <div className="@container/main flex flex-1  flex-col gap-2">
              <div className="px-4 lg:px-6">
                <UserTable />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
