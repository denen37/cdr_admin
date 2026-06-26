/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useIsMobile } from "@/hooks/use-mobile"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { CityChart } from './city-chart'
import { CostChart } from './cost-chart'
import { dateFilterQuery } from '@/lib/utils'
import { useGetCityCostQuery } from '@/services/callApi'

export const CityCostChart = ({ latestDate }) => {
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState("0d")
    const [metric, setMetric] = useState("cost")

    useEffect(() => {
        if (isMobile) {
            setTimeRange("0d")
        }
    }, [isMobile])

    const filterQueryString = dateFilterQuery(latestDate, timeRange)

    const { data: cityCostData = [], isLoading: isCityCostLoading } = useGetCityCostQuery(filterQueryString, {
        skip: !filterQueryString,
    });

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>City Analysis</CardTitle>
                <CardDescription>
                    <ToggleGroup
                        type="single"
                        value={metric}
                        onValueChange={setMetric}
                        variant="outline"
                        className="flex *:data-[slot=toggle-group-item]:px-4! gap-0">
                        <ToggleGroupItem value="cost" className='rounded-e-none border-e-0'>Cost</ToggleGroupItem>
                        <ToggleGroupItem value="number" className='rounded-s-none'>Amount of Calls</ToggleGroupItem>
                    </ToggleGroup>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex">
                        <ToggleGroupItem value="0d">Today</ToggleGroupItem>
                        <ToggleGroupItem value="1d">Last 2 days</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                        <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
                        <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value">
                            <SelectValue placeholder="Today" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="0d" className="rounded-lg">
                                Today
                            </SelectItem>
                            <SelectItem value="1d" className="rounded-lg">
                                Last 2 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {
                    metric === 'cost' ? <CostChart data={cityCostData} /> : <CityChart data={cityCostData} />
                }
            </CardContent>
        </Card>
    )
}