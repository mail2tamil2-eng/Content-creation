import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { AssetLibraryDialog } from './AssetLibraryDialog';
import { ASSET_LIBRARY } from './assetLibrary';

const meta = {
  title: 'Slides/Settings/AssetLibraryDialog',
  component: AssetLibraryDialog,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  args: { open: true, onOpenChange: fn(), onSelect: fn() },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>Open Asset Library</button>
        <AssetLibraryDialog {...args} open={open} onOpenChange={o => { setOpen(o); args.onOpenChange(o); }} />
      </>
    );
  },
} satisfies Meta<typeof AssetLibraryDialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithCurrentImage: Story = { args: { current: ASSET_LIBRARY[3].src } };
export const Empty: Story = { args: { assets: [] } };
