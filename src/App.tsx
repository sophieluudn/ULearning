import { useState } from 'react'
import { NotificationList } from './components/notification-list'
import { RecipientDetail } from './components/recipient-detail'
import { NotificationEdit } from './components/notification-edit'
import { SendRecordDetail } from './components/send-record-detail'
import { NotificationCreate } from './components/notification-create'
import { OrderManagement } from './components/order-management'
import { OrderDetail } from './components/order-detail'
import { CourseList } from './components/content-course-list'
import { CourseSettings } from './components/course-settings'
import { MemberList } from './components/member-list'
import { GlobalMemberList } from './components/global-member-list'
import { RefundList } from './components/refund-list'
import { CourseManagementContainer } from './components/course-management-container'
import { CouponList } from './components/coupon-list'
import { CouponSettings } from './components/coupon-settings'
import { CouponCreate } from './components/coupon-create'
import { OrderReport } from './components/order-report'
import { MarketingPositions } from './components/marketing-positions'
import { Header } from './components/header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog'
import { Toaster } from './components/ui/sonner'
import './styles/datepicker.css'

// 模擬數據
const mockNotifications = [
  {
    id: 693,
    title: '10/15 開課通知',
    content: '【重要通知】10月15日課程開課提醒，請準時參加',
    latestSentTime: '2025-10-14 15:00:00',
    courseId: '1435',
    courseName: '1435 [測試．實] 買斷 + 銷售方案 (場) 8 (主場) ★★ Slug ★★',
    recipients: [
      { id: 1, name: '張小明', phone: '0912345678', email: 'ming@example.com', status: '已發送' },
      { id: 2, name: '李小華', phone: '0923456789', email: 'hua@example.com', status: '發送失敗' },
      { id: 3, name: '王小美', phone: '0934567890', email: 'mei@example.com', status: '已退信' },
      { id: 4, name: '陳大明', phone: '0901234567', email: 'daming@example.com', status: '已發送' },
      { id: 5, name: '林志偉', phone: '0987654321', email: 'wei@example.com', status: '已發送' },
      { id: 6, name: '黃淑芬', phone: '0976543210', email: 'fen@example.com', status: '已發送' },
      { id: 7, name: '劉建國', phone: '0965432109', email: 'guo@example.com', status: '發送失敗' },
      { id: 8, name: '許雅婷', phone: '0954321098', email: 'ting@example.com', status: '已發送' },
      { id: 9, name: '郭明輝', phone: '0943210987', email: 'hui@example.com', status: '已發送' },
      { id: 10, name: '楊麗華', phone: '0932109876', email: 'lihua@example.com', status: '已退信' },
      { id: 11, name: '蔡志強', phone: '0921098765', email: 'qiang@example.com', status: '已發送' },
      { id: 12, name: '吳佩真', phone: '0910987654', email: 'zhen@example.com', status: '已發送' },
      { id: 13, name: '洪德成', phone: '0909876543', email: 'cheng@example.com', status: '發送失敗' },
      { id: 14, name: '趙美玲', phone: '0998765432', email: 'ling@example.com', status: '已發送' },
      { id: 15, name: '周俊傑', phone: '0987654321', email: 'jie@example.com', status: '已發送' },
      { id: 16, name: '鄭雅文', phone: '0976543218', email: 'wen@example.com', status: '已退信' },
      { id: 17, name: '馮志豪', phone: '0965432187', email: 'hao@example.com', status: '已發送' },
      { id: 18, name: '盧佳蓉', phone: '0954321876', email: 'rong@example.com', status: '已發送' },
      { id: 19, name: '戴國華', phone: '0943218765', email: 'hua@example.com', status: '發送失敗' },
      { id: 20, name: '薛惠珍', phone: '0932187654', email: 'zhen2@example.com', status: '已發送' },
      { id: 21, name: '魏建華', phone: '0921876543', email: 'hua2@example.com', status: '已發送' },
      { id: 22, name: '余淑娟', phone: '0918765432', email: 'juan@example.com', status: '已退信' },
      { id: 23, name: '羅志成', phone: '0987654320', email: 'cheng2@example.com', status: '已發送' },
      { id: 24, name: '簡美惠', phone: '0976543209', email: 'hui2@example.com', status: '已發送' },
      { id: 25, name: '藍俊德', phone: '0965432098', email: 'de@example.com', status: '發送失敗' },
      { id: 26, name: '石雅慧', phone: '0954320987', email: 'hui3@example.com', status: '已發送' },
      { id: 27, name: '方志明', phone: '0943209876', email: 'ming2@example.com', status: '已發送' },
      { id: 28, name: '蕭佩君', phone: '0932098765', email: 'jun@example.com', status: '已退信' },
      { id: 29, name: '姚建宏', phone: '0920987654', email: 'hong@example.com', status: '已發送' },
      { id: 30, name: '廖淑芳', phone: '0989876543', email: 'fang@example.com', status: '已發送' },
      { id: 31, name: '鍾志偉', phone: '0978765432', email: 'wei2@example.com', status: '發送失敗' },
      { id: 32, name: '江美玲', phone: '0967654321', email: 'ling2@example.com', status: '已發送' },
      { id: 33, name: '童俊雄', phone: '0956543210', email: 'xiong@example.com', status: '已發送' },
      { id: 34, name: '龐雅琪', phone: '0945432109', email: 'qi@example.com', status: '已退信' },
      { id: 35, name: '孫志華', phone: '0934321098', email: 'hua3@example.com', status: '已發送' },
      { id: 36, name: '姜佩萱', phone: '0923210987', email: 'xuan@example.com', status: '已發送' },
      { id: 37, name: '范建明', phone: '0912109876', email: 'ming3@example.com', status: '發送失敗' },
      { id: 38, name: '莊淑惠', phone: '0991098765', email: 'hui4@example.com', status: '已發送' },
      { id: 39, name: '高志強', phone: '0980987654', email: 'qiang2@example.com', status: '已發送' },
      { id: 40, name: '溫美娟', phone: '0979876543', email: 'juan2@example.com', status: '已退信' },
      { id: 41, name: '古俊德', phone: '0968765432', email: 'de2@example.com', status: '已發送' },
      { id: 42, name: '沈雅芳', phone: '0957654321', email: 'fang2@example.com', status: '已發送' },
      { id: 43, name: '謝志豪', phone: '0946543210', email: 'hao2@example.com', status: '發送失敗' },
      { id: 44, name: '金佩雯', phone: '0935432109', email: 'wen2@example.com', status: '已發送' },
      { id: 45, name: '葉建國', phone: '0924321098', email: 'guo2@example.com', status: '已發送' },
      { id: 46, name: '柯淑玲', phone: '0913210987', email: 'ling3@example.com', status: '已退信' },
      { id: 47, name: '韓志明', phone: '0992109876', email: 'ming4@example.com', status: '已發送' },
      { id: 48, name: '尹美華', phone: '0981098765', email: 'hua4@example.com', status: '已發送' },
      { id: 49, name: '曾俊傑', phone: '0970987654', email: 'jie2@example.com', status: '發送失敗' },
      { id: 50, name: '賴雅婷', phone: '0969876543', email: 'ting2@example.com', status: '已發送' },
      { id: 51, name: '顏志文', phone: '0958765432', email: 'wen4@example.com', status: '已發送' },
      { id: 52, name: '施美君', phone: '0947654321', email: 'jun2@example.com', status: '已退信' },
      { id: 53, name: '駱建志', phone: '0936543210', email: 'zhi@example.com', status: '發送失敗' },
      { id: 54, name: '紀雅惠', phone: '0925432109', email: 'hui5@example.com', status: '已發送' },
      { id: 55, name: '車俊宏', phone: '0994321098', email: 'hong2@example.com', status: '已發送' },
      { id: 56, name: '卓淑美', phone: '0983210987', email: 'mei2@example.com', status: '已發送' },
      { id: 57, name: '粘志剛', phone: '0972109876', email: 'gang@example.com', status: '已退信' },
      { id: 58, name: '白佩芬', phone: '0961098765', email: 'fen2@example.com', status: '已發送' },
      { id: 59, name: '包建文', phone: '0950987654', email: 'wen5@example.com', status: '已發送' },
      { id: 60, name: '秦雅玲', phone: '0949876543', email: 'ling5@example.com', status: '發送失敗' }
    ]
  },
  {
    id: 530,
    title: '09/30 風災停課通知',
    content: '【緊急通知】因颱風影響，9月30日課程暫停，復課時間另行通知',
    latestSentTime: '2025-09-29 11:00:00',
    courseId: '1528',
    courseName: '1528 [測試．實] 買斷 + 銷售方案 (場) 8 (二場) ★★ Slug ★★',
    recipients: [
      { id: 61, name: '陳小杰', phone: '0945678901', email: 'jie3@example.com', status: '已發送' },
      { id: 62, name: '林小雯', phone: '0956789012', email: 'wen3@example.com', status: '已退信' }
    ]
  },
  {
    id: 529,
    title: '09/22 開課通知',
    content: '【課程通知】9月22日新學期課程正式開始，歡迎同學踴躍參與',
    latestSentTime: '2025-09-21 16:00:00',
    courseId: '1445',
    courseName: '1445 [測試．實] 完整程式開發 (場) 3 (主場) ★★ Programming ★★',
    recipients: [
      { id: 63, name: '黃小強', phone: '0967890123', email: 'qiang3@example.com', status: '發送失敗' }
    ]
  },
  {
    id: 526,
    title: '09/18 開課通知',
    content: '【開課提醒】9月18日課程即將開始，請同學提前準備相關教材',
    latestSentTime: '2025-09-17 09:00:00',
    courseId: '1567',
    courseName: '1567 [測試．實] 數據分析基礎 (場) 5 (主場) ★★ Analytics ★★',
    recipients: [
      { id: 64, name: '劉小安', phone: '0978901234', email: 'an2@example.com', status: '已發送' },
      { id: 65, name: '蔡小平', phone: '0989012345', email: 'ping2@example.com', status: '已退信' },
      { id: 66, name: '吳小玲', phone: '0990123456', email: 'ling4@example.com', status: '發送失敗' }
    ]
  }
]

