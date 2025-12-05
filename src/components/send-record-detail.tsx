import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ArrowLeft, Search, Mail, Phone, User, CheckCircle, XCircle, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, Clock, Loader, Send } from "lucide-react"
import { toast } from "sonner@2.0.3"

interface Recipient {
  id: number
  name: string
  phone: string
  email: string
  status: '已發送' | '發送失敗' | '已退信'
  sentTime: string
}

interface Notification {
  id: number
  title: string
  content: string
  latestSentTime: string
  courseName: string
  recipients: Recipient[]
}



interface SendRecordDetailProps {
  notification: Notification | undefined
  onBack: () => void
  isPopup?: boolean
}

export function SendRecordDetail({ notification, onBack, isPopup = false }: SendRecordDetailProps) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState<string>('25')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed' | 'bounced'>('all')
  const [isResending, setIsResending] = useState(false)
  const [selectedRecipients, setSelectedRecipients] = useState<Set<number>>(new Set())
  const [isSending, setIsSending] = useState(false)

  if (!notification) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  }

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${month}-${day} ${hour}:${minute}`
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case '已發送':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case '發送失敗':
        return <XCircle className="w-4 h-4 text-red-500" />
      case '已退信':
        return <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case '已發送':
        return (
          <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
            成功
          </Badge>
        )
      case '發送失敗':
        return (
          <Badge variant="destructive">
            失敗
          </Badge>
        )
      case '已退信':
        return (
          <Badge variant="default" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            已退信
          </Badge>
        )
      default:
        return (
          <Badge variant="default" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            未知
          </Badge>
        )
    }
  }

  // 模擬每個收件人都有發送時間
  const recipientsWithSentTime = notification.recipients.map(recipient => ({
    ...recipient,
    sentTime: notification.latestSentTime // 在實際應用中，每個收件人可能有不同的發送時間
  }))

  // 搜尋過濾
  const filteredRecipients = recipientsWithSentTime
    .filter(recipient => {
      // 狀態篩選
      if (statusFilter === 'success' && recipient.status !== '已發送') return false
      if (statusFilter === 'failed' && recipient.status !== '發送失敗') return false
      if (statusFilter === 'bounced' && recipient.status !== '已退信') return false
      
      // 關鍵字搜尋
      if (!searchKeyword) return true
      const keyword = searchKeyword.toLowerCase()
      return (
        recipient.name.toLowerCase().includes(keyword) ||
        recipient.phone.includes(keyword) ||
        recipient.email.toLowerCase().includes(keyword)
      )
    })

  const pendingCount = notification.recipients.filter(r => r.status === '等待發送中').length
  const sendingCount = notification.recipients.filter(r => r.status === '發送中').length
  const sentCount = notification.recipients.filter(r => r.status === '已寄送').length
  const failedCount = notification.recipients.filter(r => r.status === '寄送失敗').length
  const successRate = Math.round((sentCount / notification.recipients.length) * 100)

  // 分頁邏輯
  const itemsPerPageNumber = parseInt(itemsPerPage)
  const totalPages = Math.ceil(filteredRecipients.length / itemsPerPageNumber)
  const startIndex = (currentPage - 1) * itemsPerPageNumber
  const endIndex = startIndex + itemsPerPageNumber
  const paginatedRecipients = filteredRecipients.slice(startIndex, endIndex)

  // 當搜尋或篩選條件改變時重置到第一頁
  const resetToFirstPage = () => {
    setCurrentPage(1)
  }

  // 處理每頁筆數變更
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value)
    setCurrentPage(1) // 重置到第一頁
  }

  // 處理上一頁
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // 處理下一頁
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // 處理搜尋變更
  const handleSearchChange = (value: string) => {
    setSearchKeyword(value)
    resetToFirstPage()
  }

  // 處理狀態篩選變更
  const handleStatusFilterChange = (value: 'all' | 'success' | 'failed' | 'bounced') => {
    setStatusFilter(value)
    resetToFirstPage()
  }

  // 處理單個收件人勾選
  const handleToggleRecipient = (recipientId: number) => {
    const newSelected = new Set(selectedRecipients)
    if (newSelected.has(recipientId)) {
      newSelected.delete(recipientId)
    } else {
      newSelected.add(recipientId)
    }
    setSelectedRecipients(newSelected)
  }

  // 處理全選
  const handleToggleAll = () => {
    if (selectedRecipients.size === paginatedRecipients.length) {
      // 取消全選
      setSelectedRecipients(new Set())
    } else {
      // 全選當前頁
      const newSelected = new Set<number>()
      paginatedRecipients.forEach(r => newSelected.add(r.id))
      setSelectedRecipients(newSelected)
    }
  }

  // 處理發送選中的收件人
  const handleSendSelected = async () => {
    if (selectedRecipients.size === 0) {
      toast.error('請至少選擇一位收件人')
      return
    }

    setIsSending(true)
    
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 顯示成功通知
      toast.success(`成功發送給 ${selectedRecipients.size} 位收件人`, {
        description: '已完成發送作業，請稍後檢查發送狀態'
      })
      
      // 清空選擇
      setSelectedRecipients(new Set())
    } catch (error) {
      toast.error('發送失敗', {
        description: '發送過程中發生錯誤，請稍後再試'
      })
    } finally {
      setIsSending(false)
    }
  }

  // 判斷是否全選
  const isAllSelected = paginatedRecipients.length > 0 && selectedRecipients.size === paginatedRecipients.length
  const isSomeSelected = selectedRecipients.size > 0 && selectedRecipients.size < paginatedRecipients.length

  // 處理重新發送
  const handleResendFailed = async () => {
    const failedRecipients = notification.recipients.filter(r => r.status === '寄送失敗')
    
    if (failedRecipients.length === 0) {
      toast.error('沒有發送失敗的紀錄需要重發')
      return
    }

    setIsResending(true)
    
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 2000))
      

      
      // 顯示成功通知
      toast.success(`成功重發 ${failedRecipients.length} 筆失敗記錄`, {
        description: '已完成重新發送作業，請稍後檢查發送狀態'
      })
    } catch (error) {
      toast.error('重發失敗', {
        description: '發送過程中發生錯誤，請稍後再試'
      })
    } finally {
      setIsResending(false)
    }
  }

  if (isPopup) {
    return (
      <div className="bg-white">
        {/* Content - Popup Version */}
        <div className="space-y-6">


          {/* 篩選器和搜尋 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* 狀態下拉選單 */}
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-40 h-8 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部發送狀態</SelectItem>
                  <SelectItem value="success">成功</SelectItem>
                  <SelectItem value="failed">失敗</SelectItem>
                  <SelectItem value="bounced">已退信</SelectItem>
                </SelectContent>
              </Select>
              
              {/* 搜尋輸入框 */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 w-64 h-8 bg-white border-gray-300"
                  placeholder="搜尋姓名、電話或 Email"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {selectedRecipients.size > 0 && (
                <span className="text-sm text-gray-600">
                  已選擇 {selectedRecipients.size} 人
                </span>
              )}
              <Button
                onClick={handleSendSelected}
                disabled={isSending || selectedRecipients.size === 0}
                className="text-white hover:opacity-90 h-8"
                style={{ backgroundColor: '#409eff' }}
              >
                {isSending ? '發送中...' : '發送通知信'}
              </Button>
            </div>
          </div>

          {/* Recipients List */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-center py-3 px-4 text-sm text-gray-700 border-b w-12">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleToggleAll}
                      aria-label="全選"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-32">姓名</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-32">電話</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-48">Email</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-40">發送時間</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-32">發送狀態</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecipients.length > 0 ? (
                  paginatedRecipients.map((recipient, index) => (
                    <tr key={recipient.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                      <td className="text-center py-3 px-4 text-sm border-b">
                        <Checkbox
                          checked={selectedRecipients.has(recipient.id)}
                          onCheckedChange={() => handleToggleRecipient(recipient.id)}
                          aria-label={`選擇 ${recipient.name}`}
                        />
                      </td>
                      <td className="py-3 px-4 text-sm border-b">
                        {recipient.name}
                      </td>
                      <td className="py-3 px-4 text-sm border-b">
                        {recipient.phone}
                      </td>
                      <td className="py-3 px-4 text-sm border-b">
                        <span style={{ color: '#409eff' }}>{recipient.email}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 border-b">
                        {formatDate(recipient.sentTime)}
                      </td>
                      <td className="py-3 px-4 text-sm border-b">
                        {getStatusBadge(recipient.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                      {statusFilter === 'success' && '沒有成功發送的紀錄'}
                      {statusFilter === 'failed' && '沒有發送失敗的紀錄'}
                      {statusFilter === 'bounced' && '沒有已退信的紀錄'}
                      {statusFilter === 'all' && (searchKeyword ? '沒有找到符合搜尋條件的紀錄' : '暫無發送紀錄')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer - 移到操作記錄上方 */}
          {filteredRecipients.length > 0 && (
            <div className="flex justify-end items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">筆數</span>
                <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
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
              
              <div className="flex items-center space-x-1">
                <button 
                  onClick={handlePreviousPage}
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
                  onClick={handleNextPage}
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            {/* Page Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1>發送紀錄明細</h1>
                  <p className="text-sm text-gray-500">通知信 ID: {notification.id} - {notification.title}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>返回列表</span>
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Search Bar */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 w-64 bg-white border-gray-300"
                    placeholder="搜尋姓名、電話或 Email"
                  />
                </div>
              </div>

              {/* Recipients List */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-center py-3 px-4 text-sm text-gray-700 border-b w-12">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={handleToggleAll}
                          aria-label="全選"
                        />
                      </th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-32">姓名</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-32">電話</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-48">Email</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-40">發送時間</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700 border-b w-32">發送狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRecipients.length > 0 ? (
                      paginatedRecipients.map((recipient, index) => (
                        <tr key={recipient.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                          <td className="text-center py-3 px-4 text-sm border-b">
                            <Checkbox
                              checked={selectedRecipients.has(recipient.id)}
                              onCheckedChange={() => handleToggleRecipient(recipient.id)}
                              aria-label={`選擇 ${recipient.name}`}
                            />
                          </td>
                          <td className="py-3 px-4 text-sm border-b">
                            {recipient.name}
                          </td>
                          <td className="py-3 px-4 text-sm border-b">
                            {recipient.phone}
                          </td>
                          <td className="py-3 px-4 text-sm border-b">
                            <span style={{ color: '#409eff' }}>{recipient.email}</span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700 border-b">
                            {formatDate(recipient.sentTime)}
                          </td>
                          <td className="py-3 px-4 text-sm border-b">
                            {getStatusBadge(recipient.status)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                          {filteredRecipients.length === 0 ? (searchKeyword ? '沒有找到符合搜尋條件的紀錄' : '暫無發送紀錄') : '暫無資料'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer - 移到表格右下方 */}
              {filteredRecipients.length > 0 && (
                <div className="flex justify-end items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">筆數</span>
                    <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
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
                  
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={handlePreviousPage}
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
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 cursor-pointer'}`}
                      title="下一頁"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={onBack}>
                  返回
                </Button>
                <Button
                  onClick={handleResendFailed}
                  disabled={isResending || failedCount === 0}
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: '#409eff' }}
                >
                  {isResending ? (
                    <>
                      <RotateCcw className="w-4 h-4 mr-1 animate-spin" />
                      發送中...
                    </>
                  ) : (
                    '重新發送失敗通知信'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}