import { ArrowLeft, Copy, Check, ChevronRight, Pencil, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useState } from 'react'
import { toast } from 'sonner@2.0.3'

interface OrderDetailProps {
  orderId: string
  onBack: () => void
  userBrand?: string // 當前使用者的品牌館權限 ('元氣館' | '橘學院' | 'all')
}

// 方案介面
interface OrderPlan {
  id: number
  name: string
  price: number
  quantity: number
  couponDiscount?: number // 該方案的優惠券折抵金額
  isAssetVoided?: boolean // 資產是否已作廢
  refundedAmount?: number // 已退款金額
  splitOrderId: string // 該方案的拆分單編號
  invoiceNumber?: string // 發票號碼
  paymentStatus?: string // 付款狀態
  refundStatus?: string // 退款狀態
}

// 商品介面
interface OrderProduct {
  id: number
  name: string
  brand: string // 品牌館：'元氣館' | '橘學院'
  courseType: '線上課' | '實體課' // 課程類型
  plans: OrderPlan[]
}

// 退款紀錄介面
interface RefundRecord {
  invoiceNumber: string
  refundId: string
  orderTotalAmount: number
  totalRefundedAmount: number
  currentRefundAmount: number
  paymentMethod: string
  orderCreatedTime: string
  paymentTime: string
  refundRequestTime: string
  refundProcessedTime: string
  refundStatus: string
}

