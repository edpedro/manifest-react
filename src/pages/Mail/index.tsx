import React, { useEffect, useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/site-header";
import { CirclePlus } from "lucide-react";
import { Button } from "../../components/ui/button";

import { useLoading } from "../../contexts/hooks/Loanding";
import { ModalCreateMail } from "../../components/ModalCreateMail";
import { MailTable } from "../../components/MailTable";
import { useMail } from "../../contexts/hooks/Mail";

export default function Mail() {
  const { loadMail } = useMail();
  const { isLoadingContext } = useLoading();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadMail();
  }, [isLoadingContext]);

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
                <span className="truncate font-medium">Cadastrar Email</span>
                <Button
                  type="submit"
                  className="cursor-pointer ml-3 h-7"
                  onClick={handleCreate}
                >
                  <CirclePlus />
                </Button>
              </div>

              <div className="px-4 lg:px-6">
                <MailTable />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {open && <ModalCreateMail open={open} setOpen={setOpen} />}
    </>
  );
}
