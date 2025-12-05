import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, Plus, Trash2 } from 'lucide-react'

interface CouponCreateProps {
  onClose: () => void
  onSave: () => void
}

interface CourseItem {
  id: string
  course: string
  price: string
}

export function CouponCreate({ onClose, onSave }: CouponCreateProps) {
  // Tab狀態
  const [currentTab, setCurrentTab] = useState('basic')
  
  // 基本資料
  const [status, setStatus] = useState('active')
  const [appEnabled, setAppEnabled] = useState('enabled')
  const [showDisplayNameEnabled, setShowDisplayNameEnabled] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [internalName, setInternalName] = useState('')
  const [content, setContent] = useState('')
  
  // 日期相關
  const [projectStartDate, setProjectStartDate] = useState<Date>()
  const [projectEndDate, setProjectEndDate] = useState<Date>()
  const [couponStartDate, setCouponStartDate] = useState<Date>()
  const [couponEndDate, setCouponEndDate] = useState<Date>()
  const [extensionDate, setExtensionDate] = useState<Date>()
  
  // 優惠券面額和數量
  const [couponValue, setCouponValue] = useState('0')
  const [couponQuantity, setCouponQuantity] = useState('0')
  
  // 地點
  const [location, setLocation] = useState('mobile-library')
  
  // 兌換設定
  const [redemptionTab, setRedemptionTab] = useState('all') // 'all' 或 'specific'
  const [courses, setCourses] = useState<CourseItem[]>([])
  const [currentCourse, setCurrentCourse] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [minPrice, setMinPrice] = useState('0')
  const [maxPrice, setMaxPrice] = useState('99999')
  
  // 其他設定
  const [printPaper, setPrintPaper] = useState('no')
  const [generateQRCode, setGenerateQRCode] = useState('no')
  const [remark, setRemark] = useState('')

  const handleAddCourse = () => {
    if (currentCourse && currentPrice) {
      const newCourse: CourseItem = {
        id: Date.now().toString(),
        course: currentCourse,
        price: currentPrice
      }
      setCourses([...courses, newCourse])
      setCurrentCourse('')
      setCurrentPrice('')
    }
  }

  const handleRemoveCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const handleSave = () => {
    console.log('儲存優惠券')
    onSave()
  }

  const getTotalAmount = () => {
    return courses.reduce((sum, course) => sum + (parseFloat(course.price) || 0), 0)
  }

  return (
    <div className="bg-white px-6 py-6">
      {/* 頂部標籤 */}
      <div className="mb-4 flex items-center space-x-4 border-b border-gray-200 pb-3">
        <button 
          className={`text-sm ${currentTab === 'basic' ? 'text-gray-700' : ''}`}
          style={currentTab === 'basic' ? {} : { color: '#409eff' }}
          onClick={() => setCurrentTab('basic')}
        >
          基本資料
        </button>
      </div>

      {/* 基本資料視圖 */}
      {currentTab === 'basic' && (
        <div className="max-w-4xl">
        <div className="space-y-6">
          {/* 狀態 */}
          <div className="flex items-center">
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

          {/* 應用端選擇 */}
          <div className="flex items-center">
            <label className="w-40 text-right pr-4 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">應用端選擇</span>
            </label>
            <RadioGroup value={appEnabled} onValueChange={setAppEnabled} className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enabled" id="app-enabled" />
                <Label htmlFor="app-enabled" className="cursor-pointer text-sm">啟用</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled" id="app-disabled" />
                <Label htmlFor="app-disabled" className="cursor-pointer text-sm">不啟用</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 專案名稱顯示用 */}
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">專案名稱顯示用</span>
            </label>
            <div className="flex-1 max-w-md space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-display-name"
                  checked={showDisplayNameEnabled}
                  onCheckedChange={(checked) => setShowDisplayNameEnabled(checked as boolean)}
                />
                <Label htmlFor="show-display-name" className="text-sm text-gray-700 cursor-pointer">顯示</Label>
              </div>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="請輸入"
                className="bg-gray-50 border-gray-300"
              />
            </div>
          </div>

          {/* 專案名稱內部用 */}
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">專案名稱內部用</span>
            </label>
            <Input
              value={internalName}
              onChange={(e) => setInternalName(e.target.value)}
              placeholder="請輸入"
              className="flex-1 max-w-md bg-gray-50 border-gray-300"
            />
          </div>

          {/* 專案內容 */}
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">專案內容</span>
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder=""
              className="flex-1 max-w-2xl bg-gray-50 border-gray-300 min-h-[100px]"
            />
          </div>

          {/* 專案期間 */}
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">專案期間</span>
            </label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-40 justify-start text-left bg-gray-50 border-gray-300">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {projectStartDate ? projectStartDate.toLocaleDateString('zh-TW') : '請選擇日期'}
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
                    {projectEndDate ? projectEndDate.toLocaleDateString('zh-TW') : '請選擇日期'}
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
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">優惠券面額</span>
            </label>
            <Input
              value={couponValue}
              onChange={(e) => setCouponValue(e.target.value)}
              type="number"
              className="w-40 bg-gray-50 border-gray-300"
            />
          </div>

          {/* 優惠券數量 */}
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">優惠券數量</span>
            </label>
            <Input
              value={couponQuantity}
              onChange={(e) => setCouponQuantity(e.target.value)}
              type="number"
              className="w-40 bg-gray-50 border-gray-300"
            />
          </div>

          {/* 優惠券期限 */}
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">優惠券期限</span>
            </label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-40 justify-start text-left bg-gray-50 border-gray-300">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {couponStartDate ? couponStartDate.toLocaleDateString('zh-TW') : '請選擇日期'}
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
                    {couponEndDate ? couponEndDate.toLocaleDateString('zh-TW') : '請選擇日期'}
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
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm text-gray-700">優惠券期限延長</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40 justify-start text-left bg-white border-gray-300">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {extensionDate ? extensionDate.toLocaleDateString('zh-TW') : '請選擇日期'}
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

          {/* 地點 */}
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm">
              <span className="text-red-500">* </span>
              <span className="text-gray-700">地點</span>
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-60 bg-gray-50 border-gray-300">
                <SelectValue placeholder="行動圖書館" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile-library">行動圖書館</SelectItem>
                <SelectItem value="main-library">總館</SelectItem>
                <SelectItem value="branch-library">分館</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 優惠券兌換設定 */}
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm text-gray-700">優惠券兌換設定</label>
            <div className="flex-1 max-w-3xl">
              {/* 標籤切換 */}
              <div className="flex items-center space-x-4 mb-4">
                <button
                  className={`text-sm px-3 py-1 ${redemptionTab === 'all' ? 'text-gray-700' : ''}`}
                  style={redemptionTab === 'all' ? {} : { color: '#409eff' }}
                  onClick={() => setRedemptionTab('all')}
                >
                  全部上架顯示管理設總
                </button>
                <button
                  className={`text-sm px-3 py-1 ${redemptionTab === 'specific' ? 'text-gray-700' : ''}`}
                  style={redemptionTab === 'specific' ? {} : { color: '#409eff' }}
                  onClick={() => setRedemptionTab('specific')}
                >
                  指定兌換總額
                </button>
              </div>

              {redemptionTab === 'specific' && (
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  {/* 課程選擇區域 */}
                  <div className="flex items-center space-x-3">
                    <Select value={currentCourse} onValueChange={setCurrentCourse}>
                      <SelectTrigger className="w-32 bg-white border-gray-300">
                        <SelectValue placeholder="請選擇" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course1">課程1</SelectItem>
                        <SelectItem value="course2">課程2</SelectItem>
                        <SelectItem value="course3">課程3</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="w-32 bg-white border-gray-300">
                        <SelectValue placeholder="價格表" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price1">價格1</SelectItem>
                        <SelectItem value="price2">價格2</SelectItem>
                      </SelectContent>
                    </Select>

                    <span className="text-sm text-gray-600">取得</span>
                    
                    <Input
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      type="number"
                      className="w-20 bg-white border-gray-300"
                    />
                    
                    <span className="text-gray-500">~</span>
                    
                    <Input
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      type="number"
                      className="w-20 bg-white border-gray-300"
                    />
                    
                    <span className="text-sm text-gray-600">元</span>
                    
                    <Button 
                      size="sm"
                      onClick={handleAddCourse}
                      style={{ backgroundColor: '#409eff' }}
                      className="text-white"
                    >
                      新增課程
                    </Button>
                  </div>

                  {/* 兩欄佈局：左側課程列表，右側課程總額 */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* 左側：課程列表 */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Button 
                          size="sm" 
                          variant="link" 
                          style={{ color: '#409eff' }}
                          className="p-0 h-auto"
                        >
                          全選
                        </Button>
                      </div>
                      <Textarea
                        value={courses.map(c => `${c.course}: ${c.price}元`).join('\n')}
                        readOnly
                        className="min-h-[300px] bg-white border-gray-300 text-sm"
                        placeholder="請輸入課程"
                      />
                    </div>

                    {/* 右側：課程總額 */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">課程總額</span>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="h-auto px-2 py-1"
                        >
                          全部刪除
                        </Button>
                      </div>
                      <div className="border border-gray-300 rounded min-h-[300px] bg-white p-3">
                        {courses.length === 0 ? (
                          <p className="text-sm text-gray-400">尚未新增課程</p>
                        ) : (
                          <div className="space-y-2">
                            {courses.map((course) => (
                              <div key={course.id} className="flex items-center justify-between text-sm">
                                <span className="text-gray-700">{course.course}: {course.price}元</span>
                                <button
                                  onClick={() => handleRemoveCourse(course.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 指定和明細按鈕 */}
                  <div className="flex justify-end space-x-2">
                    <Button 
                      size="sm" 
                      variant="link"
                      style={{ color: '#409eff' }}
                      className="p-0 h-auto"
                    >
                      指定
                    </Button>
                    <Button 
                      size="sm" 
                      variant="link"
                      className="p-0 h-auto text-gray-600"
                    >
                      明細
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 是否印製紙本優惠券 */}
          <div className="flex items-center">
            <label className="w-40 text-right pr-4 text-sm text-gray-700">是否印製紙本優惠券</label>
            <RadioGroup value={printPaper} onValueChange={setPrintPaper} className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="print-yes" />
                <Label htmlFor="print-yes" className="cursor-pointer text-sm">是</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="print-no" />
                <Label htmlFor="print-no" className="cursor-pointer text-sm">否</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 產生 QR code */}
          <div className="flex items-center">
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
          <div className="flex items-start">
            <label className="w-40 text-right pr-4 pt-2 text-sm text-gray-700">備註</label>
            <Textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="請輸入文字"
              className="flex-1 max-w-2xl bg-white border-gray-300 min-h-[100px]"
            />
          </div>
        </div>

        {/* 底部按鈕 */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6"
          >
            取消
          </Button>
          <Button 
            onClick={handleSave}
            style={{ backgroundColor: '#409eff' }}
            className="text-white px-6"
          >
            確認
          </Button>
        </div>
        </div>
      )}
    </div>
  )
}
