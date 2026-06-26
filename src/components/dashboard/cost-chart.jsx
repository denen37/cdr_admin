/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AiOutlineBarChart } from "react-icons/ai";
import { formatCost } from '@/utils/general';

const CostChart = ({ data }) => {
    const chartConfig = {
        cost: {
            label: "Cost",
            color: "var(--chart-1)",
        },
    }

    const chartData = data.map((call) => {
        return {
            city: call.city,
            cost: call.callCost
        }
    })

    const avgCost = Math.round(chartData.reduce((acc, cur) => acc + Number(cur.cost), 0) /
        (chartData.length === 0 ? 1 : chartData.length))

    return (
        <>
            <ChartContainer config={chartConfig} className="h-[200px] w-full mt-4">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    barSize={20}
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
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cost" fill='var(--chart-1)' radius={0} />
                </BarChart>
            </ChartContainer>
            <div className='mt-1 flex items-center justify-end'>
                <div className='flex items-center gap-2 text-text-secondary'>
                    <AiOutlineBarChart />
                    <p className='text-sm'>Average: {formatCost(avgCost)}</p>
                </div>
            </div>
        </>
    );
};

export default CostChart;