import type { Meta, StoryObj } from '@storybook/react-vite';
import { withCourses } from '../../../.storybook/decorators';
import { LicenseInfo } from './LicenseInfo';

const meta = {
  title: 'Courses/LicenseInfo',
  component: LicenseInfo,
  tags: ['autodocs'],
  decorators: [withCourses],
} satisfies Meta<typeof LicenseInfo>;

export default meta;
/** Click "License Info" to open the dialog. */
export const Default: StoryObj<typeof meta> = {};
