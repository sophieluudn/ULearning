import { useState } from 'react'
import { ChevronDown, RefreshCw } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

// 模擬數據
const mockStudents = [
  {
    id: 2735,
    orderStatus: '手動新增',
    orderNumber: 'M25TH0403954542',
    paymentMethod: '手動新增',
    udnId: 'KKXX234',
    name: 'k k k',
    email: 'M4523498A.com',
    phone: '4393A512',
    formLink: '複製報名表單連結',
    orderCreatedTime: '2025-11-18 12:39:46',
    paymentTime: '2025-11-18 12:39:46',
    invoiceNumber: 'AB12345678',
    planName: '2795 [測試・實] 買斷 + 銷售方案 (場) 7 (主場) P2',
    affcode: 'AFF001',
    address: '台北市信義區信義路五段7號',
    refundStatus: null // 無退款
  },
  {
    id: 2729,
    orderStatus: '已付款',
    orderNumber: 'D25T1H0355661706',
    paymentMethod: 'ATM',
    udnId: 'Is2025I1I4-1',
    name: 'sophie',
    email: 'sophiekaishi8@gmail.com',
    phone: '0911222333',
    formLink: '複製報名表單連結',
    orderCreatedTime: '2025-11-14 11:55:56',
    paymentTime: '2025-11-18 14:53:48',
    invoiceNumber: 'CD87654321',
    planName: '351 [場試・實] 買斷 + 銷售方案 (場) 7 (主場) SHOP 7',
    affcode: 'AFF002',
    address: '新北市板橋區文化路一段188號',
    refundStatus: '申請退款中'
  },
  {
    id: 2654,
    orderStatus: '已付款',
    orderNumber: 'D25T1N01B563597576',
    paymentMethod: 'ATM',
    udnId: 'Is2025101-2',
    name: 'sophie',
    email: 'sophiekaishi8@gmail.com',
    phone: '0911222333',
    formLink: '複製報名表單連結',
    orderCreatedTime: '2025-11-01 16:56:36',
    paymentTime: '2025-11-01 16:57:00',
    invoiceNumber: 'EF11223344',
    planName: '351 [場試・實] 買斷 + 銷售方案 (場) 7 (主場) SHOP 7',
    affcode: 'AFF003',
    address: '台中市西屯區台灣大道三段99號',
    refundStatus: '退款完成'
  },
  {
    id: 2625,
    orderStatus: '未付款',
    orderNumber: 'D25T1N03I1S6545498',
    paymentMethod: 'ATM',
    udnId: 'Is2025I0S1',
    name: 'sophie',
    email: 'sophiekaishi8@gmail.com',
    phone: '0911222333',
    formLink: '複製報名表單連結',
    orderCreatedTime: '2025-10-31 23:38:05',
    paymentTime: '2025-10-31 23:38:38',
    invoiceNumber: 'GH55667788',
    planName: '352 [場試・實] 買斷 + 銷售方案 (場) 7 (主場) S2',
    affcode: 'AFF004',
    address: '高雄市前金區中正四路211號',
    refundStatus: '終止退款'
  },
  {
    id: 2606,
    orderStatus: '手動新增',
    orderNumber: 'M25F03003012584',
    paymentMethod: '手動新增',
    udnId: 'ladd4znuur ally 1 nf0',
    name: 'sophie',
    email: 'sophiekaishi8@gmail.com',
    phone: '0911222333',
    formLink: '複製報名表單連結',
    orderCreatedTime: '2025-10-30 11:35:17',
    paymentTime: '2025-10-30 11:35:17',
    invoiceNumber: 'IJ99887766',
    planName: '2794 [測試・實] 買斷 + 銷售方案 (場) 7 (主場) PY',
    affcode: 'AFF005',
    address: '台南市東區中華東路三段337號',
    refundStatus: '退款失敗'
  }
]

interface CourseStudentsListProps {
  courseId: number
  courseName: string
}

