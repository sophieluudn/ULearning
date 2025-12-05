import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

// 模擬課程數據（用於內容管理）
const mockCourses = [
  {
    id: 1631,
    name: '測試課程案例組',
    instructor: '張講師',
    status: '已上線'
  },
  {
    id: 1630,
    name: '成寧室課程組 - 其他課次2',
    instructor: '李講師',
    status: '預計上線'
  },
  {
    id: 1629,
    name: '成寧室課程組 - 其他課次',
    instructor: '王講師',
    status: '已上線'
  },
  {
    id: 1627,
    name: '成寧室課測組',
    instructor: '陳講師',
    status: '已上線'
  },
  {
    id: 1625,
    name: '1625 [Test Case] 量子計設課程組織籌方顧追專用',
    instructor: '林講師',
    status: '預計上線'
  }
]

interface CourseListProps {
  onViewCourseSettings: (courseId: number, courseName: string) => void
}

export function CourseList({ onViewCourseSettings }: CourseListProps) {
  const [itemsPerPage, setItemsPerPage] = useState('25')
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div 
              className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors"
            >
              <span className="text-white text-xs">+</span>
            </div>
            <span className="text-sm">新增課程</span>
          </div>
          
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
                placeholder="搜尋課程"
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
                <TableHead className="text-left border-b border-gray-200 py-3 text-xs">講師</TableHead>
                <TableHead className="text-left border-b border-gray-200 py-3 text-xs w-[150px]">狀態</TableHead>
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
                      onClick={() => onViewCourseSettings(course.id, course.name)}
                    >
                      {course.name}
                    </span>
                  </TableCell>
                  <TableCell className="border-b border-gray-200 py-3 text-xs">
                    {course.instructor}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 py-3 text-xs">
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
