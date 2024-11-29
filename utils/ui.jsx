import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// The `cn` function combines classes using clsx and twMerge
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
