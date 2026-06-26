import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateDateFilters = (dateRange) => {
  const { from, to } = dateRange;

  if (!from || !to) return "";

  return `start_date_after=${from.toISOString().split("T")[0]}&start_date_before=${to.toISOString().split("T")[0]}`;
};
