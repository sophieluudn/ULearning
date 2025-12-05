import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { DateRangePicker, DateRange } from './ui/date-range-picker'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { toast } from 'sonner@2.0.3'

// 模擬退款數據
const mockRefundData = [
  {
    orderId: 'ORD20251020001',
    invoiceNumbers: ['ZZ12345678', 'ZZ12345679'],
    refundId: 'REF20251020001',
    totalAmount: 15000,
    brand: '橘學院',
    paymentMethod: '信用卡',
    orderCreatedTime: '2025-10-15 14:30:00',
    paymentTime: '2025-10-15 14:32:00',
    refundAppliedTime: '2025-10-20 10:15:00',
    refundProcessedTime: '2025-10-21 09:00:00',
    refundStatus: '退款完成',
    products: [
      {
        splitOrderId: 'SPL202510001A',
        productId: 'PROD10001',
        productName: 'Python 程式設計入門課程',
        planName: '完整課程方案',
        quantity: 1,
        productPrice: 5999,
        couponDiscount: 500,
        refundStatus: '已退款',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345678',
        actualAmount: 5499,
        refundedAmount: 5499,
        currentRefundAmount: 5499
      },
      {
        splitOrderId: 'SPL202510001B',
        productId: 'PROD10002',
        productName: 'JavaScript 前端開發實戰',
        planName: '進階方案',
        quantity: 2,
        productPrice: 9998,
        couponDiscount: 500,
        refundStatus: '已退款',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345679',
        actualAmount: 9498,
        refundedAmount: 9498,
        currentRefundAmount: 9498
      }
    ],
    refundRecords: [
      {
        refundRequestTime: '2025-10-20 10:15:00',
        refundStatus: '退款完成',
        refundId: 'REF20251020001',
        currentRefundAmount: 14997
      }
    ]
  },
  {
    orderId: 'ORD20251019002',
    invoiceNumbers: ['ZZ12345680'],
    refundId: 'REF20251019001',
    totalAmount: 8500,
    brand: '元氣館',
    paymentMethod: 'ATM轉帳',
    orderCreatedTime: '2025-10-18 16:20:00',
    paymentTime: '2025-10-18 18:45:00',
    refundAppliedTime: '2025-10-19 11:30:00',
    refundProcessedTime: '',
    refundStatus: '申請退款中',
    products: [
      {
        splitOrderId: 'SPL202510002A',
        productId: 'PROD20001',
        productName: '健康養生講座',
        planName: '標準方案',
        quantity: 1,
        productPrice: 8500,
        couponDiscount: 0,
        refundStatus: '退款中',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345680',
        actualAmount: 8500,
        refundedAmount: 0,
        currentRefundAmount: 8500
      }
    ],
    refundRecords: [
      {
        refundRequestTime: '2025-10-19 11:30:00',
        refundStatus: '退款中',
        refundId: 'REF20251019001',
        currentRefundAmount: 8500
      }
    ]
  },
  {
    orderId: 'ORD20251018003',
    invoiceNumbers: ['ZZ12345681', 'ZZ12345682', 'ZZ12345683'],
    refundId: 'REF20251018001',
    totalAmount: 25000,
    brand: '一刻鯨選',
    paymentMethod: '超商繳款',
    orderCreatedTime: '2025-10-17 09:10:00',
    paymentTime: '2025-10-17 15:30:00',
    refundAppliedTime: '2025-10-18 14:20:00',
    refundProcessedTime: '2025-10-18 16:45:00',
    refundStatus: '退款失敗',
    refundFeeBearer: '營運單位',
    products: [
      {
        splitOrderId: 'SPL202510003A',
        productId: 'PROD30001',
        productName: '精選好物禮盒組',
        planName: 'VIP專屬方案',
        quantity: 1,
        productPrice: 12000,
        couponDiscount: 1000,
        refundStatus: '退款失敗',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345681',
        actualAmount: 11000,
        refundedAmount: 0,
        currentRefundAmount: 11000
      },
      {
        splitOrderId: 'SPL202510003B',
        productId: 'PROD30002',
        productName: '季節限定特選組',
        planName: '豪華組合',
        quantity: 1,
        productPrice: 8000,
        couponDiscount: 500,
        refundStatus: '退款失敗',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345682',
        actualAmount: 7500,
        refundedAmount: 0,
        currentRefundAmount: 7500
      },
      {
        splitOrderId: 'SPL202510003C',
        productId: 'PROD30003',
        productName: '健康生活組合',
        planName: '經典方案',
        quantity: 2,
        productPrice: 7000,
        couponDiscount: 500,
        refundStatus: '退款失敗',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345683',
        actualAmount: 6500,
        refundedAmount: 0,
        currentRefundAmount: 6500
      }
    ],
    refundRecords: [
      {
        refundRequestTime: '2025-10-18 14:20:00',
        refundStatus: '退款失敗',
        refundId: 'REF20251018001',
        currentRefundAmount: 25000
      }
    ]
  },
  {
    orderId: 'ORD20251017004',
    invoiceNumbers: ['ZZ12345684'],
    refundId: 'REF20251017001',
    totalAmount: 12000,
    brand: '橘學院',
    paymentMethod: '信用卡',
    orderCreatedTime: '2025-10-16 13:40:00',
    paymentTime: '2025-10-16 13:42:00',
    refundAppliedTime: '2025-10-17 10:00:00',
    refundProcessedTime: '',
    refundStatus: '已終止退款',
    products: [
      {
        splitOrderId: 'SPL202510004A',
        productId: 'PROD10003',
        productName: 'React 全端開發實戰',
        planName: '完整課程方案',
        quantity: 1,
        productPrice: 12000,
        couponDiscount: 0,
        refundStatus: '已終止退款',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345684',
        actualAmount: 12000,
        refundedAmount: 0,
        currentRefundAmount: 8000
      }
    ],
    refundRecords: []
  },
  {
    orderId: 'ORD20251016005',
    invoiceNumbers: ['ZZ12345685', 'ZZ12345686'],
    refundId: 'REF20251016001',
    totalAmount: 18500,
    brand: '元氣館',
    paymentMethod: 'LINE Pay',
    orderCreatedTime: '2025-10-15 11:20:00',
    paymentTime: '2025-10-15 11:22:00',
    refundAppliedTime: '2025-10-16 09:45:00',
    refundProcessedTime: '2025-10-17 10:30:00',
    refundStatus: '退款完成',
    products: [
      {
        splitOrderId: 'SPL202510005A',
        productId: 'PROD20002',
        productName: '營養師諮詢課程',
        planName: '一對一方案',
        quantity: 1,
        productPrice: 9500,
        couponDiscount: 500,
        refundStatus: '已退款',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345685',
        actualAmount: 9000,
        refundedAmount: 9000,
        currentRefundAmount: 9000
      },
      {
        splitOrderId: 'SPL202510005B',
        productId: 'PROD20003',
        productName: '健身教練指導',
        planName: '進階訓練',
        quantity: 1,
        productPrice: 9500,
        couponDiscount: 0,
        refundStatus: '已退款',
        paymentStatus: '已付款',
        invoiceNumber: 'ZZ12345686',
        actualAmount: 9500,
        refundedAmount: 9500,
        currentRefundAmount: 9500
      }
    ],
    refundRecords: [
      {
        refundRequestTime: '2025-10-16 09:45:00',
        refundStatus: '退款完成',
        refundId: 'REF20251016001',
        currentRefundAmount: 18500
      }
    ]
  }
]

