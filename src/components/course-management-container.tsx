import { useState, useEffect } from 'react'
import { CourseStudentsListPage } from './course-list'
import { CourseStudentsList } from './course-students-list'
import { ChevronRight } from 'lucide-react'

interface CourseManagementContainerProps {
  onCourseChange?: (courseId: number | null, courseName: string) => void
  selectedCourseId?: number | null
  selectedCourseName?: string
}

export function CourseManagementContainer({ onCourseChange, selectedCourseId, selectedCourseName }: CourseManagementContainerProps) {
  const [selectedCourse, setSelectedCourse] = useState<{ id: number; name: string } | null>(null)

  // 同步外部狀態變化
  useEffect(() => {
    if (selectedCourseId && selectedCourseName) {
      setSelectedCourse({ id: selectedCourseId, name: selectedCourseName })
    } else {
      setSelectedCourse(null)
    }
  }, [selectedCourseId, selectedCourseName])

  const handleCourseSelect = (courseId: number, courseName: string) => {
    setSelectedCourse({ id: courseId, name: courseName })
    onCourseChange?.(courseId, courseName)
  }

  const handleBackToCourseList = () => {
    setSelectedCourse(null)
    onCourseChange?.(null, '')
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Content */}
      {selectedCourse ? (
        <CourseStudentsList courseId={selectedCourse.id} courseName={selectedCourse.name} />
      ) : (
        <CourseStudentsListPage onCourseSelect={handleCourseSelect} />
      )}
    </div>
  )
}