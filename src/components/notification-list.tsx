import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  courseId: string
  courseName: string
  recipients: Recipient[]
}

interface NotificationListProps {
  notifications: Notification[]
  onEditNotification: (notificationId: number) => void
  onViewRecipients: (notificationId: number) => void
}

export function NotificationList({ notifications, onEditNotification, onViewRecipients }: NotificationListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  const getRecipientSummary = (recipients: Recipient[]) => {
    const sentCount = recipients.filter(r => r.status === '已寄送').length
    const failedCount = recipients.filter(r => r.status === '寄送失敗').length
    return { sentCount, failedCount, total: recipients.length }
  }

  return (
    <div className="px-4">
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-20">ID</th>
              <th className="text-left py-3 px-4 text-sm text-gray-700 border-b">通知信名稱</th>
              <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-24">課程 ID</th>
              <th className="text-left py-3 px-4 text-sm text-gray-700 border-b">課程名稱</th>
              <th className="text-left py-3 px-4 text-sm text-gray-700 border-b">通知信主旨</th>
              <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-40">發送時間</th>
              <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-32">發送紀錄</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => {
              const { sentCount, failedCount, total } = getRecipientSummary(notification.recipients)
              
              return (
                <tr key={notification.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`} style={{ verticalAlign: 'middle' }}>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b align-middle">{notification.id}</td>
                  <td className="py-3 px-4 text-sm border-b align-middle">
                    <div 
                      className="cursor-pointer hover:underline"
                      style={{ color: '#409eff' }}
                      onClick={() => onEditNotification(notification.id)}
                    >
                      {notification.title}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b align-middle">
                    {notification.courseId}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b align-middle">
                    <div className="max-w-xs break-words whitespace-pre-wrap leading-relaxed">
                      {notification.courseName}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b align-middle">
                    <div className="break-words">
                      {notification.content.length > 50 
                        ? `${notification.content.substring(0, 50)}...` 
                        : notification.content
                      }
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-b align-middle whitespace-nowrap">
                    {formatDate(notification.latestSentTime)}
                  </td>
                  <td className="py-3 px-4 text-sm border-b align-middle">
                    <div 
                      className="cursor-pointer hover:underline"
                      style={{ color: '#409eff' }}
                      onClick={() => onViewRecipients(notification.id)}
                    >
                      查看
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 mb-4 pr-4">
        <div className="flex items-center space-x-1">
          <button 
            disabled 
            className="p-2 text-gray-400 cursor-not-allowed hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1 text-sm text-white rounded" style={{ backgroundColor: '#409eff' }}>
            1
          </button>
          <button className="px-3 py-1 text-sm rounded hover:bg-blue-50" style={{ color: '#409eff' }}>
            2
          </button>
          <button className="p-2 rounded hover:bg-blue-50" style={{ color: '#409eff' }}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}