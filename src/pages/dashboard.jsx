/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {Analytics} from '@/pages/analytics'
import {data} from '@/components/app-sidebar'


export default function Dashboard() {

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                }
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
               
            </SidebarInset>
        </SidebarProvider>
    )
}
