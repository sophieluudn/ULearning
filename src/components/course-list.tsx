import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

// 模擬課程數據
const mockCourses = [
  {
    id: 1631,
    name: '測試課程案例組',
    salesPlans: 'TestTTT123',
    status: ''
  },
  {
    id: 1630,
    name: '成寧室課程組 - 其他課次2',
    salesPlans: '',
    status: ''
  },
  {
    id: 1629,
    name: '成寧室課程組 - 其他課次',
    salesPlans: `成方案一其他課次 2
    
師效張吾123
田中林正
銷售方案測試01
成果期
成測試
成測試2
成成成方案
成測試`,
    status: ''
  },
  {
    id: 1627,
    name: '成寧室課測組',
    salesPlans: `2940 [Test Case] 量子計設課程組織籌方顧追專用 P1
429 [Test Case] 量子計設課程組織籌方顧追專用 S1

2955 方案課程 -- 1 | 方案期講 -- 1
2926 方案課程 -- 1 | 方案期講 -- 0
2927 方案課程 -- 1 | 方案期講 ≥ 0
2928 方案課程 ≥ 0 | 方案期講 -- 1
2929 方案課程 ≥ 0 | 方案期講 -- 1
2930 方案課程 ≥ 0 | 方案期講 ≥ 0
423 方案課程 ≥ 1 | 方案期講 -- 1
424 方案課程 ≥ 1 | 方案期講 -- 0
425 方案課程 ≥ 1 | 方案期講 ≥ 0
測試置立期方策下`,
    status: `建上線
預期線`
  },
  {
    id: 1625,
    name: '1625 [Test Case] 量子計設課程組織籌方顧追專用',
    salesPlans: `2940 [Test Case] 量子計設課程組織籌方顧追專用 P1
429 [Test Case] 量子計設課程組織籌方顧追專用 S1

2955 方案課程 -- 1 | 方案期講 -- 1
2926 方案課程 -- 1 | 方案期講 -- 0
2927 方案課程 -- 1 | 方案期講 ≥ 0
2928 方案課程 ≥ 0 | 方案期講 -- 1
2929 方案課程 ≥ 0 | 方案期講 -- 1
2930 方案課程 ≥ 0 | 方案期講 ≥ 0
423 方案課程 ≥ 1 | 方案期講 -- 1
424 方案課程 ≥ 1 | 方案期講 -- 0
425 方案課程 ≥ 1 | 方案期講 ≥ 0
測試置立期方策下`,
    status: '預期線'
  },
  {
    id: 1619,
    name: '1619 [Test Case] 顧効齊計能檢檢測一二選考6',
    salesPlans: '',
    status: '預期線'
  }
]

interface CourseStudentsListPageProps {
  onCourseSelect: (courseId: number, courseName: string) => void
}

export function CourseStudentsListPage({ onCourseSelect }: CourseStudentsListPageProps) {
  const [itemsPerPage, setItemsPerPage] = useState('25')
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center justify-end">
          <div className="flex items-center space-x-4">
            {/* 筆數選擇器 */}
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

            {/* 搜尋框 */}
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48 h-8 bg-white"
                placeholder="搜尋"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-left border-b border-gray-200 py-3 text-xs w-[100px]">ID ⌄</TableHead>
                <TableHead className="text-left border-b border-gray-200 py-3 text-xs">課程名稱</TableHead>
                <TableHead className="text-left border-b border-gray-200 py-3 text-xs">銷售方案名稱</TableHead>
                <TableHead className="text-left border-b border-gray-200 py-3 text-xs w-[150px]">課程狀態</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-gray-50">
                  <TableCell className="border-b border-gray-200 py-3 text-xs">
                    {course.id}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 py-3 text-xs">
                    <span 
                      style={{ color: '#409eff' }} 
                      className="cursor-pointer hover:underline"
                      onClick={() => onCourseSelect(course.id, course.name)}
                    >
                      {course.name}
                    </span>
                  </TableCell>
                  <TableCell className="border-b border-gray-200 py-3 text-xs whitespace-pre-line">
                    {course.salesPlans}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 py-3 text-xs whitespace-pre-line">
                    {course.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-end border-t border-gray-200">
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
  )
}