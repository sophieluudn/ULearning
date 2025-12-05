import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { ArrowLeft, Save } from "lucide-react"

interface Recipient {
  id: number
  name: string
  phone: string
  email: string
  status: '已寄送' | '寄送失敗'
}

interface Notification {
  id: number
  title: string
  content: string
  latestSentTime: string
  recipients: Recipient[]
}

interface NotificationEditProps {
  notification: Notification | undefined
  onBack: () => void
}

export function NotificationEdit({ notification, onBack }: NotificationEditProps) {
  const [title, setTitle] = useState(notification?.title || '')
  const [content, setContent] = useState(notification?.content || '')

  if (!notification) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSave = () => {
    // 這裡處理保存邏輯
    console.log('保存通知信：', { id: notification.id, title, content })
    // 可以在這裡調用 API 保存資料
    onBack()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回列表</span>
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>首頁</span>
              <span>›</span>
              <span>系統管理</span>
              <span>›</span>
              <span>通知信設定</span>
              <span>›</span>
              <span>編輯通知信</span>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            {/* Page Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">編</span>
                </div>
                <div>
                  <h1>編輯通知信</h1>
                  <p className="text-sm text-gray-500">ID: {notification.id}</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">通知信 ID</label>
                  <Input value={notification.id} disabled className="bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm mb-2">最新發送時間</label>
                  <Input 
                    value={formatDate(notification.latestSentTime)} 
                    disabled 
                    className="bg-gray-50" 
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm mb-2">標題 <span className="text-red-500">*</span></label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="請輸入通知信標題"
                  className="w-full"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm mb-2">內容 <span className="text-red-500">*</span></label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="請輸入通知信內容"
                  className="w-full min-h-[200px]"
                />
              </div>

              {/* Recipients Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="mb-3">收件人統計</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl text-blue-600">{notification.recipients.length}</div>
                    <div className="text-sm text-gray-600">總收件人數</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-green-600">
                      {notification.recipients.filter(r => r.status === '已寄送').length}
                    </div>
                    <div className="text-sm text-gray-600">寄送成功</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-red-600">
                      {notification.recipients.filter(r => r.status === '寄送失敗').length}
                    </div>
                    <div className="text-sm text-gray-600">寄送失敗</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button variant="outline" onClick={onBack}>
                  取消
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  保存變更
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}