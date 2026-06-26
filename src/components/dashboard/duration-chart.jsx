/* eslint-disable no-unused-vars */
import React from 'react';
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const DurationChart = ({ data }) => {
    if (!data.length) return null;


    const maxCall = Math.max(...data.map(call => call.callDuration));
    const minCall = Math.min(...data.map(call => call.callDuration));
    const avgCall = Math.round(data.reduce((acc, call) => acc + Number(call.callDuration), 0) / (data.length === 0 ? 1 : data.length));

    const chartConfig = {
        duration: {
            label: "Duration",
            color: "var(--chart-1)",
        },
    }

    const chartData = [
        { metric: "Longest Call", value: maxCall },
        { metric: "Shortest Call", value: minCall, },
        { metric: "Avg Duration", value: avgCall },
    ]

    return (
        <div className='flex-1 p-2 border-1 border-border rounded-lg'>
            <ChartContainer config={chartConfig} className="h-[100px] w-full">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    layout="vertical"
                    barSize={20}
                    barCategoryGap={5}
                    margin={{
                        left: -20,
                    }}>
                    <YAxis
                        dataKey="metric"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <XAxis type="number" dataKey="value" hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill='var(--chart-1)' radius={0} />

                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default DurationChart;