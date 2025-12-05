import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowUpDown, RefreshCw } from 'lucide-react'

interface Coupon {
  id: string
  type: string // 類型
  displayName: string // 專案用顯示名稱
  internalName: string // 專案名稱內部用
  content: string // 內容
  code: string // 通關密語
  validPeriod: string // 優惠券期限
  status: 'active' | 'inactive' // 狀態：上架/下架
  remark: string // 備註
  createTime: string
}

// 模擬優惠券資料
const mockCoupons: Coupon[] = [
  {
    id: 'C001',
    type: '公關券',
    displayName: '新會員專屬優惠',
    internalName: 'NEW_MEMBER_DISCOUNT',
    content: '滿500折100',
    code: 'WELCOME100',
    validPeriod: '2025-12-31',
    status: 'active',
    remark: '',
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 'C002',
    type: '行銷專案',
    displayName: '夏季課程8折優惠',
    internalName: 'SUMMER_20_OFF',
    content: '全館課程8折',
    code: 'SUMMER20',
    validPeriod: '2024-08-31',
    status: 'inactive',
    remark: '',
    createTime: '2024-05-20 14:30:00'
  },
  {
    id: 'C003',
    type: '團購券',
    displayName: 'VIP會員專屬',
    internalName: 'VIP_GOLD_15',
    content: '85折優惠',
    code: 'VIPGOLD',
    validPeriod: '2025-12-31',
    status: 'active',
    remark: '',
    createTime: '2024-12-15 09:00:00'
  },
  {
    id: 'C004',
    type: '公關券',
    displayName: '新年特惠',
    internalName: 'NEWYEAR_500',
    content: '滿3000折500',
    code: 'NEWYEAR500',
    validPeriod: '2025-01-31',
    status: 'inactive',
    remark: '',
    createTime: '2024-12-25 16:00:00'
  },
  {
    id: 'C005',
    type: '行銷專案',
    displayName: '春季課程9折',
    internalName: 'SPRING_10_OFF',
    content: '課程9折',
    code: 'SPRING10',
    validPeriod: '2025-05-31',
    status: 'active',
    remark: '',
    createTime: '2025-02-20 11:00:00'
  },
  {
    id: 'C006',
    type: '團購券',
    displayName: '早鳥優惠',
    internalName: 'EARLY_BIRD_200',
    content: '滿1500折200',
    code: 'EARLY200',
    validPeriod: '2025-03-31',
    status: 'inactive',
    remark: '',
    createTime: '2024-12-30 10:00:00'
  },
  {
    id: 'C007',
    type: '公關券',
    displayName: '好友推薦優惠',
    internalName: 'FRIEND_REFERRAL_50',
    content: '折抵50元',
    code: 'FRIEND50',
    validPeriod: '2025-12-31',
    status: 'active',
    remark: '',
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 'C008',
    type: '行銷專案',
    displayName: '組合課程優惠',
    internalName: 'BUNDLE_25_OFF',
    content: '組合課程75折',
    code: 'BUNDLE25',
    validPeriod: '2025-04-30',
    status: 'active',
    remark: '',
    createTime: '2025-01-25 14:00:00'
  },
  {
    id: 'C009',
    type: '團購券',
    displayName: '週年慶優惠',
    internalName: 'ANNIVERSARY_1000',
    content: '滿5000折1000',
    code: 'ANNI1000',
    validPeriod: '2025-06-30',
    status: 'active',
    remark: '',
    createTime: '2025-05-15 10:00:00'
  },
  {
    id: 'C010',
    type: '公關券',
    displayName: '會員日優惠',
    internalName: 'MEMBER_DAY_30',
    content: '全館7折',
    code: 'MEMBER30',
    validPeriod: '2025-03-15',
    status: 'inactive',
    remark: '',
    createTime: '2025-03-01 09:00:00'
  }
]

type SortField = 'type' | 'status' | null
type SortDirection = 'asc' | 'desc'

interface CouponListProps {
  onViewCouponSettings: (couponId: string, couponName: string) => void
  onCreateCoupon: () => void
}

