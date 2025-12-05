import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { DateRangePicker, DateRange } from "./ui/date-range-picker"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner@2.0.3"

interface Order {
  id: number
  mainOrderNumber: string
  splitOrderNumber: string
  invoiceNumber: string // 發票號碼
  totalAmount: number
  customerName: string
  email: string
  phone: string
  udnId: string
  brand: string // 所屬館別
  productId: string // 商品編號
  productName: string // 商品名稱
  planName: string // 方案名稱
  quantity: number // 數量
  source: string
  productPrice: number
  couponDiscount: number
  actualAmount: number
  paymentMethod: string
  orderCreateTime: string
  paymentTime: string
  redeemTime: string // 兌換時間
  redeemStatus: string
  redeemProcess: string // 兌換處理：已作廢、正常等
  orderStatus: string
  refundedAmount: number // 已退款金額
}

// 模擬訂單資料
const mockOrders: Order[] = [
  {
    id: 1,
    mainOrderNumber: 'ORD20251013001',
    splitOrderNumber: 'ORD20251013001-1',
    invoiceNumber: 'AB-12345678',
    totalAmount: 1500,
    customerName: '王小明',
    email: 'wangxiaoming@example.com',
    phone: '0912345678',
    udnId: 'UDN123456',
    brand: '元氣館',
    productId: '1435',
    productName: '冬季古道半日遊',
    planName: '早鳥方案',
    quantity: 1,
    source: '官網課程',
    productPrice: 500,
    couponDiscount: 300,
    actualAmount: 200,
    paymentMethod: '超商繳款',
    orderCreateTime: '2025-10-13 14:30:00',
    paymentTime: '2025-10-14 14:15:23',
    redeemTime: '2025-10-14 14:15:33',
    redeemStatus: '未兌換',
    redeemProcess: '作廢',
    orderStatus: '已付款',
    refundedAmount: 150
  },
  {
    id: 2,
    mainOrderNumber: 'ORD20251013001',
    splitOrderNumber: 'ORD20251013001-2',
    invoiceNumber: 'CD-23456780',
    totalAmount: 1500,
    customerName: '王小明',
    email: 'wangxiaoming@example.com',
    phone: '0912345678',
    udnId: 'UDN123456',
    brand: '元氣館',
    productId: '1442',
    productName: '春季登山體驗',
    planName: '標準方案',
    quantity: 1,
    source: '官網課程',
    productPrice: 300,
    couponDiscount: 0,
    actualAmount: 300,
    paymentMethod: '超商繳款',
    orderCreateTime: '2025-10-13 14:30:00',
    paymentTime: '2025-10-14 14:15:23',
    redeemTime: '2025-10-14 14:15:33',
    redeemStatus: '未兌換',
    redeemProcess: '',
    orderStatus: '已付款',
    refundedAmount: 150
  },
  {
    id: 3,
    mainOrderNumber: 'ORD20251013001',
    splitOrderNumber: 'ORD20251013001-3',
    invoiceNumber: 'CD-23456780',
    totalAmount: 1500,
    customerName: '王小明',
    email: 'wangxiaoming@example.com',
    phone: '0912345678',
    udnId: 'UDN123456',
    brand: '橘學院',
    productId: '1528',
    productName: '離婚財產教戰手冊',
    planName: '標準方案',
    quantity: 1,
    source: '官網課程',
    productPrice: 700,
    couponDiscount: 0,
    actualAmount: 700,
    paymentMethod: '超商繳款',
    orderCreateTime: '2025-10-13 14:30:00',
    paymentTime: '2025-10-14 14:15:23',
    redeemTime: '2025-10-14 14:15:33',
    redeemStatus: '未兌換',
    redeemProcess: '',
    orderStatus: '已付款',
    refundedAmount: 0
  },
  {
    id: 4,
    mainOrderNumber: 'ORD202501001',
    splitOrderNumber: 'SPL202501001A',
    invoiceNumber: 'EF-34567890',
    totalAmount: 5999,
    customerName: '張小明',
    email: 'ming@example.com',
    phone: '0923456789',
    udnId: 'UDN001234',
    brand: '橘學院',
    productId: '1567',
    productName: '數據分析基礎課程',
    planName: '進階方案',
    quantity: 2,
    source: '官網課程',
    productPrice: 5999,
    couponDiscount: 500,
    actualAmount: 5499,
    paymentMethod: '信用卡',
    orderCreateTime: '2025-01-15 14:30:00',
    paymentTime: '2025-01-15 14:32:15',
    redeemTime: '2025-01-15 14:32:25',
    redeemStatus: '已兌換',
    redeemProcess: '',
    orderStatus: '已付款',
    refundedAmount: 0
  },
  {
    id: 5,
    mainOrderNumber: 'ORD202501002',
    splitOrderNumber: 'SPL202501002A',
    invoiceNumber: '',
    totalAmount: 4999,
    customerName: '李小華',
    email: 'hua@example.com',
    phone: '0934567890',
    udnId: 'UDN005678',
    brand: '元氣館',
    productId: '1445',
    productName: '完整程式開發實作',
    planName: '標準方案',
    quantity: 1,
    source: '官網課程',
    productPrice: 4999,
    couponDiscount: 0,
    actualAmount: 4999,
    paymentMethod: 'ATM轉帳',
    orderCreateTime: '2025-01-15 16:45:00',
    paymentTime: '',
    redeemTime: '',
    redeemStatus: '未兌換',
    redeemProcess: '',
    orderStatus: '未付款',
    refundedAmount: 0
  },
  {
    id: 6,
    mainOrderNumber: 'ORD202501003',
    splitOrderNumber: 'SPL202501003A',
    invoiceNumber: 'GH-45678901',
    totalAmount: 7999,
    customerName: '王小美',
    email: 'mei@example.com',
    phone: '0945678901',
    udnId: 'UDN009012',
    brand: '橘學院',
    productId: '1598',
    productName: '投資理財入門課',
    planName: 'VIP方案',
    quantity: 1,
    source: '官網課程',
    productPrice: 7999,
    couponDiscount: 1000,
    actualAmount: 6999,
    paymentMethod: '信用卡',
    orderCreateTime: '2025-01-16 09:15:00',
    paymentTime: '2025-01-16 09:16:45',
    redeemTime: '2025-01-16 09:16:55',
    redeemStatus: '已兌換',
    redeemProcess: '',
    orderStatus: '已付款',
    refundedAmount: 0
  },
  {
    id: 7,
    mainOrderNumber: 'ORD202501004',
    splitOrderNumber: 'SPL202501004A',
    invoiceNumber: 'IJ-56789012',
    totalAmount: 3999,
    customerName: '陳大明',
    email: 'daming@example.com',
    phone: '0901234567',
    udnId: 'UDN003456',
    brand: '元氣館',
    productId: '1472',
    productName: '瑜珈入門課程',
    planName: '早鳥方案',
    quantity: 3,
    source: '官網課程',
    productPrice: 3999,
    couponDiscount: 200,
    actualAmount: 3799,
    paymentMethod: 'LINE Pay',
    orderCreateTime: '2025-01-16 11:20:00',
    paymentTime: '2025-01-16 11:22:30',
    redeemTime: '2025-01-16 11:22:40',
    redeemStatus: '部分兌換',
    redeemProcess: '',
    orderStatus: '已付款',
    refundedAmount: 0
  },
  {
    id: 8,
    mainOrderNumber: 'ORD202501005',
    splitOrderNumber: 'SPL202501005A',
    invoiceNumber: '',
    totalAmount: 8999,
    customerName: '林志偉',
    email: 'wei@example.com',
    phone: '0987654321',
    udnId: 'UDN007890',
    brand: '橘學院',
    productId: '1612',
    productName: '行銷策略實戰班',
    planName: '標準方案',
    quantity: 1,
    source: '官網課程',
    productPrice: 8999,
    couponDiscount: 0,
    actualAmount: 8999,
    paymentMethod: '信用卡',
    orderCreateTime: '2025-01-16 13:45:00',
    paymentTime: '',
    redeemTime: '',
    redeemStatus: '未兌換',
    redeemProcess: '',
    orderStatus: '已取消',
    refundedAmount: 0
  },
  {
    id: 9,
    mainOrderNumber: 'ORD202501006',
    splitOrderNumber: 'SPL202501006A',
    invoiceNumber: 'KL-67890123',
    totalAmount: 6500,
    customerName: '黃佳琪',
    email: 'huang@example.com',
    phone: '0956781234',
    udnId: 'UDN011223',
    brand: '元氣館',
    productId: '1488',
    productName: 'Python 程式設計入門',
    planName: '標準方案',
    quantity: 1,
    source: '官網課程',
    productPrice: 6500,
    couponDiscount: 0,
    actualAmount: 6500,
    paymentMethod: 'ATM轉帳',
    orderCreateTime: '2025-01-17 10:30:00',
    paymentTime: '2025-01-17 15:45:20',
    redeemTime: '2025-01-17 15:45:30',
    redeemStatus: '已兌換',
    redeemProcess: '',
    orderStatus: '已付款',
    refundedAmount: 0
  }
]

