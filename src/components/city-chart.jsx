/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const CityChart = ({ data }) => {

    const chartConfig = {
        number: {
            label: "Num of calls",
            color: "var(--chart-1)",
        },
    }

    const cityCounts = data.reduce((acc, call) => {
        acc[call.city] = (acc[call.city] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(cityCounts).map(
        ([city, number]) => ({
            city,
            number,
        })
    );

    // const avgCalls = Math.round(chartData.reduce((acc, cur) => acc + cur.number, 0) /
    //     (chartData.length === 0 ? 1 : chartData.length));

    return (
        <>
            <ChartContainer config={chartConfig} className="h-[300px] w-full mt-4">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    barSize={20}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                        bottom: 80,
                    }}
                >
                    <YAxis
                        dataKey="number"
                        type="number"
                        hide
                    />
                    <XAxis
                        dataKey="city"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        angle={-45}
                        textAnchor="end"
                    />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="number" /*fill='var(--chart-1)'*/ radius={0} fill="url(#fillMobile)" />
                </BarChart>
            </ChartContainer>
            {/* <div className='mt-1 flex items-center justify-end'>
                <div className='flex items-center gap-2 text-text-secondary'>
                    <AiOutlineBarChart />
                    <p className='text-sm'>Average: {avgCalls}</p>
                </div>
            </div> */}
        </>
    )
}