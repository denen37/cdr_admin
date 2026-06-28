import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { subDays, } from "date-fns"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateDateFilters = (dateRange) => {
  const { from, to } = dateRange;

  if (!from || !to) return "";

  return `start_date_after=${from.toISOString().split("T")[0]}&start_date_before=${to.toISOString().split("T")[0]}`;
};

export const formatCost = (totalCost) => totalCost.toLocaleString('en-US', {
  style: 'currency',
  currency: 'GBP',
});

export const dateFilterQuery = (referenceDate, timeRange) => {
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

export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }

  return `${secs}s`;
}
