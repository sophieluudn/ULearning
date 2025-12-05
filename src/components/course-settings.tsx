import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { NotificationList } from './notification-list'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { SendRecordDetail } from './send-record-detail'
import { NotificationCreate } from './notification-create'

interface Notification {
  id: number
  title: string
  content: string
  latestSentTime: string
  courseName: string
  recipients: any[]
}

interface CourseSettingsProps {
  courseId: number
  courseName: string
  onBack: () => void
  notifications: Notification[]
  onEditNotification: (id: number) => void
}

export function CourseSettings({ courseId, courseName, onBack, notifications, onEditNotification }: CourseSettingsProps) {
  const [itemsPerPage, setItemsPerPage] = useState<string>('25')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [isRecordDetailOpen, setIsRecordDetailOpen] = useState(false)
  const [recordDetailNotificationId, setRecordDetailNotificationId] = useState<number | null>(null)
  const [isCreateNotificationOpen, setIsCreateNotificationOpen] = useState(false)

  const handleViewRecipients = (notificationId: number) => {
    setRecordDetailNotificationId(notificationId)
    setIsRecordDetailOpen(true)
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

  const recordDetailNotification = notifications.find(n => n.id === recordDetailNotificationId)
  return (
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
          
          <TabsContent value="basic" className="mt-0 p-6 border-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-4">課程 ID: {courseId}</h3>
                <p className="text-sm text-gray-600">{courseName}</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">基本資料設定內容...</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="mt-0 p-6 border-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-4">價格設定</h3>
                <p className="text-sm text-gray-500">價格設定內容...</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="playlist" className="mt-0 p-6 border-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-4">播放列表</h3>
                <p className="text-sm text-gray-500">播放列表內容...</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forms" className="mt-0 p-6 border-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-4">表單設定</h3>
                <p className="text-sm text-gray-500">表單設定內容...</p>
              </div>
            </div>
          </TabsContent>

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
                notifications={notifications}
                onEditNotification={onEditNotification}
                onViewRecipients={handleViewRecipients}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>

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
    </div>
  )
}
