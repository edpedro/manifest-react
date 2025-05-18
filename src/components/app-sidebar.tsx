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
  Mail,
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
      title: "Romaneio",
      url: "/romaneio",
      icon: FileText,
    },
    {
      title: "Pesquisar",
      url: "/search",
      icon: SearchIcon,
    },
    {
      title: "Relatório",
      url: "/export",
      icon: ListIcon,
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
      title: "Cadastrar Email",
      url: "/mail",
      icon: Mail,
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
    const role = authData?.type;

    if (role === "driver") {
      const allowedRoutes = ["/romaneio", "/search"];
      return allowedRoutes.includes(item.url);
    }

    if (role === "user") {
      return item.url !== "/mail";
    }

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
