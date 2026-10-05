import { motion } from 'motion/react';
import { useOutletContext } from 'react-router';
import { CourseTable } from '../components/CourseTable';
import { Plus, Filter } from 'lucide-react';
import { PageHeader, DropdownMenu, Button } from '../components/saas';
import { useState } from 'react';

interface LayoutContext {
  onCreateCourse: () => void;
}

export function CoursesPage() {
  const { onCreateCourse } = useOutletContext<LayoutContext>();
  const [selectedFilter, setSelectedFilter] = useState('All Courses');

  const filterOptions = ['All Courses', 'Published', 'Draft', 'Archived', 'Recently Updated'];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="All Courses"
          breadcrumbs={[{ label: 'My Courses' }]}
          actions={
            <>
              <DropdownMenu
                align="end"
                trigger={
                  <Button variant="secondary" leftIcon={<Filter />} rightIcon={<span />}>
                    {selectedFilter}
                  </Button>
                }
                items={filterOptions.map((opt) => ({
                  label: opt,
                  onSelect: () => setSelectedFilter(opt),
                }))}
              />
              <Button leftIcon={<Plus />} onClick={onCreateCourse}>
                Create Course
              </Button>
            </>
          }
        />
      </motion.div>

      {/* Course Table with Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <CourseTable />
      </motion.div>
    </div>
  );
}