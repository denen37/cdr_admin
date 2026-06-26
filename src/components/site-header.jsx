/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "./ui/button";
import { CalendarDays } from "lucide-react";
import { CalendarRange } from "./calendar-range";

import {
  Popover,
  PopoverContent,
  // PopoverDescription,
  // PopoverHeader,
  // PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SiteHeader({ defaultDate, onDateChange }) {
  const [dateRange, setDateRange] = useState(defaultDate);

  useEffect(() => {
    if (!defaultDate?.from || !defaultDate?.to) return;

    setDateRange(defaultDate);
  }, [defaultDate]);

  const getDateText = (dateRange) => {
    if (!dateRange?.from || !dateRange?.to) return "";

    const { from, to } = dateRange;

    if (from.toLocaleDateString() === to.toLocaleDateString()) {
      return from.toLocaleDateString();
    }

    return `${from.toLocaleDateString()} - ${to.toLocaleDateString()}`;
  };

  const dateText = getDateText(dateRange);

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) return;

    onDateChange(dateRange);
  }, [dateRange, onDateChange]);

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className='flex items-center justify-between flex-1'>
          <h1 className="text-base font-medium">CDR ADMIN</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">{dateText}</p>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="icon">
                  <CalendarDays size={60} color="#000000" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className={'w-auto p-0 border-0'}>
                <CalendarRange defaultRange={dateRange} onChange={setDateRange} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
