/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { formatCost } from "@/lib/utils"

export const CostChart = ({ data }) => {
    const chartConfig = {
        cost: {
            label: "Cost",
            color: "var(--chart-1)",
        },
    }

    const chartData = []

    data?.forEach(item => {
        const city = item.city
        const cost = item.callCost

        const existingCity = chartData.find(cityData => cityData.city === city)

        if (existingCity) {
            existingCity.cost += cost
        } else {
            chartData.push({ city, cost })
        }
    });



    // useEffect(() => {
    //     console.log(chartData)
    // }, [chartData])

    // const avgCost = Math.round(chartData.reduce((acc, cur) => acc + Number(cur.cost), 0) /
    //     (chartData.length === 0 ? 1 : chartData.length))

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
                        dataKey="cost"
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
                    <ChartTooltip
                        content={<ChartTooltipContent
                            labelFormatter={(value) => formatCost(value)}
                            indicator="dot"
                        />}
                    />
                    <Bar dataKey="cost" /*fill='var(--chart-1)'*/ radius={0} fill="url(#fillMobile)" />
                </BarChart>
            </ChartContainer>
            {/* <div className='mt-1 flex items-center justify-end'>
                <div className='flex items-center gap-2 text-text-secondary'>
                    <AiOutlineBarChart />
                    <p className='text-sm'>Average: {formatCost(avgCost)}</p>
                </div>
            </div> */}
        </>
    );
}