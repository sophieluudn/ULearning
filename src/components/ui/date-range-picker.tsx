import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker@8.10.1"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export type { DateRange }

export function DateRangePicker({
  value,
  onChange,
  placeholder = "選擇日期範圍",
  disabled = false,
  className = ""
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setDate(value)
  }, [value])

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    if (onChange) {
      onChange(range)
    }
  }

  const handleShortcut = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * days)
    
    const newRange = { from: start, to: end }
    setDate(newRange)
    if (onChange) {
      onChange(newRange)
    }
    setIsOpen(false)
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  const displayText = date?.from && date?.to
    ? `${formatDate(date.from)} 至 ${formatDate(date.to)}`
    : date?.from
    ? formatDate(date.from)
    : placeholder

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            disabled={disabled}
            className={`w-full inline-flex items-center justify-start text-left h-8 px-3 py-0 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              !date ? "text-gray-400" : "text-gray-900"
            } ${disabled ? "opacity-50 cursor-not-allowed hover:bg-white" : "cursor-pointer"}`}
            style={{ fontSize: '10pt' }}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayText}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" style={{ fontSize: '10pt' }}>
          <div className="flex">
            {/* 快捷選項 */}
            <div className="border-r border-gray-200 bg-gray-50 p-3 space-y-1 flex flex-col" style={{ minWidth: '130px' }}>
              <div className="text-xs text-gray-600 px-2 pb-2 border-b border-gray-200 mb-1" style={{ fontSize: '10pt' }}>
                快捷選項
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 px-3 hover:bg-blue-50 hover:text-blue-600"
                style={{ fontSize: '10pt' }}
                onClick={() => handleShortcut(7)}
              >
                最近一週
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 px-3 hover:bg-blue-50 hover:text-blue-600"
                style={{ fontSize: '10pt' }}
                onClick={() => handleShortcut(30)}
              >
                最近一個月
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 px-3 hover:bg-blue-50 hover:text-blue-600"
                style={{ fontSize: '10pt' }}
                onClick={() => handleShortcut(90)}
              >
                最近三個月
              </Button>
            </div>
            {/* 日曆 */}
            <div className="p-3">
              <Calendar
                mode="range"
                selected={date}
                onSelect={handleSelect}
                numberOfMonths={2}
                disabled={disabled}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
