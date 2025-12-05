import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Textarea } from './ui/textarea'
import { RefreshCw, ArrowUpDown, Plus, X } from 'lucide-react'
import { DateTimeRangePicker } from './date-time-range-picker'

interface MarketingPosition {
  id: number
  title: string
  position: string
  type: string
  category: string
  limit: string
  weight: number
  status: string
  remarks: string
}

// 模擬資料
const mockPositions: MarketingPosition[] = [
  {
    id: 309,
    title: '更新的 banner',
    position: '品牌首頁輪播圖',
    type: 'banner',
    category: '-',
    limit: '-',
    weight: 99,
    status: '上架',
    remarks: ''
  },
  {
    id: 308,
    title: '測試C banner',
    position: '品牌首頁輪播圖',
    type: 'banner',
    category: '-',
    limit: '-',
    weight: 99,
    status: '上架',
    remarks: ''
  },
  {
    id: 300,
    title: '矢量',
    position: '品牌前端單字',
    type: 'msg',
    category: '-',
    limit: '-',
    weight: 1,
    status: '上架',
    remarks: ''
  },
  {
    id: 299,
    title: '實發',
    position: '品牌前端單字',
    type: 'msg',
    category: '-',
    limit: '-',
    weight: 1,
    status: '上架',
    remarks: ''
  },
  {
    id: 298,
    title: '品牌首下方行銷版',
    position: '品牌首下方行銷版',
    type: 'banner',
    category: '-',
    limit: '-',
    weight: 1,
    status: '上架',
    remarks: ''
  },
  {
    id: 297,
    title: '品牌首頁首輪播圖3',
    position: '品牌首頁輪播圖',
    type: 'banner',
    category: '-',
    limit: '-',
    weight: 1,
    status: '上架',
    remarks: ''
  }
]

// U 好學 (總館) 的模擬資料
const mockPositionsUhowschool: MarketingPosition[] = [
  {
    id: 401,
    title: 'U好學首頁輪播',
    position: '品牌館首頁輪播圖',
    type: 'banner',
    category: '-',
    limit: '-',
    weight: 100,
    status: '上架',
    remarks: ''
  },
  {
    id: 402,
    title: 'U好學關鍵字',
    position: '品牌館關鍵字',
    type: 'msg',
    category: '-',
    limit: '-',
    weight: 50,
    status: '上架',
    remarks: ''
  },
  {
    id: 403,
    title: 'U好學上方行銷',
    position: '品牌館上方行銷區',
    type: 'banner',
    category: '-',
    limit: '-',
    weight: 80,
    status: '上架',
    remarks: ''
  },
  {
    id: 404,
    title: 'U好學下方行銷',
    position: '品牌館下方行銷區',
    type: 'banner',
    category: '-',
    limit: '-',
    weight: 60,
    status: '上架',
    remarks: ''
  }
]

interface MarketingPositionsProps {
  selectedVenue?: string
}