// 根據訂單ID動態生成訂單詳細資料的函數
const getOrderDetailByOrderId = (orderId: string) => {
  // 訂單列表中的訂單資料
  const ordersList = {
    'ORD20251013001': {
      mainOrderId: 'ORD20251013001',
      totalAmount: 1500,
      customerName: '王小明',
      email: 'wangxiaoming@example.com',
      phone: '0912345678',
      udnId: 'UDN123456',
      source: '官網課程',
      affCode: 'AFF001',
      products: [
        { 
          id: 1435, 
          name: '冬季古道半日遊', 
          brand: '元氣館',
          courseType: '實體課' as '線上課' | '實體課',
          plans: [
            { id: 44, name: '早鳥方案', price: 500, quantity: 1, couponDiscount: 300, isAssetVoided: true, refundedAmount: 150, splitOrderId: 'ORD20251013001-1', invoiceNumber: 'AB-12345678', paymentStatus: '已付款', refundStatus: '部分退款' }
          ]
        },
        { 
          id: 1442, 
          name: '春季登山體驗', 
          brand: '元氣館',
          courseType: '實體課' as '線上課' | '實體課',
          plans: [
            { id: 45, name: '標準方案', price: 300, quantity: 1, couponDiscount: 0, isAssetVoided: true, refundedAmount: 150, splitOrderId: 'ORD20251013001-2', invoiceNumber: 'CD-23456780', paymentStatus: '已付款', refundStatus: '部分退款' }
          ]
        },
        { 
          id: 1528, 
          name: '離婚財產教戰手冊', 
          brand: '橘學院',
          courseType: '線上課' as '線上課' | '實體課',
          plans: [
            { id: 46, name: '標準方案', price: 700, quantity: 1, couponDiscount: 0, isAssetVoided: false, refundedAmount: 0, splitOrderId: 'ORD20251013001-3', invoiceNumber: 'CD-23456780', paymentStatus: '已付款', refundStatus: '未退款' }
          ]
        }
      ],
      productPrice: 1500,
      couponDiscount: 300,
      couponType: '行銷專案',
      actualAmount: 1200,
      paymentMethod: '超商繳款',
      orderCreatedTime: '2025-10-13 14:30:00',
      paymentTime: '2025-10-14 14:15:23',
      redeemStatus: '未兌換',
      orderStatus: '已付款',
      refundStatus: '已退款',
      paymentDeadline: '2025-10-20 23:59:59',
      paymentCode: '1234567890123456',
      refundRecords: [
        {
          invoiceNumber: 'AB-12345678',
          refundId: 'REF20251013001',
          orderTotalAmount: 1500,
          totalRefundedAmount: 300,
          currentRefundAmount: 300,
          paymentMethod: '超商繳款',
          orderCreatedTime: '2025-10-13 14:30:00',
          paymentTime: '2025-10-14 14:15:23',
          refundRequestTime: '2025-10-15 10:00:00',
          refundProcessedTime: '2025-10-15 15:30:00',
          refundStatus: '退款完成'
        }
      ]
    },
    'ORD202501001': {
      mainOrderId: 'ORD202501001',
      totalAmount: 5999,
      customerName: '張小明',
      email: 'ming@example.com',
      phone: '0923456789',
      udnId: 'UDN001234',
      source: '官網課程',
      affCode: 'AFF002',
      products: [
        { 
          id: 1567, 
          name: '數據分析基礎課程', 
          brand: '橘學院',
          courseType: '線上課' as '線上課' | '實體課',
          plans: [
            { id: 201, name: '進階方案', price: 5999, quantity: 2, couponDiscount: 500, isAssetVoided: false, refundedAmount: 0, splitOrderId: 'SPL202501001A', invoiceNumber: 'EF-34567890', paymentStatus: '已付款', refundStatus: '未退款' }
          ]
        }
      ],
      productPrice: 5999,
      couponDiscount: 500,
      couponType: '公關券',
      actualAmount: 5499,
      paymentMethod: '信用卡',
      orderCreatedTime: '2025-01-15 14:30:00',
      paymentTime: '2025-01-15 14:32:15',
      redeemStatus: '已兌換',
      orderStatus: '已付款',
      refundStatus: '無退款',
      paymentDeadline: '',
      paymentCode: '',
      refundRecords: []
    },
    'ORD202501002': {
      mainOrderId: 'ORD202501002',
      totalAmount: 4999,
      customerName: '李小華',
      email: 'hua@example.com',
      phone: '0934567890',
      udnId: 'UDN005678',
      source: '官網課程',
      affCode: 'AFF003',
      products: [
        { 
          id: 1445, 
          name: '完整程式開發實作', 
          brand: '元氣館',
          courseType: '線上課' as '線上課' | '實體課',
          plans: [
            { id: 202, name: '標準方案', price: 4999, quantity: 1, couponDiscount: 0, isAssetVoided: false, refundedAmount: 0, splitOrderId: 'SPL202501002A', invoiceNumber: '', paymentStatus: '未付款', refundStatus: '未退款' }
          ]
        }
      ],
      productPrice: 4999,
      couponDiscount: 0,
      couponType: null,
      actualAmount: 4999,
      paymentMethod: 'ATM轉帳',
      orderCreatedTime: '2025-01-15 16:45:00',
      paymentTime: '',
      redeemStatus: '未兌換',
      orderStatus: '未付款',
      refundStatus: '無退款',
      paymentDeadline: '2025-01-18 23:59:59',
      paymentCode: 'ATM998877665544',
      refundRecords: []
    },
    'ORD202501003': {
      mainOrderId: 'ORD202501003',
      totalAmount: 7999,
      customerName: '王小美',
      email: 'mei@example.com',
      phone: '0945678901',
      udnId: 'UDN009012',
      source: '官網課程',
      affCode: 'AFF004',
      products: [
        { 
          id: 1598, 
          name: '投資理財入門課', 
          brand: '橘學院',
          courseType: '線上課' as '線上課' | '實體課',
          plans: [
            { id: 203, name: 'VIP方案', price: 7999, quantity: 1, couponDiscount: 1000, isAssetVoided: false, refundedAmount: 0, splitOrderId: 'SPL202501003A', invoiceNumber: 'GH-45678901', paymentStatus: '已付款', refundStatus: '未退款' }
          ]
        }
      ],
      productPrice: 7999,
      couponDiscount: 1000,
      couponType: '行銷專案',
      actualAmount: 6999,
      paymentMethod: '信用卡',
      orderCreatedTime: '2025-01-16 09:15:00',
      paymentTime: '2025-01-16 09:16:45',
      redeemStatus: '已兌換',
      orderStatus: '已付款',
      refundStatus: '無退款',
      paymentDeadline: '',
      paymentCode: '',
      refundRecords: []
    },
    'ORD202501004': {
      mainOrderId: 'ORD202501004',
      totalAmount: 3999,
      customerName: '陳大明',
      email: 'daming@example.com',
      phone: '0901234567',
      udnId: 'UDN003456',
      source: '官網課程',
      affCode: 'AFF005',
      products: [
        { 
          id: 1472, 
          name: '瑜珈入門課程', 
          brand: '元氣館',
          courseType: '實體課' as '線上課' | '實體課',
          plans: [
            { id: 204, name: '早鳥方案', price: 3999, quantity: 3, couponDiscount: 200, isAssetVoided: false, refundedAmount: 0, splitOrderId: 'SPL202501004A', invoiceNumber: 'IJ-56789012', paymentStatus: '已付款', refundStatus: '未退款' }
          ]
        }
      ],
      productPrice: 3999,
      couponDiscount: 200,
      couponType: '公關券',
      actualAmount: 3799,
      paymentMethod: 'LINE Pay',
      orderCreatedTime: '2025-01-16 11:20:00',
      paymentTime: '2025-01-16 11:22:30',
      redeemStatus: '部分兌換',
      orderStatus: '已付款',
      refundStatus: '無退款',
      paymentDeadline: '',
      paymentCode: '',
      refundRecords: []
    },
    'ORD202501005': {
      mainOrderId: 'ORD202501005',
      totalAmount: 8999,
      customerName: '林志偉',
      email: 'wei@example.com',
      phone: '0987654321',
      udnId: 'UDN007890',
      source: '官網課程',
      affCode: 'AFF006',
      products: [
        { 
          id: 1612, 
          name: '行銷策略實戰班', 
          brand: '橘學院',
          courseType: '線上課' as '線上課' | '實體課',
          plans: [
            { id: 205, name: '標準方案', price: 8999, quantity: 1, couponDiscount: 0, isAssetVoided: false, refundedAmount: 0, splitOrderId: 'SPL202501005A', invoiceNumber: '', paymentStatus: '已取消', refundStatus: '未退款' }
          ]
        }
      ],
      productPrice: 8999,
      couponDiscount: 0,
      couponType: null,
      actualAmount: 8999,
      paymentMethod: '信用卡',
      orderCreatedTime: '2025-01-16 13:45:00',
      paymentTime: '',
      redeemStatus: '未兌換',
      orderStatus: '已取消',
      refundStatus: '無退款',
      paymentDeadline: '',
      paymentCode: '',
      refundRecords: []
    },
    'ORD202501006': {
      mainOrderId: 'ORD202501006',
      totalAmount: 6500,
      customerName: '黃佳琪',
      email: 'huang@example.com',
      phone: '0956781234',
      udnId: 'UDN011223',
      source: '官網課程',
      affCode: 'AFF007',
      products: [
        { 
          id: 1488, 
          name: 'Python 程式設計入門', 
          brand: '元氣館',
          courseType: '線上課' as '線上課' | '實體課',
          plans: [
            { id: 206, name: '標準方案', price: 6500, quantity: 1, couponDiscount: 0, isAssetVoided: false, refundedAmount: 0, splitOrderId: 'SPL202501006A', invoiceNumber: 'KL-67890123', paymentStatus: '已付款', refundStatus: '未退款' }
          ]
        }
      ],
      productPrice: 6500,
      couponDiscount: 0,
      couponType: null,
      actualAmount: 6500,
      paymentMethod: 'ATM轉帳',
      orderCreatedTime: '2025-01-17 10:30:00',
      paymentTime: '2025-01-17 15:45:20',
      redeemStatus: '已兌換',
      orderStatus: '已付款',
      refundStatus: '無退款',
      paymentDeadline: '',
      paymentCode: '',
      refundRecords: []
    }
  }

  return ordersList[orderId as keyof typeof ordersList] || ordersList['ORD20251013001']
}

