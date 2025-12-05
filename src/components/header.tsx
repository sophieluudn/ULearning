import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "./ui/breadcrumb"
import { Card, CardContent } from "./ui/card"
import { useState } from "react"

interface HeaderProps {
  currentView?: string
  onNavigateToOrderManagement?: () => void
  onNavigateToCourseList?: () => void
  onNavigateToMemberList?: () => void
  onNavigateToGlobalMemberList?: () => void
  onNavigateToRefundList?: () => void
  onNavigateToCourseStudentsList?: () => void // 新增課程學員資訊
  onNavigateToCouponList?: () => void // 新增優惠券
  onNavigateToOrderReport?: () => void // 新增訂單報表
  onNavigateToMarketingPositions?: () => void // 新增行銷版位
  selectedOrderId?: string | null
  selectedCourseId?: number | null
  selectedCourseName?: string
  selectedCourseStudentId?: number | null
  selectedCourseStudentName?: string
  selectedCouponId?: string | null
  selectedCouponName?: string
  onBackToOrderManagement?: () => void
  onBackToCourseList?: () => void
  onBackToCourseStudentsList?: () => void
  selectedVenue?: string
  onVenueChange?: (venue: string) => void
}

export function Header({ currentView = 'list', onNavigateToOrderManagement, onNavigateToCourseList, onNavigateToMemberList, onNavigateToGlobalMemberList, onNavigateToRefundList, onNavigateToCourseStudentsList, onNavigateToCouponList, onNavigateToOrderReport, onNavigateToMarketingPositions, selectedOrderId, selectedCourseId, selectedCourseName, selectedCourseStudentId, selectedCourseStudentName, selectedCouponId, selectedCouponName, onBackToOrderManagement, onBackToCourseList, onBackToCourseStudentsList, selectedVenue, onVenueChange }: HeaderProps) {
  const [isManagementOpen, setIsManagementOpen] = useState(false)
  const [isContentManagementOpen, setIsContentManagementOpen] = useState(false)
  const [isStoreManagementOpen, setIsStoreManagementOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)

  return (
    <header className="bg-gray-800 text-white">
      {/* First Row - Brand, Version, Actions, User */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Brand & Version & Update Button */}
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold">(測試) 課程後台管理系統</span>
          <span className="text-2xl text-yellow-400">v1.34.8</span>
          
          {/* Update Homepage Button */}
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-200 text-blue-800 border-blue-200 hover:bg-blue-300 hover:text-blue-900 rounded-full px-6"
          >
            更新首頁
          </Button>
        </div>

        {/* Right Section - Site Selector & User Info */}
        <div className="flex items-center space-x-4">
          {/* Site Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">目前是：</span>
            <Select 
              value={selectedVenue || "元氣館"} 
              onValueChange={onVenueChange}
            >
              <SelectTrigger className="w-36 h-8 bg-white text-gray-800 border-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="U 好學 (總館)">U 好學 (總館)</SelectItem>
                <SelectItem value="元氣館">元氣館</SelectItem>
                <SelectItem value="橘學院">橘學院</SelectItem>
                <SelectItem value="一刻鯨選">一刻鯨選</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">Charlie</span>
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Navigation Menu */}
      <div className="px-6 py-2">
        <nav className="flex items-center justify-start space-x-8">
          {/* 內容管理 - 下拉選單 */}
          <div 
            className="relative"
            onMouseEnter={() => setIsContentManagementOpen(true)}
            onMouseLeave={() => setIsContentManagementOpen(false)}
          >
            <a href="#" className="text-white hover:text-gray-300 text-xl py-1">內容管理</a>
            {isContentManagementOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-36">
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToCourseList?.()
                  }}
                >
                  課程管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  講師管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  IP / CP 管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  銷售區域管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  通知分類
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  通知管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  表現形式管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  課程分類管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  標籤
                </a>
              </div>
            )}
          </div>
          
          {/* 商店管理 - 下拉選單 */}
          <div 
            className="relative"
            onMouseEnter={() => setIsStoreManagementOpen(true)}
            onMouseLeave={() => setIsStoreManagementOpen(false)}
          >
            <a href="#" className="text-white hover:text-gray-300 text-xl py-1">商店管理</a>
            {isStoreManagementOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-36">
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToMarketingPositions?.()
                  }}
                >
                  行銷版位
                </a>
              </div>
            )}
          </div>
          
          <a href="#" className="text-white hover:text-gray-300 text-xl py-1">營運工具</a>
          <a href="#" className="text-white hover:text-gray-300 text-xl py-1">專區管理</a>
          <a href="#" className="text-white hover:text-gray-300 text-xl py-1">2B 客戶</a>
          
          {/* 經營工具 - 下拉選單 */}
          <div 
            className="relative"
            onMouseEnter={() => setIsManagementOpen(true)}
            onMouseLeave={() => setIsManagementOpen(false)}
          >
            <a href="#" className="text-white hover:text-gray-300 text-xl py-1">經營工具</a>
            {isManagementOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-36">
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToCouponList?.()
                  }}
                >
                  優惠券
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  交易紀錄
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToOrderManagement?.()
                  }}
                >
                  訂單管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToGlobalMemberList?.()
                  }}
                >
                  全域會員管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToMemberList?.()
                  }}
                >
                  會員管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  會員資產管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  價格管理
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToCourseStudentsList?.()
                  }}
                >
                  課程學員資訊
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToRefundList?.()
                  }}
                >
                  退款作業
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToMarketingPositions?.()
                  }}
                >
                  行銷版位
                </a>
              </div>
            )}
          </div>
          
          {/* 報表 - 下拉選單 */}
          <div 
            className="relative"
            onMouseEnter={() => setIsReportOpen(true)}
            onMouseLeave={() => setIsReportOpen(false)}
          >
            <a href="#" className="text-white hover:text-gray-300 text-xl py-1">報表</a>
            {isReportOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-36">
                <a 
                  href="#" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigateToOrderReport?.()
                  }}
                >
                  訂單報表
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-white px-6 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                首頁
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <span className="text-gray-400">/</span>
            </BreadcrumbSeparator>
            {currentView === 'course-list' || currentView === 'course-settings' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    內容管理
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {currentView === 'course-settings' ? (
                    <BreadcrumbLink 
                      href="#" 
                      className="text-sm hover:underline" 
                      style={{ color: '#409eff' }}
                      onClick={(e) => {
                        e.preventDefault()
                        onBackToCourseList?.()
                      }}
                    >
                      課程管理
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-gray-800 text-sm">
                      課程管理
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {currentView === 'course-settings' && selectedCourseId && (
                  <>
                    <BreadcrumbSeparator>
                      <span className="text-gray-400">/</span>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-gray-800 text-sm">
                        {selectedCourseId} {selectedCourseName}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </>
            ) : currentView === 'member-list' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    經營工具
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-800 text-sm">
                    會員管理
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : currentView === 'global-member-list' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    經營工具
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-800 text-sm">
                    全域會員管理
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : currentView === 'refund-list' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    經營工具
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-800 text-sm">
                    退款作業
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : currentView === 'course-students-list' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    經營工具
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {selectedCourseStudentId ? (
                    <BreadcrumbLink 
                      href="#" 
                      className="text-sm hover:underline" 
                      style={{ color: '#409eff' }}
                      onClick={(e) => {
                        e.preventDefault()
                        onBackToCourseStudentsList?.()
                      }}
                    >
                      課程學員資訊
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-gray-800 text-sm">
                      課程學員資訊
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {selectedCourseStudentId && (
                  <>
                    <BreadcrumbSeparator>
                      <span className="text-gray-400">/</span>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-gray-800 text-sm">
                        {selectedCourseStudentId} {selectedCourseStudentName}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </>
            ) : currentView === 'coupon-list' || currentView === 'coupon-settings' || currentView === 'coupon-create' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    經營工具
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {currentView === 'coupon-settings' || currentView === 'coupon-create' ? (
                    <BreadcrumbLink 
                      href="#" 
                      className="text-sm hover:underline" 
                      style={{ color: '#409eff' }}
                      onClick={(e) => {
                        e.preventDefault()
                        onNavigateToCouponList?.()
                      }}
                    >
                      優惠券
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-gray-800 text-sm">
                      優惠券
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {currentView === 'coupon-settings' && selectedCouponName && (
                  <>
                    <BreadcrumbSeparator>
                      <span className="text-gray-400">/</span>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-gray-800 text-sm">
                        {selectedCouponName}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
                {currentView === 'coupon-create' && (
                  <>
                    <BreadcrumbSeparator>
                      <span className="text-gray-400">/</span>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-gray-800 text-sm">
                        新增優惠專券
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </>
            ) : currentView === 'order-management' || currentView === 'order-detail' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    經營工具
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {currentView === 'order-detail' ? (
                    <BreadcrumbLink 
                      href="#" 
                      className="text-sm hover:underline" 
                      style={{ color: '#409eff' }}
                      onClick={(e) => {
                        e.preventDefault()
                        onBackToOrderManagement?.()
                      }}
                    >
                      訂單管理
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-gray-800 text-sm">
                      訂單管理
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {currentView === 'order-detail' && selectedOrderId && (
                  <>
                    <BreadcrumbSeparator>
                      <span className="text-gray-400">/</span>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-gray-800 text-sm">
                        {selectedOrderId}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </>
            ) : currentView === 'order-report' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    報表
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-800 text-sm">
                    訂單
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : currentView === 'marketing-positions' ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    商店管理
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-800 text-sm">
                    行銷版位
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm hover:underline" style={{ color: '#409eff' }}>
                    內容管理
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="#" 
                    className="text-sm hover:underline" 
                    style={{ color: '#409eff' }}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigateToCourseList?.()
                    }}
                  >
                    課程管理
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <span className="text-gray-400">/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-800 text-sm">
                    1435 [測試．實] 買斷 + 銷售方案 (場) 8 (主場) ★★ Slug ★★
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

    </header>
  )
}