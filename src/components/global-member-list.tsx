import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowUpDown, Search } from 'lucide-react'

interface Device {
  deviceId: string
  model: string
  name: string
  registerDate: string
  deleteTime: string
}

interface Member {
  id: string
  memberCode: string
  brand: string // 所屬館別
  oldLoginSource: string
  udnId: string
  loginAccount: string
  isBound: boolean
  bindTime: string
  status: 'active' | 'inactive'
  lastLoginTime: string
  createTime: string
  updateTime: string
  deleteTime: string
  // udn 會員資料
  udnName: string
  udnGender: string
  udnEmail: string
  udnBirthday: string
  udnPhone: string
  udnAddress: string
  // (一刻) 基本資料
  yikeName: string
  yikeNickname: string
  yikeAvatar: string
  yikeEmail: string
  yikePhone: string
  // 登入裝置
  devices: Device[]
}

// 模擬全域會員資料（包含所有館別）
const mockGlobalMembers: Member[] = [
  {
    id: 'M001',
    memberCode: 'MB20241001',
    brand: '元氣館',
    oldLoginSource: 'Google',
    udnId: 'user001@udn.com',
    loginAccount: 'user001@gmail.com',
    isBound: true,
    bindTime: '2024-01-15 10:30:00',
    status: 'active',
    lastLoginTime: '2025-10-15 14:20:00',
    createTime: '2024-01-15 10:30:00',
    updateTime: '2025-10-15 14:20:00',
    deleteTime: '',
    udnName: '張小明',
    udnGender: '男',
    udnEmail: 'user001@udn.com',
    udnBirthday: '1990-05-15',
    udnPhone: '0912345678',
    udnAddress: '台北市信義區信義路五段7號',
    yikeName: '張小明',
    yikeNickname: '小明',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user001@gmail.com',
    yikePhone: '0912345678',
    devices: [
      { deviceId: 'DEV001', model: 'iPhone 14 Pro', name: 'Ming的iPhone', registerDate: '2024-01-15 10:30:00', deleteTime: '' },
      { deviceId: 'DEV002', model: 'iPad Air', name: 'Ming的iPad', registerDate: '2024-03-20 15:45:00', deleteTime: '' }
    ]
  },
  {
    id: 'M002',
    memberCode: 'MB20241002',
    brand: '橘學院',
    oldLoginSource: 'FB',
    udnId: 'user002@udn.com',
    loginAccount: 'user002@facebook.com',
    isBound: true,
    bindTime: '2024-02-20 11:45:00',
    status: 'active',
    lastLoginTime: '2025-10-14 16:30:00',
    createTime: '2024-02-20 11:45:00',
    updateTime: '2025-10-14 16:30:00',
    deleteTime: '',
    udnName: '李小華',
    udnGender: '女',
    udnEmail: 'user002@udn.com',
    udnBirthday: '1988-08-20',
    udnPhone: '0923456789',
    udnAddress: '新北市板橋區中山路一段100號',
    yikeName: '李小華',
    yikeNickname: '小華',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user002@facebook.com',
    yikePhone: '0923456789',
    devices: [
      { deviceId: 'DEV003', model: 'Samsung Galaxy S23', name: 'Hua的手機', registerDate: '2024-02-20 11:45:00', deleteTime: '' }
    ]
  },
  {
    id: 'M003',
    memberCode: 'MB20241003',
    brand: '元氣館',
    oldLoginSource: 'UDN',
    udnId: 'user003@udn.com',
    loginAccount: 'user003@udn.com',
    isBound: false,
    bindTime: '',
    status: 'inactive',
    lastLoginTime: '2025-09-20 09:15:00',
    createTime: '2024-03-10 14:20:00',
    updateTime: '2025-09-20 09:15:00',
    deleteTime: '2025-09-20 09:15:00',
    udnName: '王小美',
    udnGender: '女',
    udnEmail: 'user003@udn.com',
    udnBirthday: '1992-03-10',
    udnPhone: '0934567890',
    udnAddress: '台中市西屯區台灣大道三段99號',
    yikeName: '王小美',
    yikeNickname: '小美',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user003@udn.com',
    yikePhone: '0934567890',
    devices: []
  },
  {
    id: 'M004',
    memberCode: 'MB20241004',
    brand: '橘學院',
    oldLoginSource: 'Phone',
    udnId: 'user004@udn.com',
    loginAccount: '0945678901',
    isBound: true,
    bindTime: '2024-04-05 09:30:00',
    status: 'active',
    lastLoginTime: '2025-10-16 08:45:00',
    createTime: '2024-04-05 09:30:00',
    updateTime: '2025-10-16 08:45:00',
    deleteTime: '',
    udnName: '陳大明',
    udnGender: '男',
    udnEmail: 'user004@udn.com',
    udnBirthday: '1985-11-25',
    udnPhone: '0945678901',
    udnAddress: '高雄市前鎮區中山二路200號',
    yikeName: '陳大明',
    yikeNickname: '大明',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user004@udn.com',
    yikePhone: '0945678901',
    devices: [
      { deviceId: 'DEV004', model: 'iPhone 13', name: 'Ming的手機', registerDate: '2024-04-05 09:30:00', deleteTime: '' }
    ]
  },
  {
    id: 'M005',
    memberCode: 'MB20241005',
    brand: '元氣館',
    oldLoginSource: 'Google',
    udnId: 'user005@udn.com',
    loginAccount: 'user005@gmail.com',
    isBound: true,
    bindTime: '2024-05-12 13:20:00',
    status: 'active',
    lastLoginTime: '2025-10-13 11:30:00',
    createTime: '2024-05-12 13:20:00',
    updateTime: '2025-10-13 11:30:00',
    deleteTime: '',
    udnName: '林志偉',
    udnGender: '男',
    udnEmail: 'user005@udn.com',
    udnBirthday: '1991-07-08',
    udnPhone: '0956789012',
    udnAddress: '桃園市中壢區中正路300號',
    yikeName: '林志偉',
    yikeNickname: '志偉',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user005@gmail.com',
    yikePhone: '0956789012',
    devices: []
  },
  {
    id: 'M006',
    memberCode: 'MB20241006',
    brand: '橘學院',
    oldLoginSource: 'FB',
    udnId: 'user006@udn.com',
    loginAccount: 'user006@facebook.com',
    isBound: false,
    bindTime: '',
    status: 'active',
    lastLoginTime: '2025-10-10 15:50:00',
    createTime: '2024-06-18 10:15:00',
    updateTime: '2025-10-10 15:50:00',
    deleteTime: '',
    udnName: '黃淑芬',
    udnGender: '女',
    udnEmail: 'user006@udn.com',
    udnBirthday: '1987-12-30',
    udnPhone: '0967890123',
    udnAddress: '台南市東區東門路一段50號',
    yikeName: '黃淑芬',
    yikeNickname: '淑芬',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user006@facebook.com',
    yikePhone: '0967890123',
    devices: []
  },
  {
    id: 'M007',
    memberCode: 'MB20241007',
    brand: '元氣館',
    oldLoginSource: 'UDN',
    udnId: 'user007@udn.com',
    loginAccount: 'user007@udn.com',
    isBound: true,
    bindTime: '2024-07-22 16:40:00',
    status: 'inactive',
    lastLoginTime: '2025-08-25 14:10:00',
    createTime: '2024-07-22 16:40:00',
    updateTime: '2025-08-25 14:10:00',
    deleteTime: '2025-08-25 14:10:00',
    udnName: '劉建國',
    udnGender: '男',
    udnEmail: 'user007@udn.com',
    udnBirthday: '1989-04-18',
    udnPhone: '0978901234',
    udnAddress: '新竹市東區光復路二段101號',
    yikeName: '劉建國',
    yikeNickname: '建國',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user007@udn.com',
    yikePhone: '0978901234',
    devices: []
  },
  {
    id: 'M008',
    memberCode: 'MB20241008',
    brand: '橘學院',
    oldLoginSource: 'Phone',
    udnId: 'user008@udn.com',
    loginAccount: '0989012345',
    isBound: true,
    bindTime: '2024-08-30 08:50:00',
    status: 'active',
    lastLoginTime: '2025-10-16 10:20:00',
    createTime: '2024-08-30 08:50:00',
    updateTime: '2025-10-16 10:20:00',
    deleteTime: '',
    udnName: '許雅婷',
    udnGender: '女',
    udnEmail: 'user008@udn.com',
    udnBirthday: '1993-06-22',
    udnPhone: '0989012345',
    udnAddress: '嘉義市西區中山路500號',
    yikeName: '許雅婷',
    yikeNickname: '雅婷',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user008@udn.com',
    yikePhone: '0989012345',
    devices: []
  },
  {
    id: 'M009',
    memberCode: 'MB20241009',
    brand: '元氣館',
    oldLoginSource: 'Google',
    udnId: 'user009@udn.com',
    loginAccount: 'user009@gmail.com',
    isBound: false,
    bindTime: '',
    status: 'inactive',
    lastLoginTime: '2025-07-15 13:45:00',
    createTime: '2024-09-14 12:30:00',
    updateTime: '2025-07-15 13:45:00',
    deleteTime: '2025-09-01 10:00:00',
    udnName: '郭明輝',
    udnGender: '男',
    udnEmail: 'user009@udn.com',
    udnBirthday: '1986-09-05',
    udnPhone: '0990123456',
    udnAddress: '屏東市民生路888號',
    yikeName: '郭明輝',
    yikeNickname: '明輝',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user009@gmail.com',
    yikePhone: '0990123456',
    devices: []
  },
  {
    id: 'M010',
    memberCode: 'MB20241010',
    brand: '橘學院',
    oldLoginSource: 'FB',
    udnId: 'user010@udn.com',
    loginAccount: 'user010@facebook.com',
    isBound: true,
    bindTime: '2024-10-01 14:25:00',
    status: 'active',
    lastLoginTime: '2025-10-15 17:30:00',
    createTime: '2024-10-01 14:25:00',
    updateTime: '2025-10-15 17:30:00',
    deleteTime: '',
    udnName: '楊麗華',
    udnGender: '女',
    udnEmail: 'user010@udn.com',
    udnBirthday: '1994-02-14',
    udnPhone: '0991234567',
    udnAddress: '宜蘭市中山路三段200號',
    yikeName: '楊麗華',
    yikeNickname: '麗華',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user010@facebook.com',
    yikePhone: '0991234567',
    devices: []
  },
  {
    id: 'M011',
    memberCode: 'MB20241011',
    brand: '元氣館',
    oldLoginSource: 'UDN',
    udnId: 'user011@udn.com',
    loginAccount: 'user011@udn.com',
    isBound: true,
    bindTime: '2024-03-25 11:10:00',
    status: 'active',
    lastLoginTime: '2025-10-12 09:45:00',
    createTime: '2024-03-25 11:10:00',
    updateTime: '2025-10-12 09:45:00',
    deleteTime: '',
    udnName: '蔡志強',
    udnGender: '男',
    udnEmail: 'user011@udn.com',
    udnBirthday: '1990-10-10',
    udnPhone: '0992345678',
    udnAddress: '花蓮市中正路100號',
    yikeName: '蔡志強',
    yikeNickname: '志強',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user011@udn.com',
    yikePhone: '0992345678',
    devices: []
  },
  {
    id: 'M012',
    memberCode: 'MB20241012',
    brand: '橘學院',
    oldLoginSource: 'Phone',
    udnId: 'user012@udn.com',
    loginAccount: '0993456789',
    isBound: false,
    bindTime: '',
    status: 'active',
    lastLoginTime: '2025-10-11 16:20:00',
    createTime: '2024-02-14 15:40:00',
    updateTime: '2025-10-11 16:20:00',
    deleteTime: '',
    udnName: '吳佩真',
    udnGender: '女',
    udnEmail: 'user012@udn.com',
    udnBirthday: '1988-01-28',
    udnPhone: '0993456789',
    udnAddress: '苗栗市中正路300號',
    yikeName: '吳佩真',
    yikeNickname: '佩真',
    yikeAvatar: 'https://via.placeholder.com/100',
    yikeEmail: 'user012@udn.com',
    yikePhone: '0993456789',
    devices: []
  }
]