export function RefundList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('25')
  const [refundStatus, setRefundStatus] = useState('all')
  const [brand, setBrand] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [goToPageInput, setGoToPageInput] = useState('')
  
  // 執行退款 Popup 狀態
  const [isRefundPopupOpen, setIsRefundPopupOpen] = useState(false)
  const [selectedRefund, setSelectedRefund] = useState<any>(null)
  const [refundReason, setRefundReason] = useState('')
  const [otherReason, setOtherReason] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [refundFeeBearer, setRefundFeeBearer] = useState('營運單位')

  const totalPages = Math.ceil(mockRefundData.length / parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage)
  const endIndex = startIndex + parseInt(itemsPerPage)
  const currentData = mockRefundData.slice(startIndex, endIndex)

  const getStatusColor = (status: string) => {
    switch (status) {
      case '退款完成':
        return 'text-green-600'
      case '申請退款中':
        return 'text-blue-600'
      case '退款失敗':
        return 'text-red-600'
      case '已終止退款':
        return 'text-gray-600'
      default:
        return 'text-gray-900'
    }
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case '退款完成':
        return { backgroundColor: '#e6f7e6', color: '#52c41a', border: '1px solid #b7eb8f' }
      case '申請退款中':
        return { backgroundColor: '#e6f4ff', color: '#1890ff', border: '1px solid #91d5ff' }
      case '退款失敗':
        return { backgroundColor: '#fff1f0', color: '#ff4d4f', border: '1px solid #ffccc7' }
      case '已終止退款':
        return { backgroundColor: '#f5f5f5', color: '#8c8c8c', border: '1px solid #d9d9d9' }
      default:
        return { backgroundColor: '#f5f5f5', color: '#595959', border: '1px solid #d9d9d9' }
    }
  }

  const handleStatusClick = (refund: any) => {
    setSelectedRefund(refund)
    setIsRefundPopupOpen(true)
    // 重置表單
    setRefundReason('')
    setOtherReason('')
    setDocumentNumber('')
    setRefundFeeBearer('營運單位')
  }

  const handleRefundSubmit = () => {
    // 驗證
    if (!refundReason) {
      toast.error('請選擇退款原因')
      return
    }
    if (refundReason === '其他原因' && !otherReason.trim()) {
      toast.error('請輸入其他原因')
      return
    }

    // 提交退款
    toast.success('退款申請已提交')
    setIsRefundPopupOpen(false)
  }

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPageInput)
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum)
      setGoToPageInput('')
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  return (
    <div className="bg-white px-6 pt-6 min-h-screen">
      {/* 篩選器區域 */}
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          {/* 期間選擇器 */}
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="選擇日期範圍"
            className="w-60"
          />

          {/* 退款狀態下拉選單 */}
          <Select value={refundStatus} onValueChange={setRefundStatus}>
            <SelectTrigger className="w-40 h-8 py-0 bg-white border-gray-300" style={{ fontSize: '10pt' }}>
              <SelectValue placeholder="全部退款狀態" />
            </SelectTrigger>
            <SelectContent style={{ fontSize: '10pt' }}>
              <SelectItem value="all">全部退款狀態</SelectItem>
              <SelectItem value="applying">申請退款中</SelectItem>
              <SelectItem value="completed">退款完成</SelectItem>
              <SelectItem value="failed">退款失敗</SelectItem>
              <SelectItem value="terminated">已終止退款</SelectItem>
            </SelectContent>
          </Select>

          {/* 品牌館下拉選單 */}
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger className="w-32 h-8 py-0 bg-white border-gray-300" style={{ fontSize: '10pt' }}>
              <SelectValue placeholder="所有品牌館" />
            </SelectTrigger>
            <SelectContent style={{ fontSize: '10pt' }}>
              <SelectItem value="all">所有品牌館</SelectItem>
              <SelectItem value="orange">橘學院</SelectItem>
              <SelectItem value="energy">元氣館</SelectItem>
              <SelectItem value="whale">一刻鯨選</SelectItem>
            </SelectContent>
          </Select>

          {/* 搜尋輸入框 */}
          <Input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="請輸入訂單編號(主單)"
            className="w-48 h-8 py-0 bg-white border-gray-300"
            style={{ fontSize: '10pt' }}
          />

          {/* 搜尋按鈕 */}
          <Button 
            className="h-8 px-6 text-white"
            style={{ backgroundColor: '#409eff', fontSize: '10pt' }}
          >
            搜尋
          </Button>
        </div>
      </div>

      {/* 退款列表表格 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                訂單編號(主單)
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                發票號碼
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                退款編號
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                訂單總金額
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                所屬館別
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                付款方式
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                訂單成立時間
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                付款時間
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                申請退款時間
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                處理退款時間
              </th>
              <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                退款狀態
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((refund, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.orderId}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.invoiceNumbers.map((invoice, i) => (
                    <div key={i}>{invoice}</div>
                  ))}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.refundId}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-right" style={{ fontSize: '10pt' }}>
                  ${refund.totalAmount.toLocaleString()}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.brand}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.paymentMethod}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.orderCreatedTime}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.paymentTime}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.refundAppliedTime}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  {refund.refundProcessedTime || '-'}
                </td>
                <td className="px-4 py-3 border-b border-gray-200" style={{ fontSize: '10pt' }}>
                  <Badge
                    onClick={() => handleStatusClick(refund)}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      ...getStatusBadgeStyle(refund.refundStatus),
                      fontSize: '10pt',
                      padding: '4px 12px',
                      borderRadius: '4px'
                    }}
                  >
                    {refund.refundStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分頁控制 - 右下角 */}
      <div className="mt-4 flex justify-end">
        <div className="flex items-center gap-3">
          {/* 筆數選擇器 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">筆數</span>
            <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-20 h-8 py-0 bg-white border-gray-300" style={{ fontSize: '10pt' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ fontSize: '10pt' }}>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 前往頁面 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">前往</span>
            <Input
              type="number"
              min="1"
              max={totalPages}
              value={goToPageInput}
              onChange={(e) => setGoToPageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleGoToPage()
                }
              }}
              className="h-8 w-16 px-2 text-center bg-white border-gray-300"
              style={{ fontSize: '10pt' }}
            />
            <span className="text-sm text-gray-600">頁</span>
          </div>

          {/* 分頁按鈕 */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 border-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0 border-gray-300"
                  style={currentPage === page ? { backgroundColor: '#409eff', color: 'white', borderColor: '#409eff' } : {}}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 border-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 執行退款 Popup */}
      <Dialog open={isRefundPopupOpen} onOpenChange={setIsRefundPopupOpen}>
        <DialogContent className="!w-[95vw] !max-w-[1400px] sm:!max-w-[1400px] max-h-[90vh] overflow-y-auto overflow-x-hidden" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: '10pt' }}>退款編號 {selectedRefund?.refundId}</DialogTitle>
          </DialogHeader>
          
          {selectedRefund && (
            <div className="py-4 overflow-x-hidden">
              {/* 大卡片 - 包含所有內容 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 overflow-x-hidden">
                {/* 卡片標題 */}
                <div className="mb-6">
                  <h3 className="text-gray-900" style={{ fontSize: '12pt' }}>退款資訊</h3>
                </div>
                
                {/* 訂單基本資訊 (三列布局) */}
                <div className="rounded p-4 mb-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* 左列 */}
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>訂單編號(主單)：</span>
                        <span className="text-gray-900" style={{ fontSize: '10pt' }}>{selectedRefund.orderId}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>發票編號：</span>
                        <span className="text-gray-900" style={{ fontSize: '10pt' }}>
                          {selectedRefund.invoiceNumbers.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>訂單總金額：</span>
                        <span className="text-gray-900" style={{ fontSize: '10pt' }}>{selectedRefund.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 中列 */}
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>訂單成立時間：</span>
                        <span className="text-gray-900" style={{ fontSize: '10pt' }}>{selectedRefund.orderCreatedTime}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>付款時間：</span>
                        <span className="text-gray-900" style={{ fontSize: '10pt' }}>{selectedRefund.paymentTime}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>付款方式：</span>
                        <span className="text-gray-900" style={{ fontSize: '10pt' }}>{selectedRefund.paymentMethod}</span>
                      </div>
                    </div>

                    {/* 右列 */}
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-700 w-24 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>所屬館別：</span>
                        <span className="text-gray-900" style={{ fontSize: '10pt' }}>{selectedRefund.brand}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 w-24 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>退款編號：</span>
                        <span className="text-gray-900" style={{ fontSize: '10pt' }}>{selectedRefund.refundId}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 w-24 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>退款狀態：</span>
                        <span className={`${getStatusColor(selectedRefund.refundStatus)}`} style={{ fontSize: '10pt' }}>
                          {selectedRefund.refundStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 商品明細表格 */}
                <div className="border border-gray-200 rounded mb-6 w-full">
                  <div className="overflow-x-auto overflow-y-auto max-h-[500px] relative">
                    <table className="w-full" style={{ tableLayout: 'auto' }}>
                      <thead className="sticky top-0 bg-gray-100 z-10">
                        <tr>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>訂單編號(拆分單)</th>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>商品編號</th>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>商品名稱</th>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>方案名稱</th>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>數量</th>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>商品售價</th>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>優惠券折抵金額</th>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>退款狀態</th>
                          <th className="border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap" style={{ fontSize: '10pt' }}>付款狀態</th>
                          <th className="sticky right-[360px] border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap bg-gray-100 z-20" style={{ fontSize: '10pt', minWidth: '120px' }}>發票號碼</th>
                          <th className="sticky right-[240px] border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap bg-gray-100 z-20" style={{ fontSize: '10pt', minWidth: '120px' }}>實收金額</th>
                          <th className="sticky right-[120px] border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap bg-gray-100 z-20" style={{ fontSize: '10pt', minWidth: '120px' }}>已退款金額</th>
                          <th className="sticky right-0 border border-gray-200 px-2 py-2 text-gray-700 text-left whitespace-nowrap bg-gray-100 z-20" style={{ fontSize: '10pt', minWidth: '120px' }}>本次退款金額</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRefund.products.map((product: any, index: number) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.splitOrderId}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.productId}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.productName}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.planName}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.quantity}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.productPrice.toLocaleString()}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.couponDiscount.toLocaleString()}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.refundStatus}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {product.paymentStatus}
                            </td>
                            <td className="sticky right-[360px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-white z-10" style={{ fontSize: '10pt', minWidth: '120px' }}>
                              {product.invoiceNumber}
                            </td>
                            <td className="sticky right-[240px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-white z-10" style={{ fontSize: '10pt', minWidth: '120px' }}>
                              {product.actualAmount.toLocaleString()}
                            </td>
                            <td className="sticky right-[120px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-white z-10" style={{ fontSize: '10pt', minWidth: '120px' }}>
                              {product.refundedAmount.toLocaleString()}
                            </td>
                            <td className="sticky right-0 border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-white z-10" style={{ fontSize: '10pt', minWidth: '120px' }}>
                              <Input
                                type="text"
                                className="h-8 w-24"
                                style={{ fontSize: '10pt' }}
                                placeholder="0"
                                value={product.currentRefundAmount}
                                disabled
                                onChange={(e) => {
                                  const newAmount = parseInt(e.target.value) || 0
                                  const updatedProducts = selectedRefund.products.map((p: any) =>
                                    p.splitOrderId === product.splitOrderId ? { ...p, currentRefundAmount: newAmount } : p
                                  )
                                  setSelectedRefund({ ...selectedRefund, products: updatedProducts })
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                        {/* 總計行 */}
                        <tr className="bg-gray-50">
                          <td colSpan={9} className="border border-gray-200 px-2 py-2 whitespace-nowrap" style={{ fontSize: '10pt' }}></td>
                          <td className="sticky right-[360px] border border-gray-200 px-2 py-2 text-gray-700 whitespace-nowrap bg-gray-50 z-10 text-right" style={{ fontSize: '10pt', fontWeight: 'bold', minWidth: '120px' }}>總計</td>
                          <td className="sticky right-[240px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-gray-50 z-10" style={{ fontSize: '10pt', fontWeight: 'bold', minWidth: '120px' }}>
                            {selectedRefund.products.reduce((sum: number, product: any) => sum + product.actualAmount, 0).toLocaleString()}
                          </td>
                          <td className="sticky right-[120px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-gray-50 z-10" style={{ fontSize: '10pt', fontWeight: 'bold', minWidth: '120px' }}>
                            {selectedRefund.products.reduce((sum: number, product: any) => sum + product.refundedAmount, 0).toLocaleString()}
                          </td>
                          <td className="sticky right-0 border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-gray-50 z-10" style={{ fontSize: '10pt', fontWeight: 'bold', minWidth: '120px' }}>
                            {selectedRefund.products.reduce((sum: number, product: any) => sum + product.currentRefundAmount, 0).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 退款資訊區塊 */}
                <div className="space-y-5">
                  {/* 退款原因、其他原因、線下退款電子公文編號、退款手續費負擔 - 同一列均分 */}
                  <div className="grid grid-cols-4 gap-3">
                    {/* 退款原因 */}
                    <div>
                      <label className="block mb-2.5" style={{ fontSize: '10pt' }}>
                        <span className="text-gray-700">退款原因</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Select value={refundReason} onValueChange={setRefundReason} disabled>
                        <SelectTrigger className="w-full h-10 bg-white border-gray-300 py-0" style={{ fontSize: '10pt', height: '40px' }}>
                          <SelectValue placeholder="請選擇退款原因" />
                        </SelectTrigger>
                        <SelectContent style={{ fontSize: '10pt' }}>
                          <SelectItem value="買家反悔">買家反悔</SelectItem>
                          <SelectItem value="不慎誤購">不慎誤購</SelectItem>
                          <SelectItem value="重複訂單">重複訂單</SelectItem>
                          <SelectItem value="詐欺訂單">詐欺訂單</SelectItem>
                          <SelectItem value="其他原因">其他原因</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 其他原因輸入框 - 固定顯示，無 label */}
                    <div className="flex items-end">
                      <Input
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="請輸入其他原因"
                        className="h-10 bg-white border-gray-300 py-0"
                        style={{ fontSize: '10pt', height: '40px' }}
                        disabled
                      />
                    </div>

                    {/* 線下退款電子公文編號 */}
                    <div>
                      <label className="block mb-2.5" style={{ fontSize: '10pt' }}>
                        <span className="text-gray-700">線下退款電子公文編號</span>
                      </label>
                      <Input
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        placeholder="若為線下付款，請輸入電子公文編號"
                        className="h-10 bg-white border-gray-300 py-0"
                        style={{ fontSize: '10pt', height: '40px' }}
                        disabled
                      />
                    </div>

                    {/* 退款手續費負擔 - ATM 或超商繳款時顯示 */}
                    {(selectedRefund.paymentMethod === 'ATM轉帳' || selectedRefund.paymentMethod === '超商繳款') && (
                      <div>
                        <label className="block mb-2.5" style={{ fontSize: '10pt' }}>
                          <span className="text-gray-700">退款手續費負擔</span>
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="flex w-full rounded-md overflow-hidden">
                          <button
                            type="button"
                            disabled
                            className={`flex-1 h-10 transition-all flex items-center justify-center border cursor-not-allowed ${
                              selectedRefund.refundFeeBearer === '營運單位'
                                ? 'bg-gray-200 text-gray-600 border-gray-300'
                                : 'bg-white text-gray-400 border-gray-300'
                            }`}
                            style={{ fontSize: '10pt', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px', marginRight: '-1px' }}
                          >
                            營運單位
                          </button>
                          <button
                            type="button"
                            disabled
                            className={`flex-1 h-10 transition-all flex items-center justify-center border cursor-not-allowed ${
                              selectedRefund.refundFeeBearer === '客戶'
                                ? 'bg-gray-200 text-gray-600 border-gray-300'
                                : 'bg-white text-gray-400 border-gray-300'
                            }`}
                            style={{ fontSize: '10pt', borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}
                          >
                            客戶
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 按鈕區 - 只在非退款完成狀態時顯示 */}
                {selectedRefund.refundStatus !== '退款完成' && selectedRefund.refundStatus !== '已終止退款' && (
                  <div className="flex justify-end gap-3 pt-6">
                    <Button
                      variant="outline"
                      onClick={() => setIsRefundPopupOpen(false)}
                      className="h-9 px-6"
                      style={{ fontSize: '10pt' }}
                    >
                      終止退款
                    </Button>
                    <Button
                      onClick={handleRefundSubmit}
                      className="h-9 px-6 text-white"
                      style={{ fontSize: '10pt', backgroundColor: '#409eff' }}
                    >
                      退款
                    </Button>
                  </div>
                )}
              </div>

              {/* 退款紀錄卡片 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mt-4">
                {/* 標題 */}
                <h3 className="text-gray-900 mb-4" style={{ fontSize: '12pt' }}>退款紀錄</h3>
                
                {/* 訂單編號 */}
                <div className="mb-4">
                  <span className="text-gray-700" style={{ fontSize: '10pt' }}>訂單編號 (主單)：</span>
                  <span className="text-gray-900" style={{ fontSize: '10pt' }}>{selectedRefund.orderId}</span>
                </div>

                {/* 退款紀錄列表 */}
                <div className="border border-gray-200 rounded">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>日期</th>
                        <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>狀態</th>
                        <th className="px-4 py-3 text-left text-gray-700 border-b border-gray-200" style={{ fontSize: '10pt' }}>說明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRefund.refundRecords && selectedRefund.refundRecords.length > 0 ? (
                        selectedRefund.refundRecords.map((record: any, index: number) => (
                          <tr key={index} className="border-b border-gray-200 last:border-0">
                            <td className="px-4 py-3 text-gray-900" style={{ fontSize: '10pt' }}>
                              {record.refundRequestTime}
                            </td>
                            <td className="px-4 py-3" style={{ fontSize: '10pt' }}>
                              <Badge 
                                variant="outline"
                                className={
                                  record.refundStatus === '退款完成' ? 'bg-green-50 text-green-700 border-green-200' :
                                  record.refundStatus === '退款中' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                  'bg-red-50 text-red-700 border-red-200'
                                }
                              >
                                {record.refundStatus}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-gray-900" style={{ fontSize: '10pt' }}>
                              退款編號：{record.refundId}｜退款金額：NT$ {record.currentRefundAmount.toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-4 py-8 text-center text-gray-500" style={{ fontSize: '10pt' }}>
                            暫無資料
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}