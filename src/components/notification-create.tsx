import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Bold, Italic, Underline, List, ListOrdered, Link, AlignLeft, AlignCenter, AlignRight, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { CustomDatePicker } from './custom-datepicker'

interface NotificationCreateProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
}

export function NotificationCreate({ isOpen, onClose, onSave }: NotificationCreateProps) {
  const [formData, setFormData] = useState({
    title: '',
    template: '',
    courseName: '',
    recipientTypes: {
      buyer: false,
      registrant: false
    },
    sendDate: undefined as Date | undefined,
    sendTime: '09:00',
    subject: '',
    content: '',
    remark: ''
  })

  const handleRecipientTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      recipientTypes: {
        ...prev.recipientTypes,
        [type]: checked
      }
    }))
  }

  const handleSave = () => {
    // 驗證必填欄位
    if (!formData.title || !formData.subject) {
      alert('請填寫所有必填欄位')
      return
    }
    
    onSave(formData)
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div 
      className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-[80vw] max-w-[80vw] max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-lg text-gray-900 m-0">新增通知信</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none w-6 h-6 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-6">
            {/* 通知信名稱 */}
            <div className="flex items-center">
              <label className="flex items-center justify-end shrink-0 text-sm text-gray-700" style={{ width: '15%' }}>
                <span className="text-red-500 mr-1">*</span>
                通知信名稱
              </label>
              <div style={{ width: '85%' }} className="ml-4">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="請輸入標題"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 選擇模板 */}
            <div className="flex items-center">
              <label className="flex items-center justify-end shrink-0 text-sm text-gray-700" style={{ width: '15%' }}>
                選擇模板
              </label>
              <div style={{ width: '85%' }} className="ml-4">
                <select
                  value={formData.template}
                  onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">請選擇模板</option>
                  <option value="welcome">歡迎通知模板</option>
                  <option value="reminder">提醒通知模板</option>
                  <option value="course">課程通知模板</option>
                  <option value="emergency">緊急通知模板</option>
                </select>
              </div>
            </div>

            {/* 選擇課程 */}
            <div className="flex items-center">
              <label className="flex items-center justify-end shrink-0 text-sm text-gray-700" style={{ width: '15%' }}>
                選擇課程
              </label>
              <div style={{ width: '85%' }} className="ml-4">
                <select
                  value={formData.courseName}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">請選擇課程</option>
                  <option value="1435">1435 [測試．實] 買斷 + 銷售方案 (場) 8 (主場) ★★ Slug ★★</option>
                  <option value="1528">1528 [測試．實] 買斷 + 銷售方案 (場) 8 (二場) ★★ Slug ★★</option>
                </select>
              </div>
            </div>

            {/* 收件人類型 */}
            <div className="flex items-center">
              <label className="flex items-center justify-end shrink-0 text-sm text-gray-700" style={{ width: '15%' }}>
                收件人類型
              </label>
              <div style={{ width: '85%' }} className="ml-4">
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.recipientTypes.buyer}
                      onChange={(e) => handleRecipientTypeChange('buyer', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                      style={{ 
                        backgroundColor: '#FFF',
                        accentColor: '#409eff'
                      }}
                    />
                    <span className="text-sm text-gray-700">購買者</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.recipientTypes.registrant}
                      onChange={(e) => handleRecipientTypeChange('registrant', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                      style={{ 
                        backgroundColor: '#FFF',
                        accentColor: '#409eff'
                      }}
                    />
                    <span className="text-sm text-gray-700">報名表單</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 發送時間 */}
            <div className="flex items-center">
              <label className="flex items-center justify-end shrink-0 text-sm text-gray-700" style={{ width: '15%' }}>
                發送時間
              </label>
              <div style={{ width: '85%' }} className="ml-4">
                <div className="relative w-[280px]">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                  <CustomDatePicker
                    selected={formData.sendDate}
                    onChange={(date) => {
                      if (date) {
                        setFormData(prev => ({ ...prev, sendDate: date }))
                      } else {
                        setFormData(prev => ({ ...prev, sendDate: undefined }))
                      }
                    }}
                    placeholderText="選擇日期時間"
                    className="w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#409eff] focus:ring-1 focus:ring-[#409eff] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 信件主旨 */}
            <div className="flex items-center">
              <label className="flex items-center justify-end shrink-0 text-sm text-gray-700" style={{ width: '15%' }}>
                <span className="text-red-500 mr-1">*</span>
                信件主旨
              </label>
              <div style={{ width: '85%' }} className="ml-4">
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="請輸入信件主旨"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 信件內容 (HTML編輯器) */}
            <div className="flex items-start">
              <label className="flex items-center justify-end shrink-0 text-sm text-gray-700" style={{ width: '15%' }}>
                信件內容
              </label>
              <div style={{ width: '85%' }} className="ml-4">
                {/* 說明文字 */}
                <div className="text-sm text-gray-500 mb-3 leading-relaxed bg-white px-3 pb-3 rounded">
                  若要顯示下列項目內容，請輸入 % 及其後方的文字，例如 %＜order_number＞;<br/><br/>
                  訂單編號 : %＜order_number＞;<br/>
                  課程名稱 : %＜channel_title＞;<br/>
                  課程連結 : %＜course_link＞;<br/>
                  購買方案標題 : %＜bought_plan＞;
                </div>
                
                {/* HTML 編輯器 */}
                <div className="border border-gray-300 rounded bg-white">
                  {/* 編輯器工具列 */}
                  <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50">
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <Bold className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <Italic className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <Underline className="h-4 w-4 text-gray-600" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <List className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <ListOrdered className="h-4 w-4 text-gray-600" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <AlignLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <AlignCenter className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <AlignRight className="h-4 w-4 text-gray-600" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-200 rounded">
                      <Link className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  {/* 內容編輯區 */}
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="請輸入信件內容"
                    className="w-full min-h-[250px] p-3 border-0 resize-none focus:outline-none bg-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 備註 */}
            <div className="flex items-start">
              <label className="flex items-center justify-end shrink-0 text-sm text-gray-700 pt-2" style={{ width: '15%' }}>
                備註
              </label>
              <div style={{ width: '85%' }} className="ml-4">
                <textarea
                  value={formData.remark}
                  onChange={(e) => setFormData(prev => ({ ...prev, remark: e.target.value }))}
                  placeholder="請輸入備註"
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-white">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm border border-transparent rounded text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: '#409eff' }}
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  )
}