// 模擬訂單詳細資料
const mockOrderDetail = {
  mainOrderId: 'ORD20251013001',
  splitOrderId: 'ORD20251013001-1',
  totalAmount: 1500,
  customerName: '王小明',
  email: 'wangxiaoming@example.com',
  phone: '0912345678',
  udnId: 'UDN123456',
  source: '官網課程',
  // 商品列表（支持多商品，每個商品可有多個方案）
  products: [
    { 
      id: 1435, 
      name: '冬季古道半日遊', 
      brand: '元氣館',
      courseType: '實體課',
      plans: [
        { id: 44, name: '早鳥方案', price: 500, quantity: 1, couponDiscount: 300, isAssetVoided: true, refundedAmount: 150, splitOrderId: 'ORD20251013001-1', invoiceNumber: 'AB-12345678', paymentStatus: '已付款', refundStatus: '未退款' },
        { id: 45, name: '一般方案', price: 300, quantity: 1, couponDiscount: 0, isAssetVoided: false, refundedAmount: 150, splitOrderId: 'ORD20251013001-2', invoiceNumber: 'CD-23456780', paymentStatus: '已付款', refundStatus: '未退款' }
      ]
    },
    { 
      id: 1528, 
      name: '離婚財產教戰手冊 | 陳查理律師教您如何取得最多財產', 
      brand: '橘學院',
      courseType: '線上課',
      plans: [
        { id: 46, name: '標準方案', price: 700, quantity: 1, couponDiscount: 0, isAssetVoided: false, refundedAmount: 0, splitOrderId: 'ORD20251013001-3', invoiceNumber: 'CD-23456780', paymentStatus: '已付款', refundStatus: '未退款' }
      ]
    }
  ],
  productPrice: 1500,
  couponDiscount: 300,
  couponType: '行銷專案', // '公關券' | '行銷專案' | null
  actualAmount: 1200,
  paymentMethod: '超商繳款', // '信用卡' | 'Line Pay' | 'ATM轉帳' | '超商繳款'
  orderCreatedTime: '2025-10-13 14:30:00',
  paymentTime: '2025-10-14 14:15:23',
  redeemStatus: '未兌換',
  orderStatus: '已付款',
  refundStatus: '已退款', // '無退款' | '部分退款' | '全額退款' | '退款處理中' | '已退款'
  // ATM/超商繳款未付款時的額外資訊
  paymentDeadline: '2025-10-20 23:59:59',
  paymentCode: '1234567890123456',
  // 退款紀錄
  refundRecords: [
    {
      invoiceNumber: 'AB12345678',
      refundId: 'REF20251013001',
      orderTotalAmount: 1500,
      totalRefundedAmount: 500,
      currentRefundAmount: 500,
      paymentMethod: '信用卡',
      orderCreatedTime: '2025-10-13 14:30:00',
      paymentTime: '2025-10-13 15:00:00',
      refundRequestTime: '2025-10-15 10:20:00',
      refundProcessedTime: '2025-10-16 14:30:00',
      refundStatus: '退款完成'
    },
    {
      invoiceNumber: 'AB12345678',
      refundId: 'REF20251013002',
      orderTotalAmount: 1500,
      totalRefundedAmount: 800,
      currentRefundAmount: 300,
      paymentMethod: '信用卡',
      orderCreatedTime: '2025-10-13 14:30:00',
      paymentTime: '2025-10-13 15:00:00',
      refundRequestTime: '2025-10-18 09:15:00',
      refundProcessedTime: '2025-10-19 11:45:00',
      refundStatus: '退款完成'
    }
  ] as RefundRecord[]
}

