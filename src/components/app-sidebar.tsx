"use client";

import * as React from "react";
import {
  CameraIcon,
  DatabaseIcon,
  FileCodeIcon,
  ListIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SearchIcon,
  PieChart,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useAuth } from "../contexts/hooks/Auth";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Pesquisar",
      url: "/search",
      icon: SearchIcon,
    },
    {
      title: "Importar Pedidos",
      url: "/import",
      icon: DatabaseIcon,
    },
    {
      title: "Atualizar Expedição",
      url: "/expedition",
      icon: PieChart,
    },
    {
      title: "Relatório",
      url: "/export",
      icon: ListIcon,
    },
    {
      title: "Romaneio",
      url: "/romaneio",
      icon: FileText,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { authData } = useAuth();
  const filteredItems = data.navMain.filter((item) => {
    if (authData?.type === "driver") {
      // driver NÃO pode ver essas rotas
      const blockedRoutes = ["/", "/import", "/expedition", "/export"];
      return !blockedRoutes.includes(item.url);
    }

    // user pode ver tudo
    return true;
  });
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
