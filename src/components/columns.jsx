// import { useRef } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
// import { toast } from "sonner"
import { CircleCheckIcon, MoveRight, MoveLeft, ChevronDown, EllipsisVerticalIcon, CircleX, ArrowUpDown } from "lucide-react"
import { formatCost } from "@/lib/utils"


import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DatePickerInput } from "./calendar-single"
import { CustomInputGroup } from "./input-group"


export const columns = [
    {
        accessorKey: "header",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1">Name</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="center" className='ms-2'>
                            <PopoverHeader>
                                Filter by name
                            </PopoverHeader>
                            <CustomInputGroup
                                id="filterName"
                                placeholder="Enter name"
                            />
                        </PopoverContent>
                    </Popover>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            return <p className="w-fit ps-1 text-left text-foreground">{row.original.callerName}</p>;
        },
        enableHiding: false,
    },
    {
        accessorKey: "callerNo",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1">Caller No.</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="center" className=''>
                            <PopoverHeader>
                                Filter by caller no.
                            </PopoverHeader>
                            <CustomInputGroup
                                id="filterCallerNo"
                                placeholder="Enter Number"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            )
        },
        cell: ({ row }) => (
            <p className="w-fit ps-1 text-left text-muted-foreground">{row.original.callerNumber}</p>
        )
    },
    {
        accessorKey: "receiverNo",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1">Receiver No.</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="center" className='ms-2'>
                            <PopoverHeader>
                                Filter by receiver no.
                            </PopoverHeader>
                            <CustomInputGroup
                                id="filterReceiverNo"
                                placeholder="Filter number"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            )
        },
        cell: ({ row }) => (
            <p className="w-fit ps-1 text-left text-muted-foreground">{row.original.receiverNumber}</p>
        )
    },
    {
        accessorKey: "city",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1">City</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="center" className='ms-2'>
                            <PopoverHeader>
                                Filter by city.
                            </PopoverHeader>
                            <CustomInputGroup
                                id="filterCity"
                                placeholder="Enter city"
                            />
                        </PopoverContent>
                    </Popover>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => (
            <p className="w-fit ps-1 text-left text-muted-foreground">{row.original.city}</p>
        )
    },
    {
        accessorKey: "direction",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1">Direction</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className='w-fit'>
                            <PopoverHeader>
                                Filter by direction
                            </PopoverHeader>
                            <Select defaultValue="null">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent
                                    position={"item-aligned"}
                                >
                                    <SelectGroup>
                                        <SelectItem value="null">All</SelectItem>
                                        <SelectItem value="1">Forward</SelectItem>
                                        <SelectItem value="0">Backward</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </PopoverContent>
                    </Popover>
                </div>
            )
        },
        cell: ({ row }) => (
            <p className="flex justify-center items-center">
                {
                    row.original.callDirection ? (
                        <MoveRight className="text-blue-500" size={20} />
                    ) : (
                        <MoveLeft className="text-orange-500" size={20} />
                    )
                }
            </p>
        ),
    },

    {
        accessorKey: "status",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1">Status</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className='w-fit'>
                            <PopoverHeader>
                                Filter by status
                            </PopoverHeader>
                            <Select defaultValue="null">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent
                                    position={"item-aligned"}
                                >
                                    <SelectGroup>
                                        <SelectItem value="null">All</SelectItem>
                                        <SelectItem value="1">Success</SelectItem>
                                        <SelectItem value="0">Failed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </PopoverContent>
                    </Popover>
                </div>
            )
        },
        cell: ({ row }) => (
            <Badge variant="outline" className={`px-1.5 text-foreground ${row.original.callStatus ? "bg-green-200 border-green-500" : "bg-red-200 border-red-500"}`}>
                {row.original.callStatus ? (
                    <CircleCheckIcon />
                ) : (
                    <CircleX />
                )}
                {row.original.callStatus ? "Success" : "Failed"}
            </Badge>
        ),
    },
    {
        accessorKey: "cost",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1 text-right">Cost</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className='w-fit'>
                            <PopoverHeader>
                                Cost is:
                            </PopoverHeader>
                            <div className="flex items-center gap-2">
                                <Select defaultValue="eq">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent
                                        position={"item-aligned"}
                                    >
                                        <SelectGroup>
                                            <SelectItem value="eq">=</SelectItem>
                                            <SelectItem value="lt">&lt;</SelectItem>
                                            <SelectItem value="lte">&le;</SelectItem>
                                            <SelectItem value="gt">&gt;</SelectItem>
                                            <SelectItem value="gte">&ge;</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Input
                                    className="h-8 w-16 bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
                                    type={'number'}
                                    id='filterCost'
                                />
                            </div>

                            <PopoverHeader>
                                AND
                            </PopoverHeader>
                            <div className="flex items-center gap-2">
                                <Select defaultValue="eq">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent
                                        position={"item-aligned"}
                                    >
                                        <SelectGroup>
                                            <SelectItem value="eq">=</SelectItem>
                                            <SelectItem value="lt">&lt;</SelectItem>
                                            <SelectItem value="lte">&le;</SelectItem>
                                            <SelectItem value="gt">&gt;</SelectItem>
                                            <SelectItem value="gte">&ge;</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Input
                                    className="h-8 w-16 bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
                                    type={'number'}
                                    id='filterCostAnd'
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => (
            <p className="w-full text-right pe-8">{formatCost(row.original.callCost)}</p>
        ),
    },
    {
        accessorKey: "duration",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1 text-right">Duration</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className='w-fit'>
                            <PopoverHeader>
                                Duration is:
                            </PopoverHeader>
                            <div className="flex items-center gap-2">
                                <Select defaultValue="eq">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent
                                        position={"item-aligned"}
                                    >
                                        <SelectGroup>
                                            <SelectItem value="eq">=</SelectItem>
                                            <SelectItem value="lt">&lt;</SelectItem>
                                            <SelectItem value="lte">&le;</SelectItem>
                                            <SelectItem value="gt">&gt;</SelectItem>
                                            <SelectItem value="gte">&ge;</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Input
                                    className="h-8 w-16 bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
                                    type={'number'}
                                    id='filterDuration'
                                />
                            </div>

                            <PopoverHeader>
                                AND
                            </PopoverHeader>
                            <div className="flex items-center gap-2">
                                <Select defaultValue="eq">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent
                                        position={"item-aligned"}
                                    >
                                        <SelectGroup>
                                            <SelectItem value="eq">=</SelectItem>
                                            <SelectItem value="lt">&lt;</SelectItem>
                                            <SelectItem value="lte">&le;</SelectItem>
                                            <SelectItem value="gt">&gt;</SelectItem>
                                            <SelectItem value="gte">&ge;</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Input
                                    className="h-8 w-16 bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
                                    type={'number'}
                                    id='filterDurationAnd'
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => (
            <p className="w-full text-right pe-8">{row.original.callDuration}</p>
        ),
    },
    {
        accessorKey: "startTime",
        header: () => {
            return (
                <div className="flex items-center">
                    <h1 className="ps-1 text-right">Start Time</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="icon" className="ps-1 active:mt-0.5 transition-all duration-300"><ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className='w-fit'>
                            <PopoverHeader className='text-dark'>
                                Start time is:
                            </PopoverHeader>
                            <div>
                                <p className="text-muted-foreground">From</p>
                                <DatePickerInput />
                            </div>

                            <div className="mt-2">
                                <p className="text-muted-foreground">To</p>
                                <DatePickerInput />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => <p className="text-left text-muted-foreground">{row.original.callStartTime}</p>
    },
    {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => <p className="text-left text-muted-foreground">{row.original.callEndTime}</p>
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                        size="icon">
                        <EllipsisVerticalIcon />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]
