import { useState, forwardRef, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { format } from 'date-fns'

interface CustomDatePickerProps {
  selected: Date | undefined
  onChange: (date: Date | null) => void
  placeholderText?: string
  className?: string
}

export function CustomDatePicker({ selected, onChange, placeholderText, className }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentYear, setCurrentYear] = useState(selected?.getFullYear() || new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(selected?.getMonth() || new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(selected || null)
  const [dateInput, setDateInput] = useState('')
  const [timeInput, setTimeInput] = useState('00:00:00')
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const hoursRef = useRef<HTMLDivElement>(null)
  const minutesRef = useRef<HTMLDivElement>(null)
  const secondsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected) {
      setDateInput(format(selected, 'yyyy-MM-dd'))
      setTimeInput(format(selected, 'HH:mm:ss'))
      setHours(selected.getHours())
      setMinutes(selected.getMinutes())
      setSeconds(selected.getSeconds())
    }
  }, [selected])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowTimePicker(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day, hours, minutes, seconds)
    setSelectedDate(newDate)
    setDateInput(format(newDate, 'yyyy-MM-dd'))
    if (!timeInput || timeInput === '00:00:00') {
      setTimeInput('00:00:00')
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    }
  }

  const handleTimeInputFocus = () => {
    setShowTimePicker(true)
  }

  const handleTimeChange = (type: 'hours' | 'minutes' | 'seconds', value: number) => {
    let newHours = hours
    let newMinutes = minutes
    let newSeconds = seconds

    if (type === 'hours') {
      newHours = value
      setHours(value)
    } else if (type === 'minutes') {
      newMinutes = value
      setMinutes(value)
    } else {
      newSeconds = value
      setSeconds(value)
    }

    const timeStr = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`
    setTimeInput(timeStr)

    if (selectedDate) {
      const newDate = new Date(selectedDate)
      newDate.setHours(newHours, newMinutes, newSeconds)
      setSelectedDate(newDate)
    }
  }

  const handleConfirm = () => {
    if (selectedDate) {
      onChange(selectedDate)
      setIsOpen(false)
      setShowTimePicker(false)
    }
  }

  const handleCancel = () => {
    setShowTimePicker(false)
  }

  const handleNow = () => {
    const now = new Date()
    setSelectedDate(now)
    setDateInput(format(now, 'yyyy-MM-dd'))
    setTimeInput(format(now, 'HH:mm:ss'))
    setHours(now.getHours())
    setMinutes(now.getMinutes())
    setSeconds(now.getSeconds())
    setCurrentYear(now.getFullYear())
    setCurrentMonth(now.getMonth())
    onChange(now)
    setIsOpen(false)
    setShowTimePicker(false)
  }

  const handleTimeInputConfirm = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate)
      newDate.setHours(hours, minutes, seconds)
      setSelectedDate(newDate)
    }
    setShowTimePicker(false)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    // 填充前面的空白
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-9 h-9" />)
    }

    // 填充日期
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === new Date().getDate() && 
        currentMonth === new Date().getMonth() && 
        currentYear === new Date().getFullYear()
      
      const isSelected = 
        selectedDate && 
        day === selectedDate.getDate() && 
        currentMonth === selectedDate.getMonth() && 
        currentYear === selectedDate.getFullYear()

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`w-9 h-9 flex items-center justify-center text-sm cursor-pointer rounded ${
            isSelected 
              ? 'bg-[#409eff] text-white' 
              : isToday 
              ? 'text-[#409eff] font-medium' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      )
    }

    return days
  }

  const TimePickerDropdown = () => (
    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50">
      <div className="flex">
        {/* 時 */}
        <div className="w-16 border-r border-gray-200">
          <div className="h-48 overflow-y-auto scrollbar-thin" ref={hoursRef}>
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                onClick={() => handleTimeChange('hours', i)}
                className={`h-8 flex items-center justify-center text-sm cursor-pointer ${
                  hours === i ? 'bg-[#f5f7fa] text-[#409eff]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {String(i).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
        
        {/* 分 */}
        <div className="w-16 border-r border-gray-200">
          <div className="h-48 overflow-y-auto scrollbar-thin" ref={minutesRef}>
            {Array.from({ length: 60 }, (_, i) => (
              <div
                key={i}
                onClick={() => handleTimeChange('minutes', i)}
                className={`h-8 flex items-center justify-center text-sm cursor-pointer ${
                  minutes === i ? 'bg-[#f5f7fa] text-[#409eff]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {String(i).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
        
        {/* 秒 */}
        <div className="w-16">
          <div className="h-48 overflow-y-auto scrollbar-thin" ref={secondsRef}>
            {Array.from({ length: 60 }, (_, i) => (
              <div
                key={i}
                onClick={() => handleTimeChange('seconds', i)}
                className={`h-8 flex items-center justify-center text-sm cursor-pointer ${
                  seconds === i ? 'bg-[#f5f7fa] text-[#409eff]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {String(i).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 底部按鈕 */}
      <div className="flex justify-end gap-2 px-2 py-2 bg-white border-t border-gray-200">
        <button
          type="button"
          onClick={handleCancel}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
        >
          取消
        </button>
        <button
          type="button"
          onClick={handleTimeInputConfirm}
          className="px-3 py-1 text-sm text-white bg-[#409eff] hover:bg-[#66b1ff] rounded transition-colors"
        >
          確定
        </button>
      </div>
    </div>
  )

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        value={selected ? format(selected, 'yyyy-MM-dd HH:mm') : ''}
        onClick={() => setIsOpen(true)}
        placeholder={placeholderText}
        readOnly
        className={className}
      />

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50">
          <div className="p-4">
            {/* 日期和時間輸入框 */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={dateInput}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                  placeholder="選擇日期"
                />
              </div>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={timeInput}
                  onFocus={handleTimeInputFocus}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm cursor-pointer hover:border-[#409eff]"
                  placeholder="選擇時間"
                />
                {showTimePicker && <TimePickerDropdown />}
              </div>
            </div>

            {/* 日曆 */}
            <div>
              {/* 年月導航 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentYear(currentYear - 1)}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    <ChevronsLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11)
                        setCurrentYear(currentYear - 1)
                      } else {
                        setCurrentMonth(currentMonth - 1)
                      }
                    }}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <span className="text-sm text-gray-700">
                  {currentYear}年 {currentMonth + 1}月
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0)
                        setCurrentYear(currentYear + 1)
                      } else {
                        setCurrentMonth(currentMonth + 1)
                      }
                    }}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentYear(currentYear + 1)}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    <ChevronsRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* 星期標題 */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                  <div key={day} className="w-9 h-9 flex items-center justify-center text-xs text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* 日期網格 */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>
          </div>

          {/* 底部按鈕 */}
          <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleNow}
              className="px-4 py-1 text-sm text-[#409eff] hover:bg-[#ecf5ff] rounded transition-colors"
            >
              此刻
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-1 text-sm text-white bg-[#409eff] hover:bg-[#66b1ff] rounded transition-colors"
            >
              確定
            </button>
          </div>
        </div>
      )}
    </div>
  )
}