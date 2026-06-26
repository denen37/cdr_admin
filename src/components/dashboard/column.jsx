import React from 'react';
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { formatCost } from '@/utils/general';

export const columns = [
    {
        accessorKey: "callerName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Caller
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        // cell: ({row}) => <div className="font-medium">{row.getValue("callerName")}</div>
    },
    {
        accessorKey: "callerNumber",
        header: "Caller No.",
        // cell: ({row}) => <div className="font-medium">{row.getValue("callerNumber")}</div>
    },
    {
        accessorKey: "receiverNumber",
        header: "Receiver No.",
        // cell: ({row}) => <div className="font-medium">{row.getValue("receiverNumber")}</div>
    },
    {
        accessorKey: "city",
        header: "City",
        // cell: ({row}) => <div className="font-medium">{row.getValue("city")}</div>
    },
    {
        accessorKey: "callDuration",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Duration
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-right px-4">{row.getValue("callDuration")}</div>
    },
    {
        accessorKey: "callCost",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-right"
                >
                    Cost
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const cost = parseFloat(row.getValue("callCost"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "GBP",
            }).format(cost)

            return <div className="text-right">{formatted}</div>
        },
    },
    {
        accessorKey: "callDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (rowA, rowB) => {
            return rowA.original.callTimestamp - rowB.original.callTimestamp;
        },
        // cell: ({row}) => <div className="font-medium">{row.getValue("callDate")}</div>
    },
    {
        accessorKey: "callStartTime",
        header: "Start Time",
        // cell: ({row}) => <div className="font-medium">{row.getValue("callStartTime")}</div>
    },
    {
        accessorKey: "callEndTime",
        header: "End Time",
        // cell: ({row}) => <div className="font-medium">{row.getValue("callEndTime")}</div>
    },

    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className={"px-4 py-2"}>
                        <PopoverHeader>
                            <PopoverTitle>Details</PopoverTitle>
                            <div className="grid grid-cols-[auto_1fr] gap-y-1 gap-x-2">
                                {
                                    [
                                        { name: "Id", value: row.original.id },
                                        { name: "Caller", value: row.getValue("callerName") },
                                        { name: "Caller No.", value: row.getValue("callerNumber") },
                                        { name: "Receiver No.", value: row.getValue("receiverNumber") },
                                        { name: "City", value: row.getValue("city") },
                                        { name: "Duration", value: row.getValue("callDuration") },
                                        { name: "Cost", value: formatCost(row.getValue("callCost")) },
                                        { name: "Date", value: row.getValue("callDate") },
                                        { name: "Start Time", value: row.getValue("callStartTime") },
                                        { name: "End Time", value: row.getValue("callEndTime") },
                                        { name: "Status", value: row.original.callStatus ? "Success" : "Failed" }
                                    ].map((item) => (
                                        <React.Fragment key={item.name}>
                                            <div className="text-xs text-text-primary">{item.name}</div>
                                            <div className="text-xs text-text-secondary">{item.value}</div>
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </PopoverHeader>
                    </PopoverContent>
                </Popover>
            )
        },
    },
]