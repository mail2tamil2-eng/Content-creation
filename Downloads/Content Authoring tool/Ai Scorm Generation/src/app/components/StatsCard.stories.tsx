import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, FileText, Key, Upload } from 'lucide-react';
import { StatsCard } from './StatsCard';

const meta = {
  title: 'Dashboard/StatsCard',
  component: StatsCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    title: 'Total Courses',
    value: 12,
    subtitle: 'Across all modules',
    icon: BookOpen,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-700',
  },
  argTypes: { icon: { control: false } },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutSubtitle: Story = { args: { subtitle: undefined } };
export const StringValue: Story = { args: { title: 'Licences', value: '38 / 50', icon: Key, bgColor: 'bg-orange-50', iconColor: 'text-orange-700' } };

export const DashboardRow: Story = {
  decorators: [(Story) => <div className="w-[1100px]"><Story /></div>],
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      <StatsCard title="Total Courses" value={12} icon={BookOpen} bgColor="bg-blue-50" iconColor="text-blue-700" />
      <StatsCard title="Published" value={8} icon={Upload} bgColor="bg-green-50" iconColor="text-green-700" />
      <StatsCard title="Drafts" value={4} icon={FileText} bgColor="bg-amber-50" iconColor="text-amber-700" />
      <StatsCard title="Licences left" value={42} subtitle="of 50" icon={Key} bgColor="bg-orange-50" iconColor="text-orange-700" />
    </div>
  ),
};
