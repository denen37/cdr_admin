import React, {useState, useEffect}  from 'react'
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { CityCostChart } from "@/components/city-cost-chart-wrapper"
import { SiteHeader } from "@/components/site-header"
import { useGetLatestCallsQuery } from "@/services/callApi";
import { columns } from "@/components/columns"

export const Analytics = () => {
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
    return (
        <>
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
                            <DataTable columns={columns} />
                        </div>
                    </div>
                </div>
            </>
    )
}