export function MarketingPositions({ selectedVenue = '元氣館' }: MarketingPositionsProps) {
  const [itemsPerPage, setItemsPerPage] = useState('25')
  const [positionFilter, setPositionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('published')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // 表單狀態
  const [formStatus, setFormStatus] = useState('下架')
  const [formTitle, setFormTitle] = useState('')
  const [formPosition, setFormPosition] = useState('')
  const [formPositionType, setFormPositionType] = useState('純文字')
  const [formTextContent, setFormTextContent] = useState('')
  const [formOpenMethod, setFormOpenMethod] = useState('action(in-app)')
  const [formProductType, setFormProductType] = useState('產品頁')
  const [formKeyword, setFormKeyword] = useState('')
  const [formWeight, setFormWeight] = useState('1')
  const [formRemarks, setFormRemarks] = useState('')
  const [formStartDate, setFormStartDate] = useState<Date | null>(null)
  const [formEndDate, setFormEndDate] = useState<Date | null>(null)
  const [formPopupFrequency, setFormPopupFrequency] = useState('每次訪問')
  const [formPopupDelay, setFormPopupDelay] = useState('0')
  const [formPopupOpenCount, setFormPopupOpenCount] = useState('一天一次')
  const [formImageFile, setFormImageFile] = useState<File | null>(null)
  const [formImagePreview, setFormImagePreview] = useState<string | null>(null)
  const [formContentTitle, setFormContentTitle] = useState('')
  const [formContentDescription, setFormContentDescription] = useState('')
  const [formButtonText, setFormButtonText] = useState('')

  // 判斷是否為總館彈出視窗
  const isPopupPosition = formPosition === 'brand-popup'

  // 根據選擇的館別取得對應的資料
  const displayPositions = selectedVenue === 'U 好學 (總館)' 
    ? mockPositionsUhowschool 
    : mockPositions

  const handleCreateNew = () => {
    console.log('新增資料')
    // 實作新增功能
    setIsDialogOpen(true)
  }

  const handleRefresh = () => {
    console.log('重新整理')
    // 實作重新整理功能
  }

  const handleSearch = () => {
    console.log('搜尋:', searchKeyword)
    // 實作搜尋功能
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    setFormImageFile(null)
    setFormImagePreview(null)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setFormStatus('下架')
    setFormTitle('')
    setFormPosition('')
    setFormPositionType('純文字')
    setFormTextContent('')
    setFormOpenMethod('action(in-app)')
    setFormProductType('產品頁')
    setFormKeyword('')
    setFormWeight('1')
    setFormRemarks('')
    setFormStartDate(null)
    setFormEndDate(null)
    setFormPopupFrequency('每次訪問')
    setFormPopupDelay('0')
    setFormPopupOpenCount('一天一次')
    setFormImageFile(null)
    setFormImagePreview(null)
    setFormContentTitle('')
    setFormContentDescription('')
    setFormButtonText('')
  }

  const handleDialogSave = () => {
    console.log('儲存新資料:', {
      status: formStatus,
      title: formTitle,
      position: formPosition,
      type: formPositionType,
      textContent: formTextContent,
      openMethod: formOpenMethod,
      productType: formProductType,
      keyword: formKeyword,
      weight: formWeight,
      remarks: formRemarks,
      startDate: formStartDate,
      endDate: formEndDate,
      popupFrequency: formPopupFrequency,
      popupDelay: formPopupDelay,
      popupOpenCount: formPopupOpenCount,
      imageFile: formImageFile,
      imagePreview: formImagePreview,
      contentTitle: formContentTitle,
      contentDescription: formContentDescription,
      buttonText: formButtonText
    })
    // 實作儲存新資料功能
    setIsDialogOpen(false)
  }

  return (
    <div className="bg-white px-6 pt-6">
      {/* 操作列 */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {/* 左側：新增按鈕 */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCreateNew}
              size="icon"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full h-9 w-9"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <span className="text-gray-700">新增素材</span>
          </div>

          {/* 右側：篩選器和搜尋 */}
          <div className="flex items-center gap-3">
            {/* 筆數 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">筆數</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-20 h-8 bg-white border-gray-300">
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

            {/* 版位篩選 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">版位</span>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-44 h-8 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="brand-keyword">品牌館關鍵字</SelectItem>
                  <SelectItem value="brand-banner">品牌館首頁輪播圖</SelectItem>
                  <SelectItem value="brand-top">品牌館上方行銷區</SelectItem>
                  <SelectItem value="brand-bottom">品牌館下方行銷區</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 狀態篩選 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">狀態</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-24 h-8 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="published">上架</SelectItem>
                  <SelectItem value="draft">下架</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 搜尋區塊 */}
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="關鍵字"
                className="w-40 h-8 border-gray-300"
              />
            </div>

            {/* 重新整理按鈕 */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              className="h-8 w-8 border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 資料表格 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-20">ID</TableHead>
              <TableHead className="w-48">
                <div className="flex items-center gap-1">
                  標題
                  <ArrowUpDown className="h-3 w-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-40">版位</TableHead>
              <TableHead className="w-24">
                <div className="flex items-center gap-1">
                  型態
                  <ArrowUpDown className="h-3 w-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-24">
                <div className="flex items-center gap-1">
                  分類
                  <ArrowUpDown className="h-3 w-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-20">類型</TableHead>
              <TableHead className="w-24">
                <div className="flex items-center gap-1">
                  權重
                  <ArrowUpDown className="h-3 w-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-24">
                <div className="flex items-center gap-1">
                  狀態
                  <ArrowUpDown className="h-3 w-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead>備註</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayPositions.map((position) => (
              <TableRow key={position.id} className="hover:bg-gray-50">
                <TableCell>{position.id}</TableCell>
                <TableCell>
                  <a 
                    href="#" 
                    className="hover:underline" 
                    style={{ color: '#409eff' }}
                    onClick={(e) => {
                      e.preventDefault()
                      console.log('編輯:', position.id)
                    }}
                  >
                    {position.title}
                  </a>
                </TableCell>
                <TableCell>{position.position}</TableCell>
                <TableCell>{position.type}</TableCell>
                <TableCell>{position.category}</TableCell>
                <TableCell>{position.limit}</TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={position.weight}
                    readOnly
                    className="w-16 h-7 text-center border-gray-300 bg-white"
                  />
                </TableCell>
                <TableCell>
                  <span className="text-green-600">{position.status}</span>
                </TableCell>
                <TableCell>{position.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 新增素材對話框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto" hideCloseButton>
          <DialogHeader className="relative">
            <DialogTitle className="text-lg">行銷版位</DialogTitle>
            <DialogDescription className="sr-only">
              建立或編輯行銷版位素材
            </DialogDescription>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDialogClose}
              className="absolute right-0 top-0 h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* 發佈狀態 */}
            <div className="flex items-center gap-4">
              <Label className="text-sm text-gray-700 w-24 text-right">發佈狀態</Label>
              <RadioGroup
                value={formStatus}
                onValueChange={setFormStatus}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="上架" id="status-published" />
                  <Label htmlFor="status-published" className="text-sm cursor-pointer">上架</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="下架" id="status-draft" />
                  <Label htmlFor="status-draft" className="text-sm cursor-pointer">下架</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 顯示期間 */}
            <div className="flex items-center gap-4">
              <Label className="text-sm text-gray-700 w-24 text-right">顯示期間</Label>
              <div className="w-96">
                <DateTimeRangePicker
                  startDate={formStartDate}
                  endDate={formEndDate}
                  onChange={(start, end) => {
                    setFormStartDate(start)
                    setFormEndDate(end)
                  }}
                />
              </div>
            </div>

            {/* 標題 */}
            <div className="flex items-start gap-4">
              <Label className="text-sm text-gray-700 w-24 mt-2 text-right">
                <span className="text-red-500">*</span> 標題
              </Label>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="請輸入"
                className="flex-1 bg-white border-gray-300"
              />
            </div>

            {/* 版位 */}
            <div className="flex items-start gap-4">
              <Label className="text-sm text-gray-700 w-24 mt-2 text-right">
                <span className="text-red-500">*</span> 版位
              </Label>
              <Select 
                value={formPosition} 
                onValueChange={(value) => {
                  setFormPosition(value)
                  // 當選擇總館彈出視窗時，自動設定為圖片並調整開啟方式
                  if (value === 'brand-popup') {
                    setFormPositionType('圖片')
                    setFormOpenMethod('url')
                  }
                }}
              >
                <SelectTrigger className="flex-1 bg-white border-gray-300">
                  <SelectValue placeholder="請選擇版位" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand-countdown">總館全域倒數</SelectItem>
                  <SelectItem value="brand-keyword">總館關鍵字</SelectItem>
                  <SelectItem value="brand-banner">總館首頁輪播圖</SelectItem>
                  <SelectItem value="brand-top">總館上方行銷區</SelectItem>
                  <SelectItem value="brand-bottom">總館下方行銷區</SelectItem>
                  <SelectItem value="brand-popup">總館彈出視窗</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 版位型態 */}
            <div className="flex items-center gap-4">
              <Label className="text-sm text-gray-700 w-24 text-right">版位型態</Label>
              <RadioGroup
                value={formPositionType}
                onValueChange={setFormPositionType}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="純文字" id="type-text" disabled={isPopupPosition} />
                  <Label htmlFor="type-text" className={`text-sm ${isPopupPosition ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} style={{ color: isPopupPosition ? undefined : '#409eff' }}>純文字</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="圖片banner" id="type-banner" disabled={isPopupPosition} />
                  <Label htmlFor="type-banner" className={`text-sm ${isPopupPosition ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>圖片banner</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="文+圖" id="type-mixed" disabled={isPopupPosition} />
                  <Label htmlFor="type-mixed" className={`text-sm ${isPopupPosition ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>文+圖</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="code" id="type-code" disabled={isPopupPosition} />
                  <Label htmlFor="type-code" className={`text-sm ${isPopupPosition ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>code</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="圖片" id="type-image" />
                  <Label htmlFor="type-image" className="text-sm cursor-pointer">圖片</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 文字內容 - 總館彈出視窗時隱藏 */}
            {!isPopupPosition && (
              <div className="flex items-start gap-4">
                <Label className="text-sm text-gray-700 w-24 mt-2 text-right">文字內容</Label>
                <Textarea
                  value={formTextContent}
                  onChange={(e) => setFormTextContent(e.target.value)}
                  className="flex-1 min-h-[100px] bg-white border-gray-300"
                />
              </div>
            )}

            {/* 圖片上傳 - 只在總館彈出視窗時顯示 */}
            {isPopupPosition && (
              <>
                <div className="flex items-start gap-4">
                  <Label className="text-sm text-gray-700 w-24 mt-2 text-right">圖檔</Label>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-2">
                      圖片尺寸 <span className="text-red-500">w320 x h250</span>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                      {formImagePreview ? (
                        <div className="relative">
                          <img 
                            src={formImagePreview} 
                            alt="Preview" 
                            className="max-h-48 mx-auto rounded"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleImageRemove}
                            className="absolute top-2 right-2 bg-white hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-500 mb-2">將圖片拖曳至這裡</div>
                          <div className="text-gray-400 text-sm mb-4">或者選擇要上傳的圖片 (支援png及jpg)</div>
                          <Input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Label
                            htmlFor="image-upload"
                            className="inline-block px-4 py-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-50 text-sm"
                          >
                            選擇檔案
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 內容標題 - 只在總館彈出視窗時顯示 */}
                <div className="flex items-start gap-4">
                  <Label className="text-sm text-gray-700 w-24 mt-2 text-right">內容標題</Label>
                  <Input
                    value={formContentTitle}
                    onChange={(e) => setFormContentTitle(e.target.value)}
                    placeholder="請輸入內容標題"
                    className="flex-1 bg-white border-gray-300"
                  />
                </div>

                {/* 內容說明文字 - 只在總館彈出視窗時顯示 */}
                <div className="flex items-start gap-4">
                  <Label className="text-sm text-gray-700 w-24 mt-2 text-right">內容說明文字</Label>
                  <Textarea
                    value={formContentDescription}
                    onChange={(e) => setFormContentDescription(e.target.value)}
                    placeholder="請輸入內容說明文字"
                    className="flex-1 min-h-[100px] bg-white border-gray-300"
                  />
                </div>

                {/* 按鈕文字 - 只在總館彈出視窗時顯示 */}
                <div className="flex items-start gap-4">
                  <Label className="text-sm text-gray-700 w-24 mt-2 text-right">按鈕文字</Label>
                  <Input
                    value={formButtonText}
                    onChange={(e) => setFormButtonText(e.target.value)}
                    placeholder="請輸入按鈕文字"
                    className="flex-1 bg-white border-gray-300"
                  />
                </div>
              </>
            )}

            {/* 開啟方式 */}
            <div className="flex items-start gap-4">
              <Label className="text-sm text-gray-700 w-24 mt-2 text-right">
                <span className="text-red-500">*</span> 開啟方式
              </Label>
              <Select value={formOpenMethod} onValueChange={setFormOpenMethod}>
                <SelectTrigger className="flex-1 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="action">action (in-app)</SelectItem>
                  <SelectItem value="page">page (in-app-browser)</SelectItem>
                  <SelectItem value="url">url (瀏覽器)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 產品頁/看全部 - 總館彈出視窗時隱藏 */}
            {!isPopupPosition && (
              <div className="flex items-center gap-4">
                <Label className="text-sm text-gray-700 w-24 text-right"></Label>
                <RadioGroup
                  value={formProductType}
                  onValueChange={setFormProductType}
                  className="flex items-center gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="產品頁" id="product-page" />
                    <Label htmlFor="product-page" className="text-sm cursor-pointer" style={{ color: '#409eff' }}>產品頁</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="看全部" id="view-all" />
                    <Label htmlFor="view-all" className="text-sm cursor-pointer">看全部</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* 關鍵字 */}
            <div className="flex items-start gap-4">
              <Label className="text-sm text-gray-700 w-24 mt-2 text-right"></Label>
              <Input
                value={formKeyword}
                onChange={(e) => setFormKeyword(e.target.value)}
                placeholder="關鍵字"
                className="flex-1 bg-white border-gray-300"
              />
            </div>

            {/* 權重 */}
            <div className="flex items-start gap-4">
              <Label className="text-sm text-gray-700 w-24 mt-2 text-right">權重</Label>
              <Input
                type="number"
                value={formWeight}
                onChange={(e) => setFormWeight(e.target.value)}
                className="w-32 bg-white border-gray-300"
              />
            </div>

            {/* 備註 */}
            <div className="flex items-start gap-4">
              <Label className="text-sm text-gray-700 w-24 mt-2 text-right">備註</Label>
              <Textarea
                value={formRemarks}
                onChange={(e) => setFormRemarks(e.target.value)}
                placeholder="請輸入文字"
                className="flex-1 min-h-[100px] bg-white border-gray-300"
              />
            </div>

            {/* 彈出視窗設定 - 只在選擇「彈出視窗」時顯示 */}
            {formPositionType === '彈出視窗' && (
              <>
                {/* 彈出頻率 */}
                <div className="flex items-center gap-4">
                  <Label className="text-sm text-gray-700 w-24 text-right">彈出頻率</Label>
                  <Select value={formPopupFrequency} onValueChange={setFormPopupFrequency}>
                    <SelectTrigger className="flex-1 bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="每次訪問">每次訪問</SelectItem>
                      <SelectItem value="每天一次">每天一次</SelectItem>
                      <SelectItem value="每周一次">每周一次</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 彈出延遲 */}
                <div className="flex items-center gap-4">
                  <Label className="text-sm text-gray-700 w-24 text-right">彈出延遲</Label>
                  <Input
                    type="number"
                    value={formPopupDelay}
                    onChange={(e) => setFormPopupDelay(e.target.value)}
                    className="w-32 bg-white border-gray-300"
                  />
                  <Label className="text-sm text-gray-700">秒</Label>
                </div>
              </>
            )}
          </div>

          {/* 底部按鈕 */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleDialogClose}
              className="px-6"
            >
              取消
            </Button>
            <Button
              onClick={handleDialogSave}
              className="px-6"
              style={{ backgroundColor: '#409eff' }}
            >
              確認
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}