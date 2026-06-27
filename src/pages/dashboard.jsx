/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { useGetLatestCallsQuery } from "@/services/callApi";
import { useGetCallsQuery } from "@/services/callApi";

import data from "@/data/data.json"
import { CityCostChart } from "@/components/city-cost-chart-wrapper"
import { columns } from "@/components/columns"

export default function Dashboard() {
    const { data: call = {}, isLoading: isLatestLoading } = useGetLatestCallsQuery();

    const [dateRange, setDateRange] = useState({
        from: null,
        to: null,
    });

    useEffect(() => {
        if (!call?.callStartTime) return;

        const callDate = new Date(call.callStartTime);

        setDateRange({
            from: callDate,
            to: callDate,
        });
    }, [call?.callStartTime]);

    // const filters = generateDateFilters(dateRange);

    const { data: calls = {}, isLoading: isCallsLoading } = useGetCallsQuery();


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
                <SiteHeader defaultDate={dateRange} onDateChange={setDateRange} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards dateRange={dateRange} />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive latestDate={dateRange} />
                            </div>
                            <div className="px-4 lg:px-6">
                                <CityCostChart latestDate={dateRange} />
                            </div>
                            <DataTable data={calls} columns={columns} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
