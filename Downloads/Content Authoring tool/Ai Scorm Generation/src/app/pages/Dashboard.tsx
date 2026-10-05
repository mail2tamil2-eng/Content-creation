import { motion } from 'motion/react';
import { useOutletContext } from 'react-router';
import { Hero } from '../components/Hero';
import { RecentCourse } from '../components/RecentCourse';
import { DashboardCourseTable } from '../components/DashboardCourseTable';
import { StatWidget } from '../components/saas';
import { Clock, XCircle, FileCheck } from 'lucide-react';
import { useCourseContext } from '../context/CourseContext';

interface LayoutContext {
  onCreateCourse: () => void;
}

export function Dashboard() {
  const { onCreateCourse } = useOutletContext<LayoutContext>();
  const userName = 'Dheva';
  const { totalPublished, totalDraft, usedLicenses, availableLicenses } = useCourseContext();

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Hero userName={userName} onCreateCourse={onCreateCourse} />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatWidget
            label="Total Course Created"
            value={totalPublished}
            icon={FileCheck}
            tone="blue"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatWidget
            label="Total course in Draft"
            value={totalDraft}
            icon={Clock}
            tone="amber"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatWidget
            label="Used vs Available License"
            value={usedLicenses}
            hint={`${availableLicenses} Available license`}
            icon={XCircle}
            tone="pink"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <RecentCourse />
        </motion.div>
      </div>

      {/* Recent Courses Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <DashboardCourseTable />
      </motion.div>
    </div>
  );
}