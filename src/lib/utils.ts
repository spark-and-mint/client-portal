import { IOption } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const mockSearch = async (
  value: string,
  options: IOption[]
): Promise<IOption[]> => {
  return new Promise((resolve) => {
    if (!value) {
      resolve(options)
    }
    const res = options.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    )
    resolve(res)
  })
}
