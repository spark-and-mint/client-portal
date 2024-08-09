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
      option.label.toLowerCase().includes(value.toLowerCase())
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

export const removeTimezoneFromTimeString = (timeString: string) => {
  if (!timeString) return ""
  const parts = timeString.split(",")
  if (parts.length > 1 && parts[parts.length - 1].includes("-")) {
    parts.pop()
    return parts.join(",").trim()
  } else {
    return timeString.trim()
  }
}

export const getStripeLink = (numberOfExperts: number) => {
  let link = ""
  if (numberOfExperts === 1) {
    link = "https://buy.stripe.com/14kdS74wOgDb5l64gi"
  } else if (numberOfExperts === 2) {
    link = "https://buy.stripe.com/7sI01he7ogDb7tefZ1"
  } else if (numberOfExperts === 3) {
    link = "https://buy.stripe.com/dR66pFfbscmV6pa9AE"
  }

  return link
}

export const getEukapayLink = (numberOfExperts: number) => {
  let link = ""
  if (numberOfExperts === 1) {
    link = "https://app.eukapay.com/templates/tmp_BPxeiuxUKlQhaeUYyBENAfGcQ9"
  } else if (numberOfExperts === 2) {
    link = "https://app.eukapay.com/templates/tmp_SzfuwWF5lg9uktS0MewVPsngXJ"
  } else if (numberOfExperts === 3) {
    link = "https://app.eukapay.com/templates/tmp_dpMgpwn2hPbcjqMz58ATEWbLUd"
  }

  return link
}