export function CouponList({ onViewCouponSettings, onCreateCoupon }: CouponListProps) {
  const [itemsPerPage, setItemsPerPage] = useState<string>('25')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // 篩選和排序後的資料
  const filteredAndSortedCoupons = useMemo(() => {
    let filtered = [...mockCoupons]
    
    // 篩選狀態
    if (filterStatus !== 'all') {
      filtered = filtered.filter(coupon => coupon.status === filterStatus)
    }
    
    // 篩選類型
    if (filterType !== 'all') {
      filtered = filtered.filter(coupon => coupon.type === filterType)
    }
    
    // 關鍵字搜尋
    if (searchKeyword) {
      filtered = filtered.filter(coupon => 
        coupon.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        coupon.displayName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        coupon.internalName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        coupon.content.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    }
    
    // 排序
    if (sortField === 'type') {
      filtered.sort((a, b) => {
        const comparison = a.type.localeCompare(b.type, 'zh-TW')
        return sortDirection === 'asc' ? comparison : -comparison
      })
    } else if (sortField === 'status') {
      filtered.sort((a, b) => {
        const comparison = a.status.localeCompare(b.status)
        return sortDirection === 'asc' ? comparison : -comparison
      })
    }
    
    return filtered
  }, [filterStatus, filterType, searchKeyword, sortField, sortDirection])

  const handleExport = () => {
    console.log('匯出優惠券資料')
  }

  const handleCreateCoupon = () => {
    onCreateCoupon()
  }

  const handleEdit = (couponId: string) => {
    console.log('編輯優惠券:', couponId)
  }

  const handleDelete = (couponId: string) => {
    console.log('刪除優惠券:', couponId)
  }

  const handleCopy = (couponId: string) => {
    console.log('複製優惠券:', couponId)
  }

  const handleOpenSettings = (couponId: string, couponName: string) => {
    onViewCouponSettings(couponId, couponName)
  }

  return (
    <div className="bg-white px-6 py-6">
      {/* 篩選區塊 */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          {/* 左側：新增按鈕 */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors"
              onClick={handleCreateCoupon}
            >
              <span className="text-white text-xs">+</span>
            </div>
            <span className="text-sm">新增專案</span>
          </div>
          
          {/* 右側：搜尋 */}
          <div className="flex items-center space-x-3">
            {/* 搜尋輸入框 */}
            <Input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-48 h-8 bg-white"
              placeholder="關鍵字"
            />
            
            {/* 查詢按鈕 */}
            <Button 
              size="sm"
              className="h-8 px-3"
              style={{ backgroundColor: '#409eff' }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Coupon List Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1">
                    <span>類型</span>
                    <button 
                      onClick={() => handleSort('type')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">專案用顯示名稱</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">專案名稱內部用</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">內容</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">通關密語</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">優惠券期限</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1">
                    <span>狀態</span>
                    <button 
                      onClick={() => handleSort('status')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">操作</TableHead>
                <TableHead className="text-center whitespace-nowrap">備註</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCoupons.map((coupon) => (
                <TableRow key={coupon.id} className="hover:bg-gray-50">
                  <TableCell className="text-center border-r border-gray-200">
                    {coupon.type}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    {coupon.displayName}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    <a 
                      href="#" 
                      className="hover:underline" 
                      style={{ color: '#409eff' }}
                      onClick={(e) => {
                        e.preventDefault()
                        handleOpenSettings(coupon.id, coupon.internalName)
                      }}
                    >
                      {coupon.internalName}
                    </a>
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    {coupon.content}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    {coupon.code}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200 whitespace-nowrap">
                    {coupon.validPeriod}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    <span className={coupon.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                      {coupon.status === 'active' ? '上架' : '下架'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    {(coupon.id === 'C002' || coupon.id === 'C007') && (
                      <Button 
                        size="sm"
                        className="h-7 px-3 text-sm text-white"
                        style={{ backgroundColor: '#409eff' }}
                        onClick={() => handleCopy(coupon.id)}
                      >
                        複製
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-600">
                    {coupon.remark || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination and Items Per Page */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-end">
          <div className="flex items-center space-x-6">
            {/* 每頁顯示筆數 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">每頁顯示</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-24 h-8 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* 分頁 */}
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                上一頁
              </button>
              <button className="px-3 py-1 text-white rounded text-sm" style={{ backgroundColor: '#409eff' }}>
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                下一頁
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
