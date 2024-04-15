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

export const toRelativeTimeString = (date: Date) => {
  const now = new Date()
  const differenceInSeconds = (now.getTime() - date.getTime()) / 1000
  const differenceInMinutes = differenceInSeconds / 60
  const differenceInHours = differenceInMinutes / 60
  const differenceInDays = differenceInHours / 24
  const differenceInWeeks = differenceInDays / 7
  const differenceInMonths = differenceInDays / 30
  const differenceInYears = differenceInDays / 365

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" })

  if (differenceInYears >= 1) {
    return rtf.format(-Math.floor(differenceInYears), "year")
  } else if (differenceInMonths >= 1) {
    return rtf.format(-Math.floor(differenceInMonths), "month")
  } else if (differenceInWeeks >= 1) {
    return rtf.format(-Math.floor(differenceInWeeks), "week")
  } else if (differenceInDays >= 1) {
    return rtf.format(-Math.floor(differenceInDays), "day")
  } else if (differenceInHours >= 1) {
    return rtf.format(-Math.floor(differenceInHours), "hour")
  } else {
    return "Less than 1 hour ago"
  }
}
