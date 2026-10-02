import type { Meta, StoryObj } from '@storybook/react-vite';
import { demoSource } from '../translation/model';
import TranslationWorkspace from './TranslationWorkspace';

const meta = {
  title: 'Translation/TranslationWorkspace',
  component: TranslationWorkspace,
  tags: ['autodocs'],
  args: { source: demoSource('Introduction to SCORM', 2), storageId: 'storybook-demo', published: true },
  argTypes: { source: { control: false } },
} satisfies Meta<typeof TranslationWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

/** State persists in localStorage under the storageId; change it to start fresh. */
export const Published: Story = {};
export const Unpublished: Story = { args: { published: false, storageId: 'storybook-unpublished' } };
