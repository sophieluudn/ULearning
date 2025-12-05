import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface DateTimeRangePickerProps {
  startDate: Date | null
  endDate: Date | null
  onChange: (start: Date | null, end: Date | null) => void
  placeholder?: string
}

export function DateTimeRangePicker({ startDate, endDate, onChange, placeholder }: DateTimeRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate)
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectingStart, setSelectingStart] = useState(true)

  // 格式化日期時間顯示
  const formatDateTime = (date: Date | null) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  }

  const displayValue = () => {
    if (tempStartDate && tempEndDate) {
      return `${formatDateTime(tempStartDate)} - ${formatDateTime(tempEndDate)}`
    }
    return ''
  }

  // 獲取月份的所有日期
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    // 填充上個月的日期
    const firstDayOfWeek = firstDay.getDay()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    // 當月的日期
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }

    // 填充下個月的日期
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
    }

    return days
  }

  const handleDateClick = (date: Date) => {
    if (selectingStart) {
      const newDate = new Date(date)
      if (tempStartDate) {
        newDate.setHours(tempStartDate.getHours(), tempStartDate.getMinutes())
      } else {
        newDate.setHours(0, 0, 0, 0)
      }
      setTempStartDate(newDate)
      setSelectingStart(false)
    } else {
      const newDate = new Date(date)
      if (tempEndDate) {
        newDate.setHours(tempEndDate.getHours(), tempEndDate.getMinutes())
      } else {
        newDate.setHours(23, 59, 0, 0)
      }
      setTempEndDate(newDate)
      setSelectingStart(true)
    }
  }

  const isDateInRange = (date: Date) => {
    if (!tempStartDate || !tempEndDate) return false
    const time = date.getTime()
    return time >= tempStartDate.getTime() && time <= tempEndDate.getTime()
  }

  const isDateSelected = (date: Date) => {
    if (tempStartDate && date.toDateString() === tempStartDate.toDateString()) return true
    if (tempEndDate && date.toDateString() === tempEndDate.toDateString()) return true
    return false
  }

  const handleConfirm = () => {
    onChange(tempStartDate, tempEndDate)
    setIsOpen(false)
  }

  const handleClear = () => {
    setTempStartDate(null)
    setTempEndDate(null)
    onChange(null, null)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)

  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

  const formatStartDate = () => {
    if (!tempStartDate) return ''
    const year = tempStartDate.getFullYear()
    const month = String(tempStartDate.getMonth() + 1).padStart(2, '0')
    const day = String(tempStartDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatStartTime = () => {
    if (!tempStartDate) return ''
    const hours = String(tempStartDate.getHours()).padStart(2, '0')
    const minutes = String(tempStartDate.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const formatEndDate = () => {
    if (!tempEndDate) return ''
    const year = tempEndDate.getFullYear()
    const month = String(tempEndDate.getMonth() + 1).padStart(2, '0')
    const day = String(tempEndDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatEndTime = () => {
    if (!tempEndDate) return ''
    const hours = String(tempEndDate.getHours()).padStart(2, '0')
    const minutes = String(tempEndDate.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const handleStartDateChange = (value: string) => {
    try {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        const newDate = tempStartDate ? new Date(tempStartDate) : new Date()
        newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
        setTempStartDate(newDate)
      }
    } catch (e) {
      // Invalid date
    }
  }

  const handleStartTimeChange = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number)
    if (!isNaN(hours) && !isNaN(minutes)) {
      const newDate = tempStartDate ? new Date(tempStartDate) : new Date()
      newDate.setHours(hours, minutes)
      setTempStartDate(newDate)
    }
  }

  const handleEndDateChange = (value: string) => {
    try {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        const newDate = tempEndDate ? new Date(tempEndDate) : new Date()
        newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
        setTempEndDate(newDate)
      }
    } catch (e) {
      // Invalid date
    }
  }

  const handleEndTimeChange = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number)
    if (!isNaN(hours) && !isNaN(minutes)) {
      const newDate = tempEndDate ? new Date(tempEndDate) : new Date()
      newDate.setHours(hours, minutes)
      setTempEndDate(newDate)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Input
            value={displayValue()}
            placeholder={placeholder || "開始日期        -        結束日期"}
            readOnly
            className="w-full h-10 pl-10 pr-3 bg-white border border-gray-300 rounded-md text-sm text-gray-500 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4" style={{ width: '700px' }}>
          {/* 頂部時間輸入框 */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
            <Input
              type="date"
              value={formatStartDate()}
              onChange={(e) => handleStartDateChange(e.target.value)}
              placeholder="開始日期"
              className="w-36 h-9 text-sm bg-white border-gray-300"
            />
            <Input
              type="time"
              value={formatStartTime()}
              onChange={(e) => handleStartTimeChange(e.target.value)}
              placeholder="開始時間"
              className="w-28 h-9 text-sm bg-white border-gray-300"
            />
            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Input
              type="date"
              value={formatEndDate()}
              onChange={(e) => handleEndDateChange(e.target.value)}
              placeholder="結束日期"
              className="w-36 h-9 text-sm bg-white border-gray-300"
            />
            <Input
              type="time"
              value={formatEndTime()}
              onChange={(e) => handleEndTimeChange(e.target.value)}
              placeholder="結束時間"
              className="w-28 h-9 text-sm bg-white border-gray-300"
            />
          </div>

          {/* 雙月日曆 */}
          <div className="flex gap-4">
            {/* 左側月份 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevMonth}
                  className="h-7 w-7"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  {currentMonth.getFullYear()} 年 {currentMonth.getMonth() + 1} 月
                </div>
                <div className="w-7" />
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 py-1">
                    {day}
                  </div>
                ))}
                {getDaysInMonth(currentMonth).map((day, index) => {
                  const isInRange = isDateInRange(day.date)
                  const isSelected = isDateSelected(day.date)
                  return (
                    <button
                      key={index}
                      onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                      disabled={!day.isCurrentMonth}
                      className={`
                        text-center text-sm py-1 rounded
                        ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                        ${isSelected ? 'bg-blue-500 text-white font-medium' : ''}
                        ${isInRange && !isSelected ? 'bg-blue-50' : ''}
                        ${day.isCurrentMonth && !isSelected ? 'hover:bg-gray-100' : ''}
                        ${!day.isCurrentMonth ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {day.date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 右側月份 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="w-7" />
                <div className="text-sm font-medium">
                  {nextMonth.getFullYear()} 年 {nextMonth.getMonth() + 1} 月
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextMonth}
                  className="h-7 w-7"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 py-1">
                    {day}
                  </div>
                ))}
                {getDaysInMonth(nextMonth).map((day, index) => {
                  const isInRange = isDateInRange(day.date)
                  const isSelected = isDateSelected(day.date)
                  return (
                    <button
                      key={index}
                      onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                      disabled={!day.isCurrentMonth}
                      className={`
                        text-center text-sm py-1 rounded
                        ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                        ${isSelected ? 'bg-blue-500 text-white font-medium' : ''}
                        ${isInRange && !isSelected ? 'bg-blue-50' : ''}
                        ${day.isCurrentMonth && !isSelected ? 'hover:bg-gray-100' : ''}
                        ${!day.isCurrentMonth ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {day.date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 底部按鈕 */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={handleClear}
              className="text-sm"
              style={{ color: '#409eff' }}
            >
              清空
            </Button>
            <Button
              onClick={handleConfirm}
              className="text-sm"
              style={{ backgroundColor: '#409eff' }}
            >
              確定
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}