type PageView = 'list' | 'edit' | 'recipients' | 'order-management' | 'order-detail' | 'course-list' | 'course-settings' | 'member-list' | 'global-member-list' | 'refund-list' | 'course-students-list' | 'coupon-list' | 'coupon-settings' | 'coupon-create' | 'order-report' | 'marketing-positions'

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('order-management')
  const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)
  const [selectedCourseName, setSelectedCourseName] = useState<string>('')
  const [selectedCourseStudentId, setSelectedCourseStudentId] = useState<number | null>(null)
  const [selectedCourseStudentName, setSelectedCourseStudentName] = useState<string>('')
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null)
  const [selectedCouponName, setSelectedCouponName] = useState<string>('')
  const [itemsPerPage, setItemsPerPage] = useState<string>('25')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [isRecordDetailOpen, setIsRecordDetailOpen] = useState(false)
  const [recordDetailNotificationId, setRecordDetailNotificationId] = useState<number | null>(null)
  const [isCreateNotificationOpen, setIsCreateNotificationOpen] = useState(false)
  const [userBrand, setUserBrand] = useState<string>('all') // 'all' | '元氣館' | '橘學院'
  const [selectedVenue, setSelectedVenue] = useState<string>('元氣館')

  const handleEditNotification = (notificationId: number) => {
    setSelectedNotificationId(notificationId)
    setCurrentView('edit')
  }

  const handleViewRecipients = (notificationId: number) => {
    setRecordDetailNotificationId(notificationId)
    setIsRecordDetailOpen(true)
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedNotificationId(null)
  }

  const handleCloseRecordDetail = () => {
    setIsRecordDetailOpen(false)
    setRecordDetailNotificationId(null)
  }

  const handleCreateNotification = () => {
    setIsCreateNotificationOpen(true)
  }

  const handleCloseCreateNotification = () => {
    setIsCreateNotificationOpen(false)
  }

  const handleSaveNotification = (data: any) => {
    console.log('新增通知信:', data)
    // 這裡可以加入保存邏輯
  }

  const handleNavigateToOrderManagement = () => {
    setCurrentView('order-management')
  }

  const handleViewOrderDetail = (orderId: string) => {
    setSelectedOrderId(orderId)
    setCurrentView('order-detail')
  }

  const handleBackToOrderManagement = () => {
    setCurrentView('order-management')
    setSelectedOrderId(null)
  }

  const handleNavigateToCourseList = () => {
    setCurrentView('course-list')
  }

  const handleViewCourseSettings = (courseId: number, courseName: string) => {
    setSelectedCourseId(courseId)
    setSelectedCourseName(courseName)
    setCurrentView('course-settings')
  }

  const handleBackToCourseList = () => {
    setCurrentView('course-list')
    setSelectedCourseId(null)
    setSelectedCourseName('')
  }

  const handleNavigateToMemberList = () => {
    setCurrentView('member-list')
  }

  const handleNavigateToGlobalMemberList = () => {
    setCurrentView('global-member-list')
  }

  const handleNavigateToRefundList = () => {
    setCurrentView('refund-list')
  }

  const handleNavigateToCourseStudentsList = () => {
    setCurrentView('course-students-list')
    setSelectedCourseStudentId(null)
    setSelectedCourseStudentName('')
  }

  const handleCourseStudentChange = (courseId: number | null, courseName: string) => {
    setSelectedCourseStudentId(courseId)
    setSelectedCourseStudentName(courseName)
  }

  const handleBackToCourseStudentsList = () => {
    setSelectedCourseStudentId(null)
    setSelectedCourseStudentName('')
  }

  const handleNavigateToCouponList = () => {
    setCurrentView('coupon-list')
  }

  const handleViewCouponSettings = (couponId: string, couponName: string) => {
    setSelectedCouponId(couponId)
    setSelectedCouponName(couponName)
    setCurrentView('coupon-settings')
  }

  const handleBackToCouponList = () => {
    setCurrentView('coupon-list')
    setSelectedCouponId(null)
    setSelectedCouponName('')
  }

  const handleCreateCoupon = () => {
    setCurrentView('coupon-create')
  }

  const handleSaveCoupon = () => {
    console.log('優惠券已儲存')
    setCurrentView('coupon-list')
  }

  const handleNavigateToOrderReport = () => {
    setCurrentView('order-report')
  }

  const handleNavigateToMarketingPositions = () => {
    setCurrentView('marketing-positions')
  }

  const selectedNotification = mockNotifications.find(n => n.id === selectedNotificationId)
  const recordDetailNotification = mockNotifications.find(n => n.id === recordDetailNotificationId)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        currentView={currentView} 
        onNavigateToOrderManagement={handleNavigateToOrderManagement}
        onNavigateToCourseList={handleNavigateToCourseList}
        onNavigateToMemberList={handleNavigateToMemberList}
        onNavigateToGlobalMemberList={handleNavigateToGlobalMemberList}
        onNavigateToRefundList={handleNavigateToRefundList}
        onNavigateToCourseStudentsList={handleNavigateToCourseStudentsList}
        onNavigateToCouponList={handleNavigateToCouponList}
        onNavigateToOrderReport={handleNavigateToOrderReport}
        onNavigateToMarketingPositions={handleNavigateToMarketingPositions}
        selectedCouponId={selectedCouponId}
        selectedCouponName={selectedCouponName}
        selectedOrderId={selectedOrderId}
        selectedCourseId={selectedCourseId}
        selectedCourseName={selectedCourseName}
        selectedCourseStudentId={selectedCourseStudentId}
        selectedCourseStudentName={selectedCourseStudentName}
        onBackToOrderManagement={handleBackToOrderManagement}
        onBackToCourseList={handleBackToCourseList}
        onBackToCourseStudentsList={handleBackToCourseStudentsList}
        selectedVenue={selectedVenue}
        onVenueChange={setSelectedVenue}
      />

      {/* Main Content */}
      <main className="bg-white min-h-screen">
        {currentView === 'list' && (
          <div className="bg-white px-6 pt-6">
            <Tabs defaultValue="notifications" className="w-full">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <TabsList className="h-auto p-0 bg-gray-50 border-b border-gray-200 rounded-none w-fit justify-start ml-0">
                  <TabsTrigger 
                    value="basic" 
                    className="px-3 py-2 rounded-none border-r border-gray-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-b-white data-[state=active]:-mb-px bg-gray-50 hover:opacity-80 transition-colors text-sm"
                    style={{ color: '#409eff' }}
                  >
                    基本資料
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pricing" 
                    className="px-3 py-2 rounded-none border-r border-gray-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-b-white data-[state=active]:-mb-px bg-gray-50 hover:opacity-80 transition-colors text-sm"
                    style={{ color: '#409eff' }}
                  >
                    設定價格
                  </TabsTrigger>
                  <TabsTrigger 
                    value="playlist" 
                    className="px-3 py-2 rounded-none border-r border-gray-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-b-white data-[state=active]:-mb-px bg-gray-50 hover:opacity-80 transition-colors text-sm"
                    style={{ color: '#409eff' }}
                  >
                    播放列表
                  </TabsTrigger>
                  <TabsTrigger 
                    value="forms" 
                    className="px-3 py-2 rounded-none border-r border-gray-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-b-white data-[state=active]:-mb-px bg-gray-50 hover:opacity-80 transition-colors text-sm"
                    style={{ color: '#409eff' }}
                  >
                    設定表單
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="px-3 py-2 rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-b-white data-[state=active]:-mb-px bg-gray-50 hover:opacity-80 transition-colors text-sm"
                    style={{ color: '#409eff' }}
                  >
                    通知信
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="notifications" className="mt-0 p-0 border-none">
                  <div className="bg-white">
                    {/* Page Header */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors"
                            onClick={handleCreateNotification}
                          >
                            <span className="text-white text-xs">+</span>
                          </div>
                          <span className="text-sm">新增通知信</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          {/* 每頁顯示筆數 */}
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">筆數</span>
                            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                              <SelectTrigger className="w-20 h-8 bg-white border-gray-300">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {/* 搜尋區塊 */}
                          <div className="flex items-center space-x-2">
                            <input 
                              type="text" 
                              value={searchKeyword}
                              onChange={(e) => setSearchKeyword(e.target.value)}
                              className="border border-gray-300 rounded px-3 py-1 text-sm w-40 h-8 bg-white"
                              placeholder="請輸入關鍵字"
                            />
                            <button className="text-white rounded px-4 py-1 text-sm h-8 hover:opacity-90" style={{ backgroundColor: '#409eff' }}>
                              查詢
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notification List */}
                    <NotificationList 
                      notifications={mockNotifications}
                      onEditNotification={handleEditNotification}
                      onViewRecipients={handleViewRecipients}
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}

        {currentView === 'order-management' && (
          <OrderManagement onViewOrderDetail={handleViewOrderDetail} />
        )}

        {currentView === 'order-detail' && selectedOrderId && (
          <OrderDetail 
            orderId={selectedOrderId} 
            onBack={handleBackToOrderManagement}
            userBrand={userBrand}
          />
        )}

        {currentView === 'course-list' && (
          <CourseList onViewCourseSettings={handleViewCourseSettings} />
        )}

        {currentView === 'course-settings' && selectedCourseId && (
          <CourseSettings 
            courseId={selectedCourseId}
            courseName={selectedCourseName}
            onBack={handleBackToCourseList}
            notifications={mockNotifications}
            onEditNotification={handleEditNotification}
          />
        )}

        {currentView === 'member-list' && (
          <MemberList />
        )}

        {currentView === 'global-member-list' && (
          <GlobalMemberList />
        )}

        {currentView === 'refund-list' && (
          <RefundList />
        )}

        {currentView === 'course-students-list' && (
          <CourseManagementContainer 
            onCourseChange={handleCourseStudentChange} 
            selectedCourseId={selectedCourseStudentId}
            selectedCourseName={selectedCourseStudentName}
          />
        )}

        {currentView === 'coupon-list' && (
          <CouponList 
            onViewCouponSettings={handleViewCouponSettings}
            onCreateCoupon={handleCreateCoupon}
          />
        )}

        {currentView === 'coupon-settings' && selectedCouponId && (
          <CouponSettings couponId={selectedCouponId} onBack={handleBackToCouponList} />
        )}

        {currentView === 'coupon-create' && (
          <CouponCreate 
            onClose={handleBackToCouponList}
            onSave={handleSaveCoupon}
          />
        )}

        {currentView === 'order-report' && (
          <OrderReport />
        )}

        {currentView === 'marketing-positions' && (
          <MarketingPositions selectedVenue={selectedVenue} />
        )}
      </main>

      {/* Send Record Detail Popup */}
      <Dialog open={isRecordDetailOpen} onOpenChange={setIsRecordDetailOpen}>
        <DialogContent className="w-[80vw] max-w-[80vw] max-h-[90vh] overflow-auto sm:max-w-[80vw]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>發送紀錄</DialogTitle>
          </DialogHeader>
          {recordDetailNotification && (
            <div className="-mt-2 mb-4">
              <div className="text-sm text-gray-500 mb-2">
                {recordDetailNotification.title}
              </div>
              <div className="text-xs text-gray-400 break-words leading-relaxed">
                {recordDetailNotification.courseName}
              </div>
            </div>
          )}
          <SendRecordDetail
            notification={recordDetailNotification}
            onBack={handleCloseRecordDetail}
            isPopup={true}
          />
        </DialogContent>
      </Dialog>

      {/* Create Notification Popup */}
      <NotificationCreate
        isOpen={isCreateNotificationOpen}
        onClose={handleCloseCreateNotification}
        onSave={handleSaveNotification}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}