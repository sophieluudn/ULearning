import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, Download, ChevronDown } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { format, subDays, subMonths, startOfMonth, endOfMonth, addMonths } from 'date-fns'

// 模擬報表資料
const mockReportData = [
  { 
    id: 'RPT001', 
    startTime: '2024-01-01 00:00:00', 
    endTime: '2024-01-31 23:59:59', 
    exportTime: '2024-02-01 10:30:25',
    exportUser: '王小明',
    status: 'completed'
  },
  { 
    id: 'RPT002', 
    startTime: '2024-02-01 00:00:00', 
    endTime: '2024-02-28 23:59:59', 
    exportTime: '2024-03-01 09:15:42',
    exportUser: '李大華',
    status: 'completed'
  },
  { 
    id: 'RPT003', 
    startTime: '2024-03-01 00:00:00', 
    endTime: '2024-03-31 23:59:59', 
    exportTime: '2024-04-01 11:22:18',
    exportUser: '陳美玲',
    status: 'completed'
  },
]

// 匯出欄位選項
const exportColumns = [
  { id: 'mainOrderId', label: '訂單編號 (主單)' },
  { id: 'splitOrderId', label: '訂單編號 (拆分單)' },
  { id: 'invoiceNumber', label: '發票號碼' },
  { id: 'totalAmount', label: '訂單總金額' },
  { id: 'name', label: '姓名' },
  { id: 'email', label: '信箱' },
  { id: 'phone', label: '電話' },
  { id: 'udnId', label: 'udn ID' },
  { id: 'venue', label: '所屬館別' },
  { id: 'productId', label: '商品編號' },
  { id: 'productName', label: '商品名稱' },
  { id: 'planName', label: '方案名稱' },
  { id: 'quantity', label: '數量' },
  { id: 'source', label: '來源' },
  { id: 'productPrice', label: '商品售價' },
  { id: 'couponDiscount', label: '優惠券折抵金額' },
  { id: 'actualAmount', label: '實收金額' },
  { id: 'paymentMethod', label: '付款方式' },
  { id: 'orderCreateTime', label: '訂單成立時間' },
  { id: 'paymentTime', label: '付款時間' },
  { id: 'redeemTime', label: '兌換時間' },
  { id: 'redeemCondition', label: '兌換狀況' },
  { id: 'redeemStatus', label: '兌換狀態' },
  { id: 'remark', label: '備註' },
  { id: 'redeemProcess', label: '兌換處理' },
  { id: 'paymentStatus', label: '付款狀態' },
  { id: 'actualAmountForSplit', label: '實收金額 (拆帳用)' },
  { id: 'taxType', label: '課稅別' },
  { id: 'invoiceType', label: '發票類型' },
  { id: 'taxId', label: '統一編號' },
  { id: 'companyName', label: '公司抬頭' },
  { id: 'mailingAddress', label: '郵寄地址' },
  { id: 'refundTime', label: '退款時間' },
  { id: 'currency', label: '幣別' },
  { id: 'affCode', label: '導購代碼 AFFcode' },
  { id: 'promoCodeName', label: '優惠代碼名稱' },
  { id: 'promoCode', label: '優惠代碼' },
  { id: 'memberCode', label: '(一刻) 會員代號' },
  { id: 'marketingSubsidy', label: '行銷補貼金額' },
  { id: 'selfOrGift', label: '自用/贈課' },
  { id: 'orderRemark', label: '訂單備註' },
]

