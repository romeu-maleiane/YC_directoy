import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function formatDate(date: String){

  return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
  })
}

export const formatView = view => view > 1 ? `${view} views` : `${view} view`

export const parseServerActionResponse = <T>(response: T) => JSON.parse(JSON.stringify(response))