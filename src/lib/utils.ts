import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow as formatDistanceToNowFunc } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistanceToNow(date: Date): string {
  return formatDistanceToNowFunc(date, { addSuffix: true });
}
