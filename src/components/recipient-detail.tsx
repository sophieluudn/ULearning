import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Mail, Phone, User, CheckCircle, XCircle, ArrowLeft } from "lucide-react"

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

interface RecipientDetailProps {
  notification: Notification | undefined
  onBack: () => void
}

export function RecipientDetail({ notification, onBack }: RecipientDetailProps) {
  if (!notification) return null

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

  const getStatusIcon = (status: string) => {
    return status === '已寄送' ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    )
  }

  const getStatusBadge = (status: string) => {
    return status === '已寄送' ? (
      <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
        已寄送
      </Badge>
    ) : (
      <Badge variant="destructive">
        寄送失敗
      </Badge>
    )
  }

  const sentCount = notification.recipients.filter(r => r.status === '已寄送').length
  const failedCount = notification.recipients.filter(r => r.status === '寄送失敗').length

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
              <span>收件人詳情</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            {/* Page Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">收</span>
                </div>
                <div>
                  <h1>收件人詳情</h1>
                  <p className="text-sm text-gray-500">通知信 ID: {notification.id}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
          {/* Notification Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="mb-2">通知信內容</h3>
            <p className="text-blue-600 mb-1">{notification.title}</p>
            <p className="text-sm text-gray-600 mb-2">{notification.content}</p>
            <p className="text-sm text-gray-500">
              最新發送時間：{formatDate(notification.latestSentTime)}
            </p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-blue-600">{notification.recipients.length}</div>
              <div className="text-sm text-gray-600">總收件人數</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-green-600">{sentCount}</div>
              <div className="text-sm text-gray-600">寄送成功</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-red-600">{failedCount}</div>
              <div className="text-sm text-gray-600">寄送失敗</div>
            </div>
          </div>

          {/* Recipients List */}
          <div>
            <h3 className="mb-4">收件人清單</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 w-20">#</th>
                    <th className="text-left py-3 px-4">姓名</th>
                    <th className="text-left py-3 px-4">電話</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4 w-32">寄送狀態</th>
                  </tr>
                </thead>
                <tbody>
                  {notification.recipients.map((recipient, index) => (
                    <tr key={recipient.id} className="border-t border-gray-100">
                      <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{recipient.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{recipient.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-blue-600 hover:underline cursor-pointer">
                            {recipient.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(recipient.status)}
                          {getStatusBadge(recipient.status)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onBack}>
                  返回
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  重新發送失敗通知信
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}