interface OrderManagementProps {
  onViewOrderDetail?: (orderId: string) => void
}

export function OrderManagement({ onViewOrderDetail }: OrderManagementProps = {}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('25')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1), // 2025-01-01
    to: new Date(2025, 0, 31)   // 2025-01-31
  })
  const [courseType, setCourseType] = useState('all')
  const [transactionType, setTransactionType] = useState('all')
  const [branch, setBranch] = useState('元氣館')
  const [queryField, setQueryField] = useState('查詢欄位')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [queryAllPeriods, setQueryAllPeriods] = useState(false)

  // 判斷是否選擇了指定的搜尋項目（不是"查詢欄位"）
  const hasSpecificQueryField = queryField !== '查詢欄位'
  // 判斷是否選擇了「商品名稱」
  const isProductNameQuery = queryField === '商品名稱'
  // 判斷是否選擇了指定搜尋項目但不是商品名稱
  const hasNonProductQuery = hasSpecificQueryField && !isProductNameQuery

  // 決定篩選條件是否應該 disable
  // 1. 如果選擇了非商品名稱的指定搜尋項目 -> disable
  // 2. 如果選擇了商品名稱且勾選不限時間 -> disable
  const shouldDisableFilters = hasNonProductQuery || (isProductNameQuery && queryAllPeriods)

  // 決定 checkbox 的狀態
  // 1. 如果選擇了非商品名稱的指定搜尋項目 -> 強制勾選且 disable
  // 2. 如果選擇了商品名稱 -> enable，由用戶控制
  const checkboxChecked = hasNonProductQuery || queryAllPeriods
  const checkboxDisabled = hasNonProductQuery

  // 過濾訂單
  const filteredOrders = mockOrders.filter(order => {
    if (transactionType !== 'all' && order.orderStatus !== transactionType) {
      return false
    }
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase()
      return (
        order.mainOrderNumber.toLowerCase().includes(keyword) ||
        order.customerName.toLowerCase().includes(keyword) ||
        order.email.toLowerCase().includes(keyword) ||
        order.phone.includes(keyword)
      )
    }
    return true
  })

  // 分頁計算
  const totalPages = Math.ceil(filteredOrders.length / parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage)
  const endIndex = startIndex + parseInt(itemsPerPage)
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const handleSearchConfirm = () => {
    // 驗證：如果有輸入搜尋關鍵字但沒有選擇查詢欄位
    if (searchKeyword.trim() && queryField === '查詢欄位') {
      toast.error('請選擇查詢欄位')
      return
    }
    
    // 驗證：如果勾選查詢全部期間，必須有搜尋關鍵字
    if (queryAllPeriods && !searchKeyword.trim()) {
      toast.error('查詢全部期間時，請輸入搜尋關鍵字')
      return
    }
    setCurrentPage(1)
  }

  // 計算每個主單的 rowspan
  const getMainOrderRowSpan = (orders: Order[], currentIndex: number): number => {
    const currentMainOrder = orders[currentIndex].mainOrderNumber
    
    // 檢查這是不是該主單的第一行
    if (currentIndex > 0 && orders[currentIndex - 1].mainOrderNumber === currentMainOrder) {
      return 0 // 不是第一行，返回 0 表示不顯示
    }
    
    // 計算有多少行屬於同一個主單
    let count = 1
    for (let i = currentIndex + 1; i < orders.length; i++) {
      if (orders[i].mainOrderNumber === currentMainOrder) {
        count++
      } else {
        break
      }
    }
    return count
  }

  // 獲取同一主單的所有發票號碼（去重）
  const getMainOrderInvoices = (orders: Order[], currentIndex: number): string[] => {
    const currentMainOrder = orders[currentIndex].mainOrderNumber
    const invoiceSet = new Set<string>()
    
    // 收集當前訂單的發票號碼
    if (orders[currentIndex].invoiceNumber) {
      invoiceSet.add(orders[currentIndex].invoiceNumber)
    }
    
    // 向後查找同一主單的其他訂單
    for (let i = currentIndex + 1; i < orders.length; i++) {
      if (orders[i].mainOrderNumber === currentMainOrder) {
        if (orders[i].invoiceNumber) {
          invoiceSet.add(orders[i].invoiceNumber)
        }
      } else {
        break
      }
    }
    
    // 向前查找同一主單的其他訂單
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (orders[i].mainOrderNumber === currentMainOrder) {
        if (orders[i].invoiceNumber) {
          invoiceSet.add(orders[i].invoiceNumber)
        }
      } else {
        break
      }
    }
    
    return Array.from(invoiceSet)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      '已付款': { color: 'bg-green-100 text-green-800' },
      '未付款': { color: 'bg-yellow-100 text-yellow-800' },
      '已取消': { color: 'bg-red-100 text-red-800' },
      '退款中': { color: 'bg-orange-100 text-orange-800' },
      '已退款': { color: 'bg-gray-100 text-gray-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-800' }
    return <Badge className={`${config.color} text-xs px-2 py-1`}>{status}</Badge>
  }

  const getRedeemStatusBadge = (status: string) => {
    const statusConfig = {
      '已兌換': { color: 'bg-green-100 text-green-800' },
      '未兌換': { color: 'bg-gray-100 text-gray-800' },
      '部分兌換': { color: 'bg-yellow-100 text-yellow-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-800' }
    return <Badge className={`${config.color} text-xs px-2 py-1`}>{status}</Badge>
  }

  return (
    <div className="bg-white px-6 pt-6">


        {/* 篩選器和搜尋 */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* 期間起迄日 */}
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder="選擇日期範圍"
                disabled={shouldDisableFilters}
                className="w-60"
              />

              {/* 課程類型下拉選單 */}
              <Select value={courseType} onValueChange={setCourseType} disabled={shouldDisableFilters}>
                <SelectTrigger className="w-36 h-8 py-0 bg-white border-gray-300" style={{ fontSize: '10pt' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ fontSize: '10pt' }}>
                  <SelectItem value="all">全部課程來源</SelectItem>
                  <SelectItem value="app-course">APP 課程</SelectItem>
                  <SelectItem value="app-single">APP 單集</SelectItem>
                  <SelectItem value="web-course">官網課程</SelectItem>
                  <SelectItem value="app-rental">APP 單租限時</SelectItem>
                  <SelectItem value="web-rental">官網單租限時</SelectItem>
                </SelectContent>
              </Select>

              {/* 交易類型下拉選單 */}
              <Select value={transactionType} onValueChange={setTransactionType} disabled={shouldDisableFilters}>
                <SelectTrigger className="w-24 h-8 py-0 bg-white border-gray-300" style={{ fontSize: '10pt' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ fontSize: '10pt' }}>
                  <SelectItem value="all">全部交易</SelectItem>
                  <SelectItem value="已付款">已付款</SelectItem>
                  <SelectItem value="未付款">未付款</SelectItem>
                </SelectContent>
              </Select>

              {/* 館別下拉選單 */}
              <Select value={branch} onValueChange={setBranch} disabled={shouldDisableFilters}>
                <SelectTrigger className="w-20 h-8 py-0 bg-white border-gray-300" style={{ fontSize: '10pt' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ fontSize: '10pt' }}>
                  <SelectItem value="元氣館">元氣館</SelectItem>
                </SelectContent>
              </Select>

              {/* 查詢欄位下拉選單 */}
              <Select value={queryField} onValueChange={(value) => {
                setQueryField(value)
                if (value === '查詢欄位') {
                  setSearchKeyword('')
                }
              }}>
                <SelectTrigger className="w-24 h-8 py-0 bg-white border-gray-300" style={{ fontSize: '10pt' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ fontSize: '10pt' }}>
                  <SelectItem value="查詢欄位">查詢欄位</SelectItem>
                  <SelectItem value="主單號">主單號</SelectItem>
                  <SelectItem value="拆分單號">拆分單號</SelectItem>
                  <SelectItem value="udn ID">udn ID</SelectItem>
                  <SelectItem value="會員代號">會員代號</SelectItem>
                  <SelectItem value="姓名">姓名</SelectItem>
                  <SelectItem value="信箱">信箱</SelectItem>
                  <SelectItem value="電話">電話</SelectItem>
                  <SelectItem value="商品名稱">商品名稱</SelectItem>
                  <SelectItem value="發票號碼">發票號碼</SelectItem>
                </SelectContent>
              </Select>

              {/* 輸入搜尋框 */}
              <Input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                disabled={queryField === '查詢欄位'}
                className="w-36 h-8 py-0 bg-white border-gray-300"
                style={{ fontSize: '10pt' }}
                placeholder="請輸入搜尋關鍵字"
              />

              {/* 不限時間 Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="queryAllPeriods"
                  checked={checkboxChecked}
                  onCheckedChange={(checked) => setQueryAllPeriods(checked as boolean)}
                  disabled={checkboxDisabled}
                  className="border-gray-300"
                />
                <Label
                  htmlFor="queryAllPeriods"
                  className={`text-gray-700 ${checkboxDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{ fontSize: '10pt' }}
                >
                  不限時間
                </Label>
              </div>

              {/* 確認按鈕 */}
              <Button
                onClick={handleSearchConfirm}
                className="h-8 py-0 px-4 text-white border-0"
                style={{ backgroundColor: '#409eff', fontSize: '10pt' }}
              >
                確認
              </Button>
            </div>

            {/* 右側按鈕區域 */}
            <div className="flex items-center space-x-3">
              {/* 選擇匯出欄位按鈕 */}
              <Button
                className="h-8 px-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                style={{ fontSize: '10pt' }}
              >
                選擇匯出欄位
              </Button>

              {/* 查看下載結果按鈕 */}
              <Button
                className="h-8 px-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                style={{ fontSize: '10pt' }}
              >
                查看下載結果
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full min-w-[2200px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '120px', minWidth: '120px' }}>
                  <div>訂單編號(主單)</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '140px', minWidth: '140px' }}>
                  <div>訂單編號(拆分單)</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '100px', minWidth: '100px' }}>
                  <div>發票號碼</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">訂單<br />總金額</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '60px', minWidth: '60px' }}>
                  <div>姓名</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '120px', minWidth: '120px' }}>
                  <div>信箱</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '80px', minWidth: '80px' }}>
                  <div>電話</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div>udn ID</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">所屬<br />館別</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">商品<br />編號</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '120px', minWidth: '120px' }}>
                  <div>商品名稱</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '100px', minWidth: '100px' }}>
                  <div>方案名稱</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '50px', minWidth: '50px' }}>
                  <div>數量</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '60px', minWidth: '60px' }}>
                  <div>來源</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">商品<br />售價</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">優惠券<br />折抵金額</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">實收<br />金額</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">付款<br />方式</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '110px', minWidth: '110px' }}>
                  <div className="break-words leading-tight">訂單成立<br />時間</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '110px', minWidth: '110px' }}>
                  <div>付款時間</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '130px', minWidth: '130px' }}>
                  <div className="break-words leading-tight">兌換時間</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">兌換<br />狀態</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">兌換<br />處理</div>
                </th>
                <th className="text-left py-3 px-2 text-sm text-gray-700 border-b" style={{ fontSize: '10pt', width: '70px', minWidth: '70px' }}>
                  <div className="break-words leading-tight">退款<br />狀態</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => {
                  const mainOrderRowSpan = getMainOrderRowSpan(paginatedOrders, index)
                  const invoices = mainOrderRowSpan > 0 ? getMainOrderInvoices(paginatedOrders, index) : []
                  
                  return (
                    <tr key={order.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                      {/* 主單編號 - 合併相同主單 */}
                      {mainOrderRowSpan > 0 && (
                        <td 
                          rowSpan={mainOrderRowSpan} 
                          className="py-3 px-2 text-sm border-b align-middle" 
                          style={{ fontSize: '10pt' }}
                        >
                          <div 
                            className="cursor-pointer hover:underline break-words"
                            style={{ color: '#409eff' }}
                            onClick={() => onViewOrderDetail?.(order.mainOrderNumber)}
                          >
                            {order.mainOrderNumber}
                          </div>
                        </td>
                      )}
                      <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                        <div className="break-words">{order.splitOrderNumber}</div>
                      </td>
                      {/* 發票號碼 - 合併相同主單，多張發票分行顯示 */}
                      {mainOrderRowSpan > 0 && (
                        <td 
                          rowSpan={mainOrderRowSpan} 
                          className="py-3 px-2 text-sm text-gray-700 border-b align-middle" 
                          style={{ fontSize: '10pt' }}
                        >
                          <div className="break-words">
                            {invoices.length > 0 ? (
                              invoices.map((invoice, idx) => (
                                <div key={idx}>{invoice}</div>
                              ))
                            ) : (
                              '-'
                            )}
                          </div>
                        </td>
                      )}
                      {/* 訂單總金額 - 合併相同主單 */}
                      {mainOrderRowSpan > 0 && (
                        <td 
                          rowSpan={mainOrderRowSpan} 
                          className="py-3 px-2 text-sm text-gray-700 border-b align-middle" 
                          style={{ fontSize: '10pt' }}
                        >
                          <div className="break-words">{order.totalAmount.toLocaleString()}</div>
                        </td>
                      )}
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.customerName}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.email}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.phone}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.udnId}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.brand}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.productId}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.productName}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.planName}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.quantity}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.source}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.productPrice.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.couponDiscount.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.actualAmount.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.paymentMethod}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.orderCreateTime}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.paymentTime || '-'}</div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700 border-b align-middle" style={{ fontSize: '10pt' }}>
                      <div className="break-words">{order.redeemTime || '-'}</div>
                    </td>
                    <td className="py-3 px-2 text-sm border-b align-middle" style={{ fontSize: '10pt' }}>
                      {order.paymentTime ? (
                        <div className="text-green-600" style={{ fontWeight: 'bold' }}>兌換成功</div>
                      ) : (
                        <div className="break-words text-gray-700">-</div>
                      )}
                    </td>
                    <td className="py-3 px-2 text-sm border-b align-middle" style={{ fontSize: '10pt' }}>
                      {order.paymentTime ? (
                        order.refundedAmount > 0 ? (
                          <div className="text-red-600" style={{ fontWeight: 'bold' }}>作廢</div>
                        ) : (
                          <div className="break-words text-gray-700">{order.redeemProcess || '-'}</div>
                        )
                      ) : (
                        <div className="break-words text-gray-700">-</div>
                      )}
                    </td>
                    <td className="py-3 px-2 text-sm border-b align-middle" style={{ fontSize: '10pt' }}>
                      {order.refundedAmount > 0 ? (
                        <div className="break-words text-gray-700">已退款</div>
                      ) : (
                        <div className="break-words text-gray-700"></div>
                      )}
                    </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={24} className="py-8 px-4 text-center text-gray-500">
                    {filteredOrders.length === 0 ? (searchKeyword || transactionType !== 'all' ? '沒有找到符合條件的訂單' : '暫無訂單記錄') : '暫無資料'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer - Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-between items-center p-4 border-t border-gray-200">
            {/* 筆數選擇 */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-500" style={{ fontSize: '10pt' }}>筆數</span>
              <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-16 h-8 bg-white border-gray-300" style={{ fontSize: '10pt' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ fontSize: '10pt' }}>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 分頁控制 */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 cursor-pointer'}`}
                title="上一頁"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 px-2">
                第 {currentPage} 頁，共 {totalPages} 頁
              </span>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 cursor-pointer'}`}
                title="下一頁"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
    </div>
  )
}