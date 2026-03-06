// src/lib/utils.ts

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

/** Merges Tailwind classes safely. Use everywhere instead of raw `clsx`. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formats an ISO date string to "Feb 2026" style. */
export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM yyyy')
}

/** Formats an ISO date string to "28 February 2026" for article pages. */
export function formatDateLong(dateStr: string): string {
  return format(parseISO(dateStr), 'd MMMM yyyy')
}
