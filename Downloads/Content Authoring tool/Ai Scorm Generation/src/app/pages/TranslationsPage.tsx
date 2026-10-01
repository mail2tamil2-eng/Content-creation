import { Link, useParams } from 'react-router';
import { useCourseContext } from '../context/CourseContext';
import TranslationWorkspace from '../components/TranslationWorkspace';
import { demoSource } from '../translation/model';
export default function TranslationsPage() {
  const { courseId } = useParams();
  const { getCourse } = useCourseContext();
  const course = getCourse(Number(courseId));
  if (!course) return <div className="p-6">Course not found. <Link to="/courses">Return to My Courses</Link></div>;
  return <div className="max-w-6xl mx-auto space-y-5"><Link className="text-sm text-[#134780]" to="/courses">← Back to My Courses</Link><h1 className="text-2xl font-semibold">{course.name}</h1><p className="text-sm text-gray-500">Published version {course.publishedVersion || 1}</p><TranslationWorkspace source={course.sourceSnapshot || demoSource(course.name, course.modules)} storageId={'course-' + course.id + '-v' + (course.publishedVersion || 1)} published={course.status === 'published' && course.hasBeenPublished} /></div>;
}
