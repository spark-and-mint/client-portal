import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"

interface Timezone {
  value: string
  label: string
  country: string
  offset: string
  group: string
}

const timezones: Timezone[] = [
  // North America
  {
    value: "america-new_york",
    label: "New York",
    country: "United States",
    offset: "UTC-05:00",
    group: "North America",
  },
  {
    value: "america-los_angeles",
    label: "Los Angeles",
    country: "United States",
    offset: "UTC-08:00",
    group: "North America",
  },
  {
    value: "america-chicago",
    label: "Chicago",
    country: "United States",
    offset: "UTC-06:00",
    group: "North America",
  },
  {
    value: "america-denver",
    label: "Denver",
    country: "United States",
    offset: "UTC-07:00",
    group: "North America",
  },
  {
    value: "america-toronto",
    label: "Toronto",
    country: "Canada",
    offset: "UTC-05:00",
    group: "North America",
  },
  {
    value: "america-vancouver",
    label: "Vancouver",
    country: "Canada",
    offset: "UTC-08:00",
    group: "North America",
  },
  {
    value: "america-mexico_city",
    label: "Mexico City",
    country: "Mexico",
    offset: "UTC-06:00",
    group: "North America",
  },

  // Europe
  {
    value: "europe-london",
    label: "London",
    country: "United Kingdom",
    offset: "UTC+00:00",
    group: "Europe",
  },
  {
    value: "europe-paris",
    label: "Paris",
    country: "France",
    offset: "UTC+01:00",
    group: "Europe",
  },
  {
    value: "europe-berlin",
    label: "Berlin",
    country: "Germany",
    offset: "UTC+01:00",
    group: "Europe",
  },
  {
    value: "europe-moscow",
    label: "Moscow",
    country: "Russia",
    offset: "UTC+03:00",
    group: "Europe",
  },
  {
    value: "europe-rome",
    label: "Rome",
    country: "Italy",
    offset: "UTC+01:00",
    group: "Europe",
  },
  {
    value: "europe-madrid",
    label: "Madrid",
    country: "Spain",
    offset: "UTC+01:00",
    group: "Europe",
  },

  // Asia
  {
    value: "asia-tokyo",
    label: "Tokyo",
    country: "Japan",
    offset: "UTC+09:00",
    group: "Asia",
  },
  {
    value: "asia-shanghai",
    label: "Shanghai",
    country: "China",
    offset: "UTC+08:00",
    group: "Asia",
  },
  {
    value: "asia-singapore",
    label: "Singapore",
    country: "Singapore",
    offset: "UTC+08:00",
    group: "Asia",
  },
  {
    value: "asia-dubai",
    label: "Dubai",
    country: "United Arab Emirates",
    offset: "UTC+04:00",
    group: "Asia",
  },
  {
    value: "asia-kolkata",
    label: "Kolkata",
    country: "India",
    offset: "UTC+05:30",
    group: "Asia",
  },
  {
    value: "asia-seoul",
    label: "Seoul",
    country: "South Korea",
    offset: "UTC+09:00",
    group: "Asia",
  },

  // Australia & Pacific
  {
    value: "australia-sydney",
    label: "Sydney",
    country: "Australia",
    offset: "UTC+10:00",
    group: "Australia & Pacific",
  },
  {
    value: "australia-melbourne",
    label: "Melbourne",
    country: "Australia",
    offset: "UTC+10:00",
    group: "Australia & Pacific",
  },
  {
    value: "australia-perth",
    label: "Perth",
    country: "Australia",
    offset: "UTC+08:00",
    group: "Australia & Pacific",
  },
  {
    value: "pacific-auckland",
    label: "Auckland",
    country: "New Zealand",
    offset: "UTC+12:00",
    group: "Australia & Pacific",
  },

  // South America
  {
    value: "america-sao_paulo",
    label: "São Paulo",
    country: "Brazil",
    offset: "UTC-03:00",
    group: "South America",
  },
  {
    value: "america-buenos_aires",
    label: "Buenos Aires",
    country: "Argentina",
    offset: "UTC-03:00",
    group: "South America",
  },
  {
    value: "america-lima",
    label: "Lima",
    country: "Peru",
    offset: "UTC-05:00",
    group: "South America",
  },
  {
    value: "america-bogota",
    label: "Bogotá",
    country: "Colombia",
    offset: "UTC-05:00",
    group: "South America",
  },

  // Africa
  {
    value: "africa-cairo",
    label: "Cairo",
    country: "Egypt",
    offset: "UTC+02:00",
    group: "Africa",
  },
  {
    value: "africa-johannesburg",
    label: "Johannesburg",
    country: "South Africa",
    offset: "UTC+02:00",
    group: "Africa",
  },
  {
    value: "africa-nairobi",
    label: "Nairobi",
    country: "Kenya",
    offset: "UTC+03:00",
    group: "Africa",
  },
  {
    value: "africa-lagos",
    label: "Lagos",
    country: "Nigeria",
    offset: "UTC+01:00",
    group: "Africa",
  },
]

interface TimezoneGrouped {
  [key: string]: Timezone[]
}

interface TimezoneSelectorProps {
  timezone: string
  onTimezoneChange: (value: string) => void
}

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
  timezone,
  onTimezoneChange,
}) => {
  const groupedTimezones = timezones.reduce<TimezoneGrouped>((acc, tz) => {
    if (!acc[tz.group]) {
      acc[tz.group] = []
    }
    acc[tz.group].push(tz)
    return acc
  }, {})

  return (
    <Select value={timezone} onValueChange={onTimezoneChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(groupedTimezones).map(([group, tzs]) => (
          <SelectGroup key={group} className="mt-2">
            <SelectLabel>{group}</SelectLabel>
            {tzs.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}, {tz.country}{" "}
                <span className="text-sm text-muted-foreground">
                  ({tz.offset})
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TimezoneSelector