type SortField = 'oldLoginSource' | 'bindTime' | 'lastLoginTime' | 'createTime' | null
type SortDirection = 'asc' | 'desc'

export function GlobalMemberList() {
  const [itemsPerPage, setItemsPerPage] = useState<string>('25')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [filterLoginSource, setFilterLoginSource] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isMemberDetailOpen, setIsMemberDetailOpen] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // 切換排序方向
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // 新欄位，預設升序
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // 篩選和排序後的資料
  const filteredAndSortedMembers = useMemo(() => {
    let filtered = [...mockGlobalMembers]
    
    // 篩選舊登入來源
    if (filterLoginSource !== 'all') {
      filtered = filtered.filter(member => member.oldLoginSource === filterLoginSource)
    }
    
    // 篩選狀態
    if (filterStatus !== 'all') {
      filtered = filtered.filter(member => {
        if (filterStatus === 'active') return member.status === 'active'
        if (filterStatus === 'inactive') return member.status === 'inactive'
        return true
      })
    }
    
    // 排序
    if (sortField === 'oldLoginSource') {
      filtered.sort((a, b) => {
        const comparison = a.oldLoginSource.localeCompare(b.oldLoginSource, 'zh-TW')
        return sortDirection === 'asc' ? comparison : -comparison
      })
    } else if (sortField === 'bindTime' || sortField === 'lastLoginTime' || sortField === 'createTime') {
      filtered.sort((a, b) => {
        const aTime = a[sortField] || ''
        const bTime = b[sortField] || ''
        const comparison = aTime.localeCompare(bTime)
        return sortDirection === 'asc' ? comparison : -comparison
      })
    }
    
    return filtered
  }, [filterLoginSource, filterStatus, sortField, sortDirection])

  const handleExport = () => {
    console.log('匯出資料')
  }

  const handleDownloadList = () => {
    console.log('下載清單')
  }

  const handleViewMemberDetail = (member: Member) => {
    setSelectedMember(member)
    setIsMemberDetailOpen(true)
  }

  const handleCloseMemberDetail = () => {
    setIsMemberDetailOpen(false)
    setSelectedMember(null)
  }

  return (
    <div className="bg-white px-6 py-6">
      {/* 篩選區塊 */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          {/* 左側：筆數顯示 */}
          <div className="text-sm text-gray-600">
            共 {filteredAndSortedMembers.length} 筆
          </div>
          
          {/* 右側：篩選器和按鈕 */}
          <div className="flex items-center space-x-3">
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
            
            {/* 舊登入來源篩選 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">舊登入來源</span>
              <Select value={filterLoginSource} onValueChange={setFilterLoginSource}>
                <SelectTrigger className="w-28 h-8 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="FB">FB</SelectItem>
                  <SelectItem value="UDN">UDN</SelectItem>
                  <SelectItem value="Phone">Phone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* 狀態篩選 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">狀態</span>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-24 h-8 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="active">啟用</SelectItem>
                  <SelectItem value="inactive">刪除</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* 搜尋輸入框 */}
            <Input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-64 h-8 bg-white"
              placeholder="會員代號、手機、Email、暱稱、udn ID"
            />
            
            {/* 查詢按鈕 */}
            <Button 
              size="sm"
              className="h-8 px-3"
              style={{ backgroundColor: '#409eff' }}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            {/* 匯出按鈕 */}
            <Button 
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={handleExport}
            >
              匯出
            </Button>
            
            {/* 下載清單按鈕 */}
            <Button 
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={handleDownloadList}
            >
              下載清單
            </Button>
          </div>
        </div>
      </div>

      {/* Member List Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Member Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">會員代號</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1">
                    <span>舊登入來源</span>
                    <button 
                      onClick={() => handleSort('oldLoginSource')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">udn ID</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">是否已綁定</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1">
                    <span>綁定時間</span>
                    <button 
                      onClick={() => handleSort('bindTime')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">狀態</TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1">
                    <span>最後登入時間</span>
                    <button 
                      onClick={() => handleSort('lastLoginTime')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableHead>
                <TableHead className="text-center border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1">
                    <span>建立時間</span>
                    <button 
                      onClick={() => handleSort('createTime')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableHead>
                <TableHead className="text-center whitespace-nowrap">刪除時間</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-gray-50">
                  <TableCell className="text-center border-r border-gray-200">
                    <a 
                      href="#" 
                      className="hover:underline" 
                      style={{ color: '#409eff' }}
                      onClick={(e) => {
                        e.preventDefault()
                        handleViewMemberDetail(member)
                      }}
                    >
                      {member.memberCode}
                    </a>
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    {member.oldLoginSource}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    {member.udnId.split('@')[0]}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    <Badge 
                      variant="outline"
                      className={member.isBound 
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                      }
                    >
                      {member.isBound ? '是' : '否'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200 whitespace-nowrap">
                    {member.bindTime}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    <Badge 
                      variant="outline"
                      className={member.status === 'active'
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                      }
                    >
                      {member.status === 'active' ? '啟用' : '刪除'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200 whitespace-nowrap">
                    {member.lastLoginTime}
                  </TableCell>
                  <TableCell className="text-center border-r border-gray-200 whitespace-nowrap">
                    {member.createTime}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {member.deleteTime ? (
                      <span className="text-red-600">
                        {member.deleteTime}
                      </span>
                    ) : (
                      ''
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-end">
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

      {/* 會員詳細資訊 Popup */}
      <Dialog open={isMemberDetailOpen} onOpenChange={setIsMemberDetailOpen}>
        <DialogContent className="!w-[60vw] !max-w-[60vw] max-h-[90vh] overflow-auto sm:!max-w-[60vw]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>全域會員管理</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              {/* udn 會員資料 */}
              <Card className="bg-white border border-gray-200 rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm" style={{ color: '#409eff' }}>udn 會員資料</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">udn ID</div>
                      <div className="text-sm flex-1">{selectedMember.udnId.split('@')[0]}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">姓名</div>
                      <div className="text-sm flex-1">{selectedMember.udnName}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">Email</div>
                      <div className="text-sm flex-1">{selectedMember.udnEmail}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">手機</div>
                      <div className="text-sm flex-1">{selectedMember.udnPhone}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 帳號資料 */}
              <Card className="bg-white border border-gray-200 rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm" style={{ color: '#409eff' }}>帳號資料</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">舊登入來源</div>
                      <div className="text-sm flex-1">{selectedMember.oldLoginSource}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">udn ID</div>
                      <div className="text-sm flex-1">{selectedMember.udnId.split('@')[0]}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">登入帳號</div>
                      <div className="text-sm flex-1">{selectedMember.loginAccount}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">是否已綁定</div>
                      <div className="text-sm flex-1">
                        <Badge 
                          variant="outline"
                          className={selectedMember.isBound 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {selectedMember.isBound ? '是' : '否'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">綁定時間</div>
                      <div className="text-sm flex-1">{selectedMember.bindTime || '-'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* (一刻) 基本資料 */}
              <Card className="bg-white border border-gray-200 rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm" style={{ color: '#409eff' }}>(一刻) 基本資料</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">肖像</div>
                      <div className="text-sm flex-1">
                        <img 
                          src={selectedMember.yikeAvatar} 
                          alt="會員肖像" 
                          className="w-[30px] h-[30px] rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">姓名</div>
                      <div className="text-sm flex-1">{selectedMember.yikeName}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">暱稱</div>
                      <div className="text-sm flex-1">{selectedMember.yikeNickname}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">Email</div>
                      <div className="text-sm flex-1">{selectedMember.yikeEmail}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">手機</div>
                      <div className="text-sm flex-1">{selectedMember.yikePhone}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 使用狀況 */}
              <Card className="bg-white border border-gray-200 rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm" style={{ color: '#409eff' }}>使用狀況</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">會員代號</div>
                      <div className="text-sm flex-1">{selectedMember.memberCode}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">狀態</div>
                      <div className="text-sm flex-1">
                        <Badge 
                          variant="outline"
                          className={selectedMember.status === 'active'
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {selectedMember.status === 'active' ? '啟用' : '刪除'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">最後登入時間</div>
                      <div className="text-sm flex-1">{selectedMember.lastLoginTime}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">建立時間</div>
                      <div className="text-sm flex-1">{selectedMember.createTime}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm text-gray-500 w-32 text-right pr-4">更新時間</div>
                      <div className="text-sm flex-1">{selectedMember.updateTime}</div>
                    </div>
                    {selectedMember.deleteTime && (
                      <div className="flex items-center justify-center">
                        <div className="text-sm text-gray-500 w-32 text-right pr-4">刪除時間</div>
                        <div className="text-sm flex-1 text-red-600">{selectedMember.deleteTime}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 登入裝置 */}
              <Card className="bg-white border border-gray-200 rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm" style={{ color: '#409eff' }}>登入裝置</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedMember.devices.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-center">裝置 ID</TableHead>
                            <TableHead className="text-center">型號</TableHead>
                            <TableHead className="text-center">名稱</TableHead>
                            <TableHead className="text-center">註冊日期</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedMember.devices.map((device) => (
                            <TableRow key={device.deviceId}>
                              <TableCell className="text-center">{device.deviceId}</TableCell>
                              <TableCell className="text-center">{device.model}</TableCell>
                              <TableCell className="text-center">{device.name}</TableCell>
                              <TableCell className="text-center">{device.registerDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">無登入裝置記錄</div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}