export function CourseStudentsList({ courseId, courseName }: CourseStudentsListProps) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState('25')
  const [activeTab, setActiveTab] = useState('direct-purchase')
  const [selectedStatus, setSelectedStatus] = useState('all')

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-auto p-0 bg-gray-50 border-b border-gray-200 rounded-none w-fit justify-start ml-0">
            <TabsTrigger 
              value="direct-purchase" 
              className="px-3 py-2 rounded-none border-r border-gray-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-b-white data-[state=active]:-mb-px bg-gray-50 hover:opacity-80 transition-colors text-sm"
              style={{ color: '#409eff' }}
            >
              購買者資訊
            </TabsTrigger>
            <TabsTrigger 
              value="single-purchase" 
              className="px-3 py-2 rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-b-white data-[state=active]:-mb-px bg-gray-50 hover:opacity-80 transition-colors text-sm"
              style={{ color: '#409eff' }}
            >
              表單輸入結果
            </TabsTrigger>
          </TabsList>

          <TabsContent value="direct-purchase" className="mt-0 p-0 border-none">
            <div className="bg-white">
              {/* Header Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors"
                    >
                      <span className="text-white text-xs">+</span>
                    </div>
                    <span className="text-sm">手動新增</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* 篩選下拉選單 */}
                    <div className="flex items-center space-x-2">
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-[140px] h-8 bg-white border-gray-300">
                          <SelectValue placeholder="全部訂單狀態" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部訂單狀態</SelectItem>
                          <SelectItem value="paid">已付款</SelectItem>
                          <SelectItem value="unpaid">未付款</SelectItem>
                          <SelectItem value="payment-failed">付款失敗</SelectItem>
                          <SelectItem value="zero-payment">0 元支付</SelectItem>
                          <SelectItem value="manual-add">手動新增</SelectItem>
                          <SelectItem value="t-platform-transfer">T台資產移轉</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* 搜尋區塊 */}
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm w-48 h-8 bg-white"
                        placeholder="訂單編號、姓名、信箱"
                      />
                      <button className="text-white rounded w-8 h-8 hover:opacity-90 flex items-center justify-center" style={{ backgroundColor: '#409eff' }}>
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">ID</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">訂單狀態</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">訂單編號</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">付款方式</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">udm會員id</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">姓名</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">信箱</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">電話</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">報名表單連結</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">訂單建立時間 ▼</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">付款時間</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">發票號碼</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">方案名稱</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">Affcode</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">地址</TableHead>
                      <TableHead className="text-center border-b border-gray-200 py-3 text-xs">退款狀態</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell className="border-b border-gray-200 py-3 text-center">
                          <span style={{ color: '#409eff' }} className="cursor-pointer hover:underline">
                            {student.id}
                          </span>
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.orderStatus}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          <span style={{ color: '#409eff' }} className="cursor-pointer hover:underline">
                            {student.orderNumber}
                          </span>
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.paymentMethod}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          <span style={{ color: '#409eff' }} className="cursor-pointer hover:underline">
                            {student.udnId}
                          </span>
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.name}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          <span style={{ color: '#409eff' }} className="cursor-pointer hover:underline">
                            {student.email}
                          </span>
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.phone}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button 
                                className="rounded px-2 py-1 text-xs hover:opacity-90 bg-gray-100 text-gray-700 flex items-center gap-1 mx-auto"
                              >
                                選擇複製表單
                                <ChevronDown className="w-3 h-3" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>複製報名表單連結</DropdownMenuItem>
                              <DropdownMenuItem>複製付款連結</DropdownMenuItem>
                              <DropdownMenuItem>複製訂單資訊</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          <div>{student.orderCreatedTime.split(' ')[0]}</div>
                          <div>{student.orderCreatedTime.split(' ')[1]}</div>
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          <div>{student.paymentTime.split(' ')[0]}</div>
                          <div>{student.paymentTime.split(' ')[1]}</div>
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.invoiceNumber}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.planName}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.affcode}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.address}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 py-3 text-center text-xs">
                          {student.refundStatus && (
                            <span 
                              className="inline-block px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: 
                                  student.refundStatus === '申請退款中' ? '#fff3e0' :
                                  student.refundStatus === '退款完成' ? '#e8f5e9' :
                                  student.refundStatus === '終止退款' ? '#f5f5f5' :
                                  student.refundStatus === '退款失敗' ? '#ffebee' :
                                  'transparent',
                                color:
                                  student.refundStatus === '申請退款中' ? '#f57c00' :
                                  student.refundStatus === '退款完成' ? '#2e7d32' :
                                  student.refundStatus === '終止退款' ? '#616161' :
                                  student.refundStatus === '退款失敗' ? '#c62828' :
                                  'inherit'
                              }}
                            >
                              {student.refundStatus}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="p-4 flex items-center justify-end border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">筆數</span>
                    <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                      <SelectTrigger className="w-[80px] h-8 bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      上一頁
                    </button>
                    <button className="px-3 py-1 text-sm text-white rounded" style={{ backgroundColor: '#409eff' }}>
                      1
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      下一頁
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="single-purchase" className="mt-0 p-0 border-none">
            <div className="bg-white p-8 text-center text-gray-500">
              表單輸入結果功能開發中...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}