export function OrderReport() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    exportColumns.map(col => col.id) // 預設全選
  )
  const [reportList, setReportList] = useState(mockReportData)
  const [isColumnPopoverOpen, setIsColumnPopoverOpen] = useState(false)
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // 快速選項處理
  const handleQuickSelect = (type: string) => {
    const today = new Date()
    let start: Date
    let end: Date = today

    switch (type) {
      case 'week':
        start = subDays(today, 7)
        break
      case 'month':
        start = subMonths(today, 1)
        break
      case 'threeMonths':
        start = subMonths(today, 3)
        break
      case 'thisMonth':
        start = startOfMonth(today)
        end = endOfMonth(today)
        break
      case 'lastMonth':
        const lastMonth = subMonths(today, 1)
        start = startOfMonth(lastMonth)
        end = endOfMonth(lastMonth)
        break
      default:
        return
    }

    setStartDate(start)
    setEndDate(end)
    setIsDatePopoverOpen(false)
  }

  // 日曆日期點擊處理
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (!startDate || (startDate && endDate)) {
      // 如果沒有開始日期，或者已經選了兩個日期，重新開始選擇
      setStartDate(date)
      setEndDate(undefined)
    } else {
      // 已有開始日期，選擇結束日期
      if (date < startDate) {
        // 如果選的日期比開始日期早，將其設為開始日期
        setEndDate(startDate)
        setStartDate(date)
      } else {
        setEndDate(date)
      }
      setIsDatePopoverOpen(false)
    }
  }

  const handleColumnToggle = (columnId: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnId) 
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    )
  }

  const handleSelectAll = () => {
    setSelectedColumns(exportColumns.map(col => col.id))
  }

  const handleClearAll = () => {
    setSelectedColumns([])
  }

  const handleExport = (reportId: string) => {
    console.log('匯出報表:', reportId)
    // 這裡實作匯出功能
  }

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      alert('請選擇日期範圍')
      return
    }
    
    if (selectedColumns.length === 0) {
      alert('請選擇至少一個匯出欄位')
      return
    }

    // 生成新的報表記錄
    const newReportId = `RPT${String(reportList.length + 1).padStart(3, '0')}`
    const now = new Date()
    const newReport = {
      id: newReportId,
      startTime: format(startDate, 'yyyy-MM-dd') + ' 00:00:00',
      endTime: format(endDate, 'yyyy-MM-dd') + ' 23:59:59',
      exportTime: format(now, 'yyyy-MM-dd HH:mm:ss'),
      exportUser: '系統自動',
      status: 'processing' as const,
      columns: selectedColumns
    }

    // 新增到報表列表最前面
    setReportList(prev => [newReport, ...prev])

    // 關閉 popover
    setIsColumnPopoverOpen(false)

    // 模擬報表處理完成（3秒後）
    setTimeout(() => {
      setReportList(prev => 
        prev.map(report => 
          report.id === newReportId 
            ? { ...report, status: 'completed' as const }
            : report
        )
      )
    }, 3000)

    console.log('產生報表', {
      startDate,
      endDate,
      selectedColumns
    })
  }

  const handleDownload = (reportId: string) => {
    console.log('下載報表:', reportId)
    // 這裡實作下載功能
    alert(`下載報表 ${reportId}`)
  }

  return (
    <div className="bg-white px-6 pt-6">
      {/* 篩選條件 */}
      <div className="mb-6">
        <div className="flex items-center gap-6">
          {/* 期間選擇 */}
          <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center border border-gray-300 rounded hover:border-[#409eff] bg-white px-3 py-2 cursor-pointer w-[400px]">
                <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  readOnly
                  placeholder="開始日期"
                  value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 cursor-pointer bg-transparent"
                />
                <span className="mx-2 text-gray-400">至</span>
                <input
                  type="text"
                  readOnly
                  placeholder="結束日期"
                  value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 cursor-pointer bg-transparent"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex">
                {/* 兩個並排的日曆 */}
                <div className="p-3">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleDateSelect}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                  />
                </div>
                <div className="p-3 border-l">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleDateSelect}
                    month={addMonths(currentMonth, 1)}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* 選擇匯出欄位 */}
          <Popover open={isColumnPopoverOpen} onOpenChange={setIsColumnPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-white hover:border-[#409eff] px-3 py-2 h-auto"
              >
                選擇匯出欄位
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[800px] p-4" align="start">
              {/* 頂部操作按鈕 */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b">
                <span className="text-sm text-gray-700">選擇匯出欄位</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                    className="h-7 text-xs"
                    style={{ color: '#409eff' }}
                  >
                    全選
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="h-7 text-xs"
                    style={{ color: '#409eff' }}
                  >
                    清除
                  </Button>
                </div>
              </div>
              
              {/* 多列 Checkbox 網格 */}
              <div className="grid grid-cols-4 gap-x-4 gap-y-3 mb-4">
                {exportColumns.map(column => (
                  <div key={column.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`popup-${column.id}`}
                      checked={selectedColumns.includes(column.id)}
                      onCheckedChange={() => handleColumnToggle(column.id)}
                    />
                    <Label 
                      htmlFor={`popup-${column.id}`}
                      className="cursor-pointer text-sm whitespace-nowrap"
                    >
                      {column.label}
                    </Label>
                  </div>
                ))}
              </div>

              {/* 底部匯出按鈕 */}
              <div className="flex justify-end pt-3 border-t">
                <Button 
                  onClick={handleGenerateReport}
                  style={{ backgroundColor: '#409eff' }}
                  className="text-white px-6"
                >
                  匯出
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* 產生報表按鈕 - 移除 */}
          {/* <Button 
            onClick={handleGenerateReport}
            style={{ backgroundColor: '#409eff' }}
            className="text-white px-6 ml-auto"
          >
            產生報表
          </Button> */}
        </div>
      </div>

      {/* 報表列表 */}
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">ID</TableHead>
              <TableHead>開始時間</TableHead>
              <TableHead>結束時間</TableHead>
              <TableHead>匯出時間</TableHead>
              <TableHead className="w-32">匯出人員</TableHead>
              <TableHead className="w-32">處理狀況</TableHead>
              <TableHead className="w-32 text-center">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportList.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.startTime}</TableCell>
                <TableCell>{report.endTime}</TableCell>
                <TableCell>{report.exportTime}</TableCell>
                <TableCell>{report.exportUser}</TableCell>
                <TableCell>
                  {report.status === 'completed' ? '已完成' : ''}
                </TableCell>
                <TableCell className="text-center">
                  {report.status === 'completed' && (
                    <Button
                      size="sm"
                      onClick={() => handleDownload(report.id)}
                      style={{ backgroundColor: '#409eff' }}
                      className="text-white hover:opacity-90"
                    >
                      下載
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}