import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BarChart3, BookOpen, Languages, LayoutDashboard, Settings, ShoppingCart, Target, TicketPercent, Users } from 'lucide-react';
import logo from '../../../imports/AXLE-Korp-LOGO__2_.jpg';
import { AppSidebar, type NavGroup } from './AppSidebar';

const CREATOR: NavGroup[] = [
  { items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Course Authoring', icon: BookOpen },
  ] },
];

const ADMIN: NavGroup[] = [
  { title: 'Overview', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ] },
  { title: 'Content', items: [
    { id: 'courses', label: 'Course Authoring', icon: BookOpen, badge: 4 },
    { id: 'translations', label: 'Translations', icon: Languages },
    { id: 'competency', label: 'Competencies', icon: Target },
  ] },
  { title: 'Business', items: [
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'coupons', label: 'Coupons', icon: TicketPercent },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings, disabled: true },
  ] },
];

const Logo = <img src={logo} alt="Axle KORP" className="block h-9 w-auto max-w-[160px] object-contain" />;
const Mark = (
  <span className="block size-9 overflow-hidden rounded-lg">
    <img src={logo} alt="Axle KORP" className="size-full object-cover object-left" />
  </span>
);

const meta = {
  title: 'SaaS/Layout/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    groups: CREATOR,
    activeId: 'dashboard',
    collapsed: false,
    logo: Logo,
    logoMark: Mark,
    footer: <>Powered by <b className="font-semibold">NOVACTECH</b></>,
    footerCollapsed: <b className="font-bold tracking-wider">NT</b>,
  },
  argTypes: { groups: { control: false }, logo: { control: false }, logoMark: { control: false }, footer: { control: false }, footerCollapsed: { control: false } },
  render: function Render(args) {
    const [active, setActive] = useState(args.activeId);
    const [collapsed, setCollapsed] = useState(args.collapsed);
    return (
      <div className="h-[640px] bg-gray-50">
        <AppSidebar {...args} activeId={active} onNavigate={setActive} collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c) => !c)} />
      </div>
    );
  },
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CourseCreator: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const SiteAdminGrouped: Story = { args: { groups: ADMIN, activeId: 'courses' } };
export const SiteAdminCollapsed: Story = { args: { groups: ADMIN, activeId: 'courses', collapsed: true } };
