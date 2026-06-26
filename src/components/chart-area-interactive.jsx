/* eslint-disable no-unused-vars */
"use client"

import React, { useEffect } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
import { subDays, format } from "date-fns"
import { generateDateFilters } from "@/lib/utils"
import { useGetStartTimesQuery } from "@/services/callApi"

export const description = "An interactive area chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },

  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },

  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  }
}

export function ChartAreaInteractive({ latestDate }) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("0d")

  useEffect(() => {
    if (isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeRange("0d")
    }
  }, [isMobile])

  const dateFilterQuery = (referenceDate) => {
    if (!referenceDate?.from || !referenceDate?.to) return "";

    let daysToSubtract = 90;

    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;
    else if (timeRange === "1d") daysToSubtract = 1;
    else if (timeRange === "0d") daysToSubtract = 0;

    const newDate = {
      from: subDays(referenceDate.to, daysToSubtract),
      to: referenceDate.to,
    };

    return generateDateFilters(newDate);
  };

  const filterQueryString = dateFilterQuery(latestDate)

  // const filterQueryString = useMemo(() => {
  //   return dateFilterQuery(latestDate);
  // }, [latestDate, timeRange]);

  const { data: periods = [], isLoading: isPeriodLoading } = useGetStartTimesQuery(filterQueryString, {
    skip: !filterQueryString,
  });


  const numCallsPerHour = periods.reduce((acc, period) => {
    const hour = new Date(period).getHours();
    acc[hour.toString()] = (acc[hour.toString()] || 0) + 1;
    return acc;
  }, {});

  const numCallsPerHourObj = Object.entries(numCallsPerHour).map(
    ([hour, numCalls]) => ({
      hour: hour,
      calls: numCalls,
    })
  )

  const hourList = Array.from({ length: 24 }, (_, i) => i);

  const chartData = hourList.map(hour => {
    const hourData = numCallsPerHourObj.find(data => data.hour === hour.toString());
    return hourData ? hourData : { hour: hour.toString(), calls: 0 };
  })


  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Calls per hour</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:hidden">Last 3 months</span>
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
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={16}
              minTickGap={32}
              tickFormatter={(value) => `${value}:00`} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value}:00`}
                  indicator="dot" />
              } />
            <Area
              dataKey="calls"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
