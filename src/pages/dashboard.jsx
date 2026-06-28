/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {Analytics} from '@/pages/analytics'
import {navData} from '@/components/nav-data'


export default function Dashboard() {
    const [navId, setNavId] = useState(1);
  
    const currentPage = navData.navMain.find(item => item.id === navId);
    const CurrentPage = currentPage?.page;
  
    return (
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar
          variant="inset"
          navId={navId}
          setNavId={setNavId}
        />
  
        <SidebarInset>
            {CurrentPage && <CurrentPage />}
        </SidebarInset>
      </SidebarProvider>
    );
  }