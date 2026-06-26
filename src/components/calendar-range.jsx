/* eslint-disable no-unused-vars */
"use client"

import React, { useState, useEffect } from "react"
import { addDays } from "date-fns"
// import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export function CalendarRange({ defaultRange, onChange }) {
    const [dateRange, setDateRange] = useState(defaultRange)

    // useEffect(() => {
    //     console.log('Date range changed', dateRange)
    // }, [dateRange])

    return (
        <Card className="mx-auto w-fit p-0">
            <CardContent className="p-0">
                <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(e) => { setDateRange(e); onChange(e) }}
                    numberOfMonths={2}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                />
            </CardContent>
        </Card>
    )
}
