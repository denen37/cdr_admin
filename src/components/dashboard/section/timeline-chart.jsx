/* eslint-disable no-unused-vars */
import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { data } from '@/utils/filters';


const TimelineChart = ({ data }) => {

    if (!data.length) return null;

    const numCallsPerHour = data.reduce((acc, call) => {
        const hour = new Date(call.callStartTime).getHours();
        acc[hour.toString()] = (acc[hour.toString()] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(numCallsPerHour).map(
        ([hour, numCalls]) => ({
            hour: hour,
            calls: numCalls,
        })
    )

    const sortedData = chartData.sort((a, b) => Number(a.hour) - Number(b.hour));



    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
        },
    }

    return (
        <section className=''>
            <div className='p-4 border-1 border-border rounded-lg'>
                <div className='px-5 flex items-center justify-between'>
                    <p className='text-text-secondary text-sm'>Calls per hour</p>

                </div>
                <ChartContainer config={chartConfig} className="h-[250px] w-full mt-4">
                    <AreaChart
                        accessibilityLayer
                        data={sortedData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="hour"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="calls"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </div>
        </section>
    );
};

export default TimelineChart;