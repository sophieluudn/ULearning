import { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, Search, ArrowUpDown } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'

interface CouponSettingsProps {
  couponId: string
  onBack: () => void
}

type ViewTab = 'basic' | 'app-serial' | 'web-serial'

// 模擬序號資料
const mockSerialData = [
  { id: 'GTZVYSARSHGP', memberCode: '', udnId: '', enrollTime: '', redeemTime: '', validityPeriod: '2026/11/30 23:59:59', status: '上架', passphrase: '', remark: '', createdTime: '2025/11/26 18:18:32', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GTZVYSARSHGP' },
  { id: 'GTZVS6AMAVPM', memberCode: '', udnId: '', enrollTime: '', redeemTime: '', validityPeriod: '2026/11/30 23:59:59', status: '上架', passphrase: '', remark: '', createdTime: '2025/11/26 18:18:32', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GTZVS6AMAVPM' },
  { id: 'GTZVKGQL99AQ', memberCode: '', udnId: '', enrollTime: '', redeemTime: '', validityPeriod: '2026/11/30 23:59:59', status: '上架', passphrase: '', remark: '', createdTime: '2025/11/26 18:18:32', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GTZVKGQL99AQ' },
  { id: 'GTZV43XSGQLH', memberCode: '', udnId: '', enrollTime: '', redeemTime: '', validityPeriod: '2026/11/30 23:59:59', status: '上架', passphrase: '', remark: '', createdTime: '2025/11/26 18:18:32', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GTZV43XSGQLH' },
]

export function CouponSettings({ couponId, onBack }: CouponSettingsProps) {
  const [currentView, setCurrentView] = useState<ViewTab>('basic')
  const [status, setStatus] = useState<string>('active')
  const [useValidityPeriod, setUseValidityPeriod] = useState<string>('no')
  const [displayName, setDisplayName] = useState<string>('')
  const [internalName, setInternalName] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [projectStartDate, setProjectStartDate] = useState<Date>()
  const [projectEndDate, setProjectEndDate] = useState<Date>()
  const [couponValue, setCouponValue] = useState<string>('')
  const [couponQuantity, setCouponQuantity] = useState<string>('')
  const [couponStartDate, setCouponStartDate] = useState<Date>()
  const [couponEndDate, setCouponEndDate] = useState<Date>()
  const [extensionDate, setExtensionDate] = useState<Date>()
  const [type, setType] = useState<string>('')
  const [redemptionCondition, setRedemptionCondition] = useState<string>('')
  const [entryTime, setEntryTime] = useState<Date>()
  const [generateQRCode, setGenerateQRCode] = useState<string>('no')
  const [remark, setRemark] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [pageSize, setPageSize] = useState<string>('25')
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  
  // 序號詳情彈窗狀態
  const [serialDialogOpen, setSerialDialogOpen] = useState(false)
  const [selectedSerial, setSelectedSerial] = useState<any>(null)
  const [serialStatus, setSerialStatus] = useState<string>('上架')
  const [serialRemark, setSerialRemark] = useState<string>('')

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSubmit = () => {
    console.log('提交優惠券設定')
  }

  const handleCancel = () => {
    onBack()
  }

  const handleSerialClick = (serial: any) => {
    setSelectedSerial(serial)
    setSerialStatus(serial.status)
    setSerialRemark(serial.remark)
    setSerialDialogOpen(true)
  }

  const handleSerialDialogSave = () => {
    console.log('保存序號資訊:', {
      id: selectedSerial?.id,
      status: serialStatus,
      remark: serialRemark
    })
    setSerialDialogOpen(false)
  }

  const handleSerialDialogCancel = () => {
    setSerialDialogOpen(false)
  }

  return (
    <div className="bg-white px-6 py-6">
      {/* 頂部標籤 */}
      <div className="mb-4 flex items-center space-x-4 border-b border-gray-200 pb-3">
        <button 
          className={`text-sm ${currentView === 'basic' ? 'text-gray-700' : ''}`}
          style={currentView === 'basic' ? {} : { color: '#409eff' }}
          onClick={() => setCurrentView('basic')}
        >
          基本資料
        </button>
        <button 
          className="text-sm hover:underline" 
          style={currentView === 'app-serial' ? {} : { color: '#409eff' }}
          onClick={() => setCurrentView('app-serial')}
        >
          APP 優惠券序號列表
        </button>
        <button 
          className="text-sm hover:underline" 
          style={currentView === 'web-serial' ? {} : { color: '#409eff' }}
          onClick={() => setCurrentView('web-serial')}
        >
          Web 優惠券序號列表
        </button>
      </div>

      {/* 基本資料視圖 */}
      {currentView === 'basic' && (

      <div className="max-w-4xl">
        {/* ID */}
        <div className="mb-6 flex items-center">
          <label className="w-40 text-right pr-4 text-sm text-gray-700">ID</label>
          <span className="text-sm text-gray-900">{couponId}</span>
        </div>

        {/* 狀態 */}
        <div className="mb-6 flex items-center">
          <label className="w-40 text-right pr-4 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">狀態</span>
          </label>
          <RadioGroup value={status} onValueChange={setStatus} className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="status-active" />
              <Label htmlFor="status-active" className="cursor-pointer text-sm">上架</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inactive" id="status-inactive" />
              <Label htmlFor="status-inactive" className="cursor-pointer text-sm">下架</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 通關密語 */}
        <div className="mb-6 flex items-center">
          <label className="w-40 text-right pr-4 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">通關密語</span>
          </label>
          <RadioGroup value={useValidityPeriod} onValueChange={setUseValidityPeriod} className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="validity-yes" />
              <Label htmlFor="validity-yes" className="cursor-pointer text-sm">啟用</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="validity-no" />
              <Label htmlFor="validity-no" className="cursor-pointer text-sm">不啟用</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 專案名稱顯示用 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">專案名稱顯示用</span>
          </label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="【測試】非正規優惠券會員優惠專案"
            className="flex-1 max-w-md bg-gray-50 border-gray-300"
          />
        </div>

        {/* 專案名稱內部使用 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">專案名稱內部使用</span>
          </label>
          <Input
            value={internalName}
            onChange={(e) => setInternalName(e.target.value)}
            placeholder="【測試】非正規優惠券會員優惠專案兌換"
            className="flex-1 max-w-md bg-gray-50 border-gray-300"
          />
        </div>

        {/* 專案內容 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">專案內容</span>
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="【測試】非正規優惠券會員"
            className="flex-1 max-w-2xl bg-gray-50 border-gray-300 min-h-[80px]"
          />
        </div>

        {/* 專案時期 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">專案時期</span>
          </label>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40 justify-start text-left bg-gray-50 border-gray-300">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {projectStartDate ? projectStartDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '2025/11/01'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={projectStartDate}
                  onSelect={setProjectStartDate}
                />
              </PopoverContent>
            </Popover>
            <span className="text-gray-500">~</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40 justify-start text-left bg-gray-50 border-gray-300">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {projectEndDate ? projectEndDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '2026/11/30'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={projectEndDate}
                  onSelect={setProjectEndDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* 優惠券面額 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">優惠券面額(單筆價值)</span>
          </label>
          <Input
            value={couponValue}
            onChange={(e) => setCouponValue(e.target.value)}
            placeholder="3200"
            className="w-40 bg-gray-50 border-gray-300"
            type="number"
          />
        </div>

        {/* 優惠券數量 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">優惠券數量</span>
          </label>
          <Input
            value={couponQuantity}
            onChange={(e) => setCouponQuantity(e.target.value)}
            placeholder="10"
            className="w-40 bg-gray-50 border-gray-300"
            type="number"
          />
        </div>

        {/* 優惠券期限 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">優惠券期限</span>
          </label>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40 justify-start text-left bg-gray-50 border-gray-300">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {couponStartDate ? couponStartDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '2025/11/01'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={couponStartDate}
                  onSelect={setCouponStartDate}
                />
              </PopoverContent>
            </Popover>
            <span className="text-gray-500">~</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40 justify-start text-left bg-gray-50 border-gray-300">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {couponEndDate ? couponEndDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '2026/11/30'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={couponEndDate}
                  onSelect={setCouponEndDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* 優惠券期限延長 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm text-gray-700">優惠券期限延長</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-40 justify-start text-left bg-white border-gray-300">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {extensionDate ? extensionDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '請選擇日期'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={extensionDate}
                onSelect={setExtensionDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* 類型 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm">
            <span className="text-red-500">* </span>
            <span className="text-gray-700">類型</span>
          </label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-60 bg-gray-50 border-gray-300">
              <SelectValue placeholder="國際券" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">公關券</SelectItem>
              <SelectItem value="marketing">行銷專案</SelectItem>
              <SelectItem value="group">團購券</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 優惠券兌換條件設定 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm text-gray-700">優惠券兌換條件設定</label>
          <Select value={redemptionCondition} onValueChange={setRedemptionCondition}>
            <SelectTrigger className="w-96 bg-white border-gray-300">
              <SelectValue placeholder="【測試】非正規優惠券會員" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="test">【測試】非正規優惠券會員</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 入帳時間 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm text-gray-700">入帳時間</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-40 justify-start text-left bg-white border-gray-300">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {entryTime ? entryTime.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '請選擇日期'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={entryTime}
                onSelect={setEntryTime}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* 產生 QR code */}
        <div className="mb-6 flex items-center">
          <label className="w-40 text-right pr-4 text-sm text-gray-700">產生 QR code</label>
          <RadioGroup value={generateQRCode} onValueChange={setGenerateQRCode} className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="qr-yes" />
              <Label htmlFor="qr-yes" className="cursor-pointer text-sm">是</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="qr-no" />
              <Label htmlFor="qr-no" className="cursor-pointer text-sm">否</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 備註 */}
        <div className="mb-6 flex items-start">
          <label className="w-40 text-right pr-4 pt-2 text-sm text-gray-700">備註</label>
          <Textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="請輸入文字"
            className="flex-1 max-w-2xl bg-white border-gray-300 min-h-[120px]"
          />
        </div>

        {/* 按鈕區域 */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button 
            variant="outline" 
            className="px-6"
            onClick={handleCancel}
          >
            取消
          </Button>
          <Button 
            className="px-6 text-white"
            style={{ backgroundColor: '#409eff' }}
            onClick={handleSubmit}
          >
            送出
          </Button>
        </div>
      </div>
      )}

      {/* 序號列表視圖 */}
      {currentView === 'app-serial' && (
        <div>
          {/* 工具列 */}
          <div className="mb-4 flex items-center justify-end space-x-4">
            <Button 
              variant="outline" 
              className="px-4 py-2 bg-white border-gray-300"
            >
              匯出
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">每頁顯示筆數</span>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-20 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="關鍵字"
              className="w-48 bg-white border-gray-300"
            />
            <Button 
              variant="outline" 
              className="px-3 bg-white border-gray-300"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* 表格 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-sm text-gray-700">序號</TableHead>
                  <TableHead className="text-sm text-gray-700">會員代號</TableHead>
                  <TableHead className="text-sm text-gray-700">udn ID</TableHead>
                  <TableHead className="text-sm text-gray-700">
                    <button 
                      className="flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort('enrollTime')}
                    >
                      <span>隨戶時間</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm text-gray-700">
                    <button 
                      className="flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort('redeemTime')}
                    >
                      <span>兌換時間</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm text-gray-700">
                    <button 
                      className="flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort('validityPeriod')}
                    >
                      <span>使用期限</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm text-gray-700">
                    <button 
                      className="flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort('status')}
                    >
                      <span>狀態</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm text-gray-700">通關密語</TableHead>
                  <TableHead className="text-sm text-gray-700">備註</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSerialData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <TableCell>
                      <a 
                        href="#" 
                        className="text-sm hover:underline"
                        style={{ color: '#409eff' }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleSerialClick(row)
                        }}
                      >
                        {row.id}
                      </a>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{row.memberCode || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.udnId || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.enrollTime || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.redeemTime || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.validityPeriod}</TableCell>
                    <TableCell>
                      <span className="text-sm" style={{ color: '#67c23a' }}>{row.status}</span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{row.passphrase || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.remark || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Web 序號列表視圖 */}
      {currentView === 'web-serial' && (
        <div>
          {/* 工具列 */}
          <div className="mb-4 flex items-center justify-end space-x-4">
            <Button 
              variant="outline" 
              className="px-4 py-2 bg-white border-gray-300"
            >
              匯出
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">每頁顯示筆數</span>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-20 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="關鍵字"
              className="w-48 bg-white border-gray-300"
            />
            <Button 
              variant="outline" 
              className="px-3 bg-white border-gray-300"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* 表格 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-sm text-gray-700">序號</TableHead>
                  <TableHead className="text-sm text-gray-700">會員代號</TableHead>
                  <TableHead className="text-sm text-gray-700">udn ID</TableHead>
                  <TableHead className="text-sm text-gray-700">
                    <button 
                      className="flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort('enrollTime')}
                    >
                      <span>隨戶時間</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm text-gray-700">
                    <button 
                      className="flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort('redeemTime')}
                    >
                      <span>兌換時間</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm text-gray-700">
                    <button 
                      className="flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort('validityPeriod')}
                    >
                      <span>使用期限</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm text-gray-700">
                    <button 
                      className="flex items-center space-x-1 hover:text-gray-900"
                      onClick={() => handleSort('status')}
                    >
                      <span>狀態</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm text-gray-700">通關密語</TableHead>
                  <TableHead className="text-sm text-gray-700">備註</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSerialData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <TableCell>
                      <a 
                        href="#" 
                        className="text-sm hover:underline"
                        style={{ color: '#409eff' }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleSerialClick(row)
                        }}
                      >
                        {row.id}
                      </a>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{row.memberCode || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.udnId || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.enrollTime || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.redeemTime || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.validityPeriod}</TableCell>
                    <TableCell>
                      <span className="text-sm" style={{ color: '#67c23a' }}>{row.status}</span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{row.passphrase || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-700">{row.remark || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* 序號詳情彈窗 */}
      <Dialog open={serialDialogOpen} onOpenChange={setSerialDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>優惠券序號</DialogTitle>
            <DialogDescription className="sr-only">
              查看和編輯優惠券序號詳細資訊
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-[30px] py-4">
            {/* 優惠券序號標題 */}
            <div className="text-sm text-gray-600">優惠券序號</div>
            
            {/* 狀態 */}
            <div className="flex items-center space-x-8">
              <span className="text-sm text-gray-600 w-20">狀態</span>
              <RadioGroup value={serialStatus} onValueChange={setSerialStatus} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="上架" id="status-active" />
                  <Label htmlFor="status-active" className="text-sm cursor-pointer">上架</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="下架" id="status-inactive" />
                  <Label htmlFor="status-inactive" className="text-sm cursor-pointer">下架</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 序號 */}
            <div className="flex items-center space-x-8">
              <span className="text-sm text-gray-600 w-20">序號</span>
              <div className="text-sm text-gray-900">{selectedSerial?.id}</div>
            </div>

            {/* QR code */}
            <div className="flex items-start space-x-8">
              <span className="text-sm text-gray-600 w-20 pt-2">QR code</span>
              <div>
                <img 
                  src={selectedSerial?.qrCode} 
                  alt="QR Code" 
                  className="w-32 h-32"
                />
              </div>
            </div>

            {/* 產生時間 */}
            <div className="flex items-center space-x-8">
              <span className="text-sm text-gray-600 w-20">產生時間</span>
              <div className="text-sm text-gray-900">{selectedSerial?.createdTime}</div>
            </div>

            {/* 使用期限 */}
            <div className="flex items-center space-x-8">
              <span className="text-sm text-gray-600 w-20">使用期限</span>
              <div className="text-sm text-gray-900">{selectedSerial?.validityPeriod}</div>
            </div>

            {/* 備註 */}
            <div className="flex items-start space-x-8">
              <span className="text-sm text-gray-600 w-20 pt-2">備註</span>
              <Textarea
                value={serialRemark}
                onChange={(e) => setSerialRemark(e.target.value)}
                placeholder="請輸入"
                className="flex-1 bg-white border-gray-300"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleSerialDialogCancel}
              className="px-6"
            >
              取消
            </Button>
            <Button 
              onClick={handleSerialDialogSave}
              className="px-6"
              style={{ backgroundColor: '#409eff', color: 'white' }}
            >
              確認
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
