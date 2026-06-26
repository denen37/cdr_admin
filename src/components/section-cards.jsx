/* eslint-disable no-unused-vars */
"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { generateDateFilters } from "@/lib/utils";
import { useGetCallAnalyticsQuery } from "@/services/callApi";
import { useEffect } from "react";
import { formatCost } from "@/lib/utils";

export function SectionCards({ dateRange }) {
  const filterQuery = generateDateFilters(dateRange)

  const { data: analytics } = useGetCallAnalyticsQuery(filterQuery, {
    skip: !filterQuery,
  })


  return (
    <div
      className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-6 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Calls</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {analytics?.total_calls || 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Cost</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCost(analytics?.total_cost || 0)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Avg Duration</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {`${analytics?.avg_duration || 0} s`}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Success</CardDescription>
          <CardTitle className="text-2xl text-green-400 font-semibold tabular-nums @[250px]/card:text-3xl">
            {analytics?.total_success || 0}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Failed</CardDescription>
          <CardTitle className="text-2xl text-red-500 font-semibold tabular-nums @[250px]/card:text-3xl">
            {analytics?.total_failed || 0}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Success Rate</CardDescription>
          <CardTitle className="text-2xl text-green-400 font-semibold tabular-nums @[250px]/card:text-3xl">
            {analytics?.success_rate || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
