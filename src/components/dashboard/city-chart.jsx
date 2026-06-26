/* eslint-disable no-unused-vars */
import React from 'react';
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AiOutlineBarChart } from "react-icons/ai";
import { data } from '@/utils/filters';

const CityChart = ({ data }) => {
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

    const avgCalls = Math.round(chartData.reduce((acc, cur) => acc + cur.number, 0) /
        (chartData.length === 0 ? 1 : chartData.length))

    return (
        <div>
            <ChartContainer config={chartConfig} className="h-[200px] w-full mt-4">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    barSize={20}
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
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="number" fill='var(--chart-1)' radius={0} />
                </BarChart>
            </ChartContainer>
            <div className='mt-1 flex items-center justify-end'>
                <div className='flex items-center gap-2 text-text-secondary'>
                    <AiOutlineBarChart />
                    <p className='text-sm'>Average: {avgCalls}</p>
                </div>
            </div>
        </div>
    );
};

export default CityChart;