export function OrderDetail({ orderId, onBack, userBrand = 'all' }: OrderDetailProps) {
  // 根據訂單ID獲取對應的訂單詳細資料
  const orderData = getOrderDetailByOrderId(orderId)
  
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)
  const [refundReason, setRefundReason] = useState('買家反悔')
  const [otherReason, setOtherReason] = useState('')
  const [offlineRefundDocNumber, setOfflineRefundDocNumber] = useState('')
  const [refundFeeBearer, setRefundFeeBearer] = useState('營運單位')
  const [refundAmounts, setRefundAmounts] = useState<{[key: string]: string}>({})
  const [isEditingCustomer, setIsEditingCustomer] = useState(false)
  const [editCustomerData, setEditCustomerData] = useState({
    customerName: orderData.customerName,
    phone: orderData.phone,
    email: orderData.email
  })
  const [phoneWarning, setPhoneWarning] = useState(false)
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false) // 儲存後的電話格式錯誤狀態
  const [orderNote, setOrderNote] = useState('') // 訂單備註
  const order = orderData

  // 根據使用者品牌館權限過濾商品
  const filteredProducts = userBrand === 'all' 
    ? order.products 
    : order.products.filter(product => product.brand === userBrand)

  // 重新計算可見商品的金額
  const calculateVisibleAmount = () => {
    let totalPrice = 0
    let totalDiscount = 0
    let totalRefunded = 0
    filteredProducts.forEach(product => {
      product.plans.forEach(plan => {
        totalPrice += plan.price
        totalDiscount += plan.couponDiscount || 0
        totalRefunded += plan.refundedAmount || 0
      })
    })
    return { totalPrice, totalDiscount, totalRefunded }
  }

  const { totalPrice: visibleProductPrice, totalDiscount: visibleCouponDiscount, totalRefunded: visibleRefundedAmount } = calculateVisibleAmount()
  const visibleBrandTotal = visibleProductPrice - visibleCouponDiscount
  const visibleRemainingAmount = visibleBrandTotal - visibleRefundedAmount

  // 判斷付款方式是否為 ATM 或超商繳款（只有這兩種才有繳費期限和代碼）
  const hasPaymentCode = order.paymentMethod === 'ATM轉帳' || order.paymentMethod === '超商繳款'

  // 判斷是否有使用優惠券
  const hasUsedCoupon = order.couponDiscount > 0 && order.couponType

  // 判斷是否可以申請退款（已付款且未退款的訂單）
  const canRefund = order.orderStatus === '已付款' && order.orderStatus !== '已退款' && order.orderStatus !== '退款中'

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    toast.success('已複製到剪貼簿')
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleRefundAmountChange = (planKey: string, value: string, maxAmount: number) => {
    // 只允許輸入數字
    if (value && !/^\d+$/.test(value)) {
      return
    }
    
    // 檢查是否超過最大金���
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue > maxAmount) {
      toast.error(`退款金額不可大於實收金額 ${maxAmount.toLocaleString()}`)
      return
    }
    
    // 更新狀態
    const newAmounts = {...refundAmounts}
    if (value === '') {
      delete newAmounts[planKey]
    } else {
      newAmounts[planKey] = value
    }
    setRefundAmounts(newAmounts)
  }

  const handleRefundRequest = () => {
    // 驗證退款原因
    if (refundReason === '其他原因' && !otherReason.trim()) {
      toast.error('請輸入其他原因')
      return
    }
    
    // 檢查是否有輸入退款金額
    const hasRefundAmount = Object.values(refundAmounts).some(amount => {
      const num = parseInt(amount)
      return !isNaN(num) && num > 0
    })
    
    if (!hasRefundAmount) {
      toast.error('請輸入至少一筆退款金額')
      return
    }
    
    const finalReason = refundReason === '其他原因' ? otherReason : refundReason
    console.log('申請退款:', { 
      orderId: order.mainOrderId, 
      reason: finalReason,
      refundAmounts,
      offlineRefundDocNumber,
      refundFeeBearer
    })
    toast.success('退款申請已送出')
    setIsRefundDialogOpen(false)
    setRefundReason('買家反悔')
    setOtherReason('')
    setOfflineRefundDocNumber('')
    setRefundFeeBearer('營運單位')
    setRefundAmounts({})
    // 這裡可以加入實際的退款 API 呼���
  }

  const validatePhone = (phone: string) => {
    // 檢查是否符合手機格式：09開頭，共10碼
    const mobileRegex = /^09\d{8}$/
    return mobileRegex.test(phone)
  }

  const handleEditCustomer = () => {
    setIsEditingCustomer(true)
    setPhoneWarning(false)
  }

  const handleCancelEditCustomer = () => {
    setEditCustomerData({
      customerName: order.customerName,
      phone: order.phone,
      email: order.email
    })
    setIsEditingCustomer(false)
    setPhoneWarning(false)
    // 取消時恢復原來的驗證狀態
    setIsPhoneInvalid(!validatePhone(order.phone))
  }

  const handlePhoneChange = (phone: string) => {
    setEditCustomerData({ ...editCustomerData, phone })
    // 檢查電話格式
    if (phone.trim() && !validatePhone(phone)) {
      setPhoneWarning(true)
    } else {
      setPhoneWarning(false)
    }
  }

  const handleSaveCustomer = () => {
    // 驗證欄位
    if (!editCustomerData.customerName.trim()) {
      toast.error('請填寫姓名')
      return
    }
    if (!editCustomerData.phone.trim()) {
      toast.error('請填寫電話')
      return
    }
    if (!editCustomerData.email.trim()) {
      toast.error('請填寫信箱')
      return
    }
    
    console.log('保存客戶資料:', editCustomerData)
    
    // 檢查電話格式是否有效
    const isValid = validatePhone(editCustomerData.phone)
    setIsPhoneInvalid(!isValid)
    
    // 這裡可以加入實際的保存 API 呼叫
    toast.success('客戶資料已更新')
    setIsEditingCustomer(false)
    setPhoneWarning(false)
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case '已付款':
        return 'bg-green-100 text-green-700 border-green-200'
      case '未付款':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case '已取消':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      case '退款中':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case '已退款':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const getRedeemStatusColor = (status: string) => {
    switch (status) {
      case '已兌換':
        return 'bg-green-100 text-green-700 border-green-200'
      case '未兌換':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      case '部分兌換':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case '退款完成':
      case '全額退款':
      case '已退款':
        return 'bg-green-50 text-green-700 border-green-200'
      case '退款處理中':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case '退款申請中':
      case '部分退款':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case '退款失敗':
        return 'bg-red-50 text-red-700 border-red-200'
      case '已拒絕':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* 麵包屑導航 */}


      {/* 頂部操作區域 */}


      {/* 主要內容區域 */}
      <div className="px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 卡片 A - 訂單基本資訊 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="mb-4 pb-2 border-b border-gray-200" style={{ fontSize: '10pt', color: '#409eff' }}>
              訂單基本資訊
            </h2>
            <div className="space-y-3">
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>訂單編號(主單)</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.mainOrderId}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>訂單成立時間</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.orderCreatedTime}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>來源</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.source}</span>
              </div>
              
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>訂單總金額</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>AFF code</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.affCode || ''}</span>
              </div>
            </div>
          </div>

          {/* 卡片 D - 付款資訊 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="mb-4 pb-2 border-b border-gray-200" style={{ fontSize: '10pt', color: '#409eff' }}>
              付款資訊
            </h2>
            <div className="space-y-3">
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>付款方式</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.paymentMethod}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>付款狀態</span>
                <span style={{ fontSize: '10pt' }}>
                  {order.orderStatus === '已付款' ? (
                    <span className="text-green-600" style={{ fontWeight: 'bold' }}>已付款</span>
                  ) : (
                    <span className="text-gray-900">{order.orderStatus}</span>
                  )}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>付款時間</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>
                  {order.paymentTime || ''}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>發票號碼</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>
                  {(() => {
                    // 收集所有發票號碼（去重）
                    const invoiceNumbers = new Set<string>()
                    order.products.forEach(product => {
                      product.plans.forEach((plan: any) => {
                        if (plan.invoiceNumber) {
                          invoiceNumbers.add(plan.invoiceNumber)
                        }
                      })
                    })
                    const invoiceList = Array.from(invoiceNumbers)
                    return invoiceList.length > 0 ? invoiceList.join(', ') : ''
                  })()}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>退款狀態</span>
                <span style={{ fontSize: '10pt' }}>
                  {order.refundStatus === '無退款' ? (
                    ''
                  ) : order.refundStatus === '已退款' ? (
                    <span className="text-red-600" style={{ fontWeight: 'bold' }}>已退款</span>
                  ) : (
                    <span className="text-gray-900">{order.refundStatus}</span>
                  )}
                </span>
              </div>
              
              {/* 繳費期限和繳款代碼欄位（一律顯示） */}
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>繳費期限</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>
                  {hasPaymentCode ? order.paymentDeadline : ''}
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-700 w-32 flex-shrink-0 pt-1" style={{ fontSize: '10pt', fontWeight: 500 }}>繳款代碼</span>
                {hasPaymentCode && order.paymentCode ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-mono bg-gray-50 px-3 py-1 rounded border border-gray-200" style={{ fontSize: '10pt' }}>
                      {order.paymentCode}
                    </span>
                    <button
                      onClick={() => handleCopy(order.paymentCode, 'paymentCode')}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="複製繳款代碼"
                    >
                      {copiedField === 'paymentCode' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-900" style={{ fontSize: '10pt' }}></span>
                )}
              </div>
            </div>
          </div>

          {/* 卡片 B - 客戶資訊 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
              <h2 style={{ fontSize: '10pt', color: '#409eff' }}>
                客戶資訊
              </h2>
              {!isEditingCustomer && (
                <button
                  onClick={handleEditCustomer}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="編輯客戶資訊"
                >
                  <Pencil className="w-4 h-4" style={{ color: '#409eff' }} />
                </button>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>姓名</span>
                {isEditingCustomer ? (
                  <Input
                    value={editCustomerData.customerName}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, customerName: e.target.value })}
                    className="flex-1 h-8"
                    style={{ fontSize: '10pt' }}
                  />
                ) : (
                  <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.customerName}</span>
                )}
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>電話</span>
                {isEditingCustomer ? (
                  <div className="flex-1">
                    <Input
                      value={editCustomerData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="h-8"
                      style={{ fontSize: '10pt' }}
                    />
                    {phoneWarning && (
                      <p className="text-orange-600 mt-1" style={{ fontSize: '9pt' }}>
                        手機號碼格式不符
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex-1">
                    <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.phone}</span>
                    {isPhoneInvalid && (
                      <p className="text-red-600 mt-1" style={{ fontSize: '9pt' }}>
                        手機號碼格式不符
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32 flex-shrink-0" style={{ fontSize: '10pt' }}>信箱</span>
                {isEditingCustomer ? (
                  <Input
                    value={editCustomerData.email}
                    onChange={(e) => setEditCustomerData({ ...editCustomerData, email: e.target.value })}
                    className="flex-1 h-8"
                    style={{ fontSize: '10pt' }}
                  />
                ) : (
                  <span className="text-gray-900 break-words" style={{ fontSize: '10pt' }}>{order.email}</span>
                )}
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>UDN ID</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.udnId}</span>
              </div>
              
              {isEditingCustomer && (
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={handleCancelEditCustomer}
                    className="h-8"
                    style={{ fontSize: '10pt' }}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleSaveCustomer}
                    className="h-8 text-white"
                    style={{ fontSize: '10pt', backgroundColor: '#409eff' }}
                  >
                    儲存
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* 卡片 C - 商品資訊 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 lg:col-span-3">
            <h2 className="mb-4 pb-2 border-b border-gray-200" style={{ fontSize: '10pt', color: '#409eff' }}>
              商品資訊
            </h2>
            
            {/* 商品列表 - 扁平化展示，每個方案都包含課程名稱 */}
            <div className="space-y-4">
              {filteredProducts.map((product, productIndex) => (
                product.plans.map((plan, planIndex) => {
                  const planCouponDiscount = plan.couponDiscount || 0
                  const planFinalPrice = plan.price - planCouponDiscount
                  
                  return (
                    <div key={`${product.id}-${plan.id}`} className="bg-white rounded-lg p-4 border border-gray-200 relative">
                      <div className="space-y-3">
                        {/* 訂單編號 (拆分單) */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>訂單編號 (拆分單)</span>
                          <span className="text-gray-900" style={{ fontSize: '10pt' }}>{plan.splitOrderId}</span>
                        </div>
                        
                        {/* 館別 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>館別</span>
                          <span className="text-gray-900" style={{ fontSize: '10pt' }}>{product.brand}</span>
                        </div>
                        
                        {/* 課程名稱 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>課程名稱</span>
                          <div className="flex items-center gap-2 pr-16">
                            <span className="text-gray-900" style={{ fontSize: '10pt', fontWeight: 600 }}>{product.id} {product.name}</span>
                            <Badge 
                              variant="outline" 
                              className={`${product.courseType === '線上課' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'} flex-shrink-0`}
                              style={{ fontSize: '8pt' }}
                            >
                              {product.courseType}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* 方案名稱 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>方案名稱</span>
                          <span className="text-gray-900" style={{ fontSize: '10pt' }}>{plan.id} {plan.name}</span>
                        </div>
                        
                        {/* 數量 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>數量</span>
                          <span className="text-gray-900" style={{ fontSize: '10pt' }}>{plan.quantity}</span>
                        </div>
                        
                        {/* 價格 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>價格</span>
                          <span className="text-gray-900" style={{ fontSize: '10pt' }}>{plan.price.toLocaleString()}</span>
                        </div>
                        
                        {/* 優惠券折抵金額 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>優惠券折抵金額</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900" style={{ fontSize: '10pt' }}>{planCouponDiscount.toLocaleString()}</span>
                            {planCouponDiscount > 0 && order.couponType && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200" style={{ fontSize: '8pt' }}>
                                {order.couponType}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* 小計 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>小計</span>
                          <span className="text-gray-900" style={{ fontSize: '10pt' }}>{planFinalPrice.toLocaleString()}</span>
                        </div>
                        
                        {/* 分隔線 */}
                        <div className="border-t border-gray-200 my-2"></div>
                        
                        {/* 已退款金額 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>已退款金額</span>
                          <span className="text-gray-900" style={{ fontSize: '10pt' }}>
                            {(plan.refundedAmount || 0).toLocaleString()}
                          </span>
                        </div>
                        
                        {/* 兌換處理 */}
                        <div className="flex">
                          <span className="text-gray-500 w-32" style={{ fontSize: '10pt' }}>兌換處理</span>
                          <span style={{ fontSize: '10pt' }}>
                            {(plan.isAssetVoided || (plan.refundedAmount && plan.refundedAmount > 0)) && (
                              <span className="text-red-600" style={{ fontWeight: 'bold' }}>作廢</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              ))}
            </div>

            {/* 總計 */}
            <div className="mt-5">
              <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-4">
                <div className="space-y-3">
                  {/* 商品總額 */}
                  <div className="flex">
                    <span className="text-gray-900 w-32" style={{ fontSize: '10pt', fontWeight: 700 }}>商品總額</span>
                    <span className="text-gray-900" style={{ fontSize: '10pt', fontWeight: 700 }}>{(userBrand !== 'all' ? visibleProductPrice : order.productPrice).toLocaleString()}</span>
                  </div>
                  
                  {/* 優惠券折抵總額 */}
                  {(userBrand !== 'all' ? visibleCouponDiscount : order.couponDiscount) > 0 && (
                    <div className="flex">
                      <span className="text-gray-900 w-32" style={{ fontSize: '10pt', fontWeight: 700 }}>優惠券折抵總額</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt', fontWeight: 700 }}>{(userBrand !== 'all' ? visibleCouponDiscount : order.couponDiscount).toLocaleString()}</span>
                    </div>
                  )}
                  
                  {/* 總計金額 */}
                  <div className="flex">
                    <span className="text-gray-900 w-32" style={{ fontSize: '10pt', fontWeight: 700 }}>總計</span>
                    <span className="text-gray-900" style={{ fontSize: '10pt', fontWeight: 700 }}>{(userBrand !== 'all' ? visibleBrandTotal : order.actualAmount).toLocaleString()}</span>
                  </div>
                  
                  {/* 分隔線 */}
                  <div className="border-t border-gray-300 my-2"></div>
                  
                  {/* 已退款金額 */}
                  <div className="flex">
                    <span className="text-gray-900 w-32" style={{ fontSize: '10pt', fontWeight: 700 }}>已退款金額</span>
                    <span className="text-gray-900" style={{ fontSize: '10pt', fontWeight: 700 }}>{visibleRefundedAmount.toLocaleString()}</span>
                  </div>
                  
                  {/* 剩餘金額 */}
                  <div className="flex">
                    <span className="text-gray-900 w-32" style={{ fontSize: '10pt', fontWeight: 700 }}>剩餘金額</span>
                    <span className="text-gray-900" style={{ fontSize: '10pt', fontWeight: 700 }}>{visibleRemainingAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 卡片 E - 退款紀錄 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 lg:col-span-3">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
              <h2 style={{ fontSize: '10pt', color: '#409eff' }}>
                退款紀錄
              </h2>
              <button
                onClick={() => setIsRefundDialogOpen(true)}
                className="px-4 py-1.5 text-white rounded text-sm hover:opacity-90"
                style={{ backgroundColor: '#409eff', fontSize: '10pt' }}
              >
                申請退款
              </button>
            </div>

            {/* 退款紀錄表格 */}
            {order.refundRecords.length === 0 ? (
              <div className="text-center py-8 text-gray-500" style={{ fontSize: '10pt' }}>
                無退款紀錄
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>發票號碼</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>退款編號</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>訂單總金額</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>已退款總金額</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>本次申請退款金額</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>付款方式</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>申請退款時間</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>處理退款時間</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-gray-700" style={{ fontSize: '10pt' }}>退款狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.refundRecords.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-3 py-2 text-gray-900" style={{ fontSize: '10pt' }}>{record.invoiceNumber}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-900" style={{ fontSize: '10pt' }}>{record.refundId}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-900" style={{ fontSize: '10pt' }}>{record.orderTotalAmount.toLocaleString()}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-900" style={{ fontSize: '10pt' }}>{record.totalRefundedAmount.toLocaleString()}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-900" style={{ fontSize: '10pt' }}>{record.currentRefundAmount.toLocaleString()}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-900" style={{ fontSize: '10pt' }}>{record.paymentMethod}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-900" style={{ fontSize: '10pt' }}>{record.refundRequestTime}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-900" style={{ fontSize: '10pt' }}>{record.refundProcessedTime}</td>
                        <td className="border border-gray-200 px-3 py-2" style={{ fontSize: '10pt' }}>
                          <Badge variant="outline" className={getRefundStatusColor(record.refundStatus)}>
                            {record.refundStatus}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 卡片 F - 備註 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 lg:col-span-3 mt-4">
            <div className="mb-4 pb-2 border-b border-gray-200">
              <h2 style={{ fontSize: '10pt', color: '#409eff' }}>
                備註
              </h2>
            </div>

            {/* 備註輸入區 */}
            <div className="relative">
              <Textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="請輸入訂單備註..."
                className="min-h-[120px] resize-none w-full border-gray-300"
                style={{ fontSize: '10pt', backgroundColor: '#FFF' }}
              />
              <Button
                onClick={() => {
                  console.log('儲存備註:', orderNote)
                  toast.success('備註已儲存')
                }}
                className="absolute bottom-3 right-3 h-8 px-4 text-white"
                style={{ fontSize: '10pt', backgroundColor: '#409eff' }}
              >
                儲存
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 申請退款彈窗 */}
      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent className="!w-[95vw] !max-w-[1400px] sm:!max-w-[1400px] max-h-[90vh] overflow-y-auto overflow-x-hidden" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: '10pt' }}>退款編號</DialogTitle>
          </DialogHeader>
          <div className="py-4 overflow-x-hidden">
            {/* 大卡片 - 包含所有內容 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 overflow-x-hidden">
              {/* 卡片標題 */}
              <div className="mb-6">
                <h3 className="text-gray-900" style={{ fontSize: '12pt' }}>新增退款</h3>
              </div>
              
              {/* 訂單基本資訊 (三列布局) */}
              <div className="rounded p-4 mb-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* 左列 */}
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>訂單編號(主單)：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.mainOrderId}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>發票編號：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>
                        {(() => {
                          const invoiceNumbers = new Set<string>()
                          order.products.forEach(product => {
                            product.plans.forEach((plan: any) => {
                              if (plan.invoiceNumber) {
                                invoiceNumbers.add(plan.invoiceNumber)
                              }
                            })
                          })
                          const invoiceList = Array.from(invoiceNumbers)
                          return invoiceList.length > 0 ? invoiceList.join(', ') : ''
                        })()}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>訂單總金額：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 中列 */}
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>訂單成立時間：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.orderCreatedTime}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>付款時間：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.paymentTime}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-700 w-32 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>付款方式：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.paymentMethod}</span>
                    </div>
                  </div>

                  {/* 右列 */}
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-gray-700 w-24 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>所屬館別：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>
                        {order.products.map(p => p.brand).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-700 w-24 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>姓名：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.customerName}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-700 w-24 flex-shrink-0 text-right" style={{ fontSize: '10pt' }}>Email：</span>
                      <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.email}</span>
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
                      {filteredProducts.map((product, pIndex) => (
                        product.plans.map((plan, plIndex) => (
                          <tr key={`${pIndex}-${plIndex}`} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>{plan.splitOrderId}</td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>{product.id}</td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>{product.name}</td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>{plan.name}</td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>{plan.quantity}</td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>{plan.price.toLocaleString()}</td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>{(plan.couponDiscount || 0).toLocaleString()}</td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {plan.refundStatus === '已退款' ? '已退款' : ''}
                            </td>
                            <td className="border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap" style={{ fontSize: '10pt' }}>
                              {plan.paymentStatus || '-'}
                            </td>
                            <td className="sticky right-[360px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-white z-10" style={{ fontSize: '10pt', minWidth: '120px' }}>{plan.invoiceNumber || '-'}</td>
                            <td className="sticky right-[240px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-white z-10" style={{ fontSize: '10pt', minWidth: '120px' }}>{(plan.price - (plan.couponDiscount || 0)).toLocaleString()}</td>
                            <td className="sticky right-[120px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-white z-10" style={{ fontSize: '10pt', minWidth: '120px' }}>{(plan.refundedAmount || 0).toLocaleString()}</td>
                            <td className="sticky right-0 border border-gray-200 px-2 py-2 whitespace-nowrap bg-white z-10" style={{ fontSize: '10pt', minWidth: '120px' }}>
                              {(() => {
                                const receivedAmount = plan.price - (plan.couponDiscount || 0)
                                const refundedAmount = plan.refundedAmount || 0
                                const maxRefundAmount = receivedAmount - refundedAmount
                                const isDisabled = receivedAmount === 0 || receivedAmount === refundedAmount
                                const planKey = `${pIndex}-${plIndex}`
                                
                                return (
                                  <Input
                                    type="text"
                                    value={refundAmounts[planKey] || ''}
                                    onChange={(e) => handleRefundAmountChange(planKey, e.target.value, maxRefundAmount)}
                                    disabled={isDisabled}
                                    className="h-8 w-24"
                                    style={{ fontSize: '10pt' }}
                                    placeholder="0"
                                  />
                                )
                              })()}
                            </td>
                          </tr>
                        ))
                      ))}
                      {/* 總計行 */}
                      <tr className="bg-gray-50">
                        <td colSpan={9} className="border border-gray-200 px-2 py-2 whitespace-nowrap" style={{ fontSize: '10pt' }}></td>
                        <td className="sticky right-[360px] border border-gray-200 px-2 py-2 text-gray-700 whitespace-nowrap bg-gray-50 z-10 text-right" style={{ fontSize: '10pt', fontWeight: 'bold', minWidth: '120px' }}>總計</td>
                        <td className="sticky right-[240px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-gray-50 z-10" style={{ fontSize: '10pt', fontWeight: 'bold', minWidth: '120px' }}>
                          {(() => {
                            let totalReceived = 0
                            filteredProducts.forEach(product => {
                              product.plans.forEach((plan: any) => {
                                totalReceived += plan.price - (plan.couponDiscount || 0)
                              })
                            })
                            return totalReceived.toLocaleString()
                          })()}
                        </td>
                        <td className="sticky right-[120px] border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-gray-50 z-10" style={{ fontSize: '10pt', fontWeight: 'bold', minWidth: '120px' }}>{visibleRefundedAmount.toLocaleString()}</td>
                        <td className="sticky right-0 border border-gray-200 px-2 py-2 text-gray-900 whitespace-nowrap bg-gray-50 z-10" style={{ fontSize: '10pt', fontWeight: 'bold', minWidth: '120px' }}>
                          {(() => {
                            let total = 0
                            Object.values(refundAmounts).forEach(amount => {
                              const num = parseInt(amount)
                              if (!isNaN(num)) total += num
                            })
                            return total.toLocaleString()
                          })()}
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
                    <Select value={refundReason} onValueChange={setRefundReason}>
                      <SelectTrigger className="w-full h-10 bg-white border-gray-300 py-0" style={{ fontSize: '10pt', height: '40px' }}>
                        <SelectValue />
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
                      disabled={refundReason !== '其他原因'}
                    />
                  </div>

                  {/* 線下退款電子公文編號 */}
                  <div>
                    <label className="block mb-2.5" style={{ fontSize: '10pt' }}>
                      <span className="text-gray-700">線下退款電子公文編號</span>
                    </label>
                    <Input
                      value={offlineRefundDocNumber}
                      onChange={(e) => setOfflineRefundDocNumber(e.target.value)}
                      placeholder="若為線下付款，請輸入電子公文編號"
                      className="h-10 bg-white border-gray-300 py-0"
                      style={{ fontSize: '10pt', height: '40px' }}
                    />
                  </div>

                  {/* 退款手續費負擔 - ATM 或超商繳款時顯示 */}
                  {(order.paymentMethod === 'ATM轉帳' || order.paymentMethod === '超商繳款') && (
                    <div>
                      <label className="block mb-2.5" style={{ fontSize: '10pt' }}>
                        <span className="text-gray-700">退款手續費負擔</span>
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="flex w-full rounded-md overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setRefundFeeBearer('營運單位')}
                          disabled={false}
                          className={`flex-1 h-10 transition-all bg-white flex items-center justify-center ${
                            refundFeeBearer === '營運單位'
                              ? 'border-2 border-[#409eff] text-[#409eff]'
                              : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                          } disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed`}
                          style={{ fontSize: '10pt', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px', marginRight: '-1px' }}
                        >
                          營運單位
                        </button>
                        <button
                          type="button"
                          onClick={() => setRefundFeeBearer('客戶')}
                          disabled={false}
                          className={`flex-1 h-10 transition-all bg-white flex items-center justify-center ${
                            refundFeeBearer === '客戶'
                              ? 'border-2 border-[#409eff] text-[#409eff]'
                              : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                          } disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed`}
                          style={{ fontSize: '10pt', borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}
                        >
                          客戶
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 按鈕區 */}
              <div className="flex justify-end gap-3 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsRefundDialogOpen(false)}
                  className="h-9 px-6"
                  style={{ fontSize: '10pt' }}
                >
                  取消申請
                </Button>
                <Button
                  onClick={handleRefundRequest}
                  className="h-9 px-6 text-white"
                  style={{ fontSize: '10pt', backgroundColor: '#409eff' }}
                >
                  申請退款
                </Button>
              </div>
            </div>

            {/* 退款紀錄卡片 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-4">
              {/* 標題 */}
              <h3 className="text-gray-900 mb-4" style={{ fontSize: '12pt' }}>退款紀錄</h3>
              
              {/* 訂單編號 */}
              <div className="mb-4">
                <span className="text-gray-700" style={{ fontSize: '10pt' }}>訂單編號 (主單)：</span>
                <span className="text-gray-900" style={{ fontSize: '10pt' }}>{order.mainOrderId}</span>
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
                    {order.refundRecords && order.refundRecords.length > 0 ? (
                      order.refundRecords.map((record, index) => (
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
        </DialogContent>
      </Dialog>
    </div>
  )
}
