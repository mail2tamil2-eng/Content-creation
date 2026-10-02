import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { COURSE_TITLE, SECTIONS } from '../../stories/fixtures';
import PublishModal from './PublishModal';

type Args = { publishDone: boolean; lmsPushed: boolean; destination: string };

const meta = {
  title: 'Editor/PublishModal',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { publishDone: false, lmsPushed: false, destination: '' },
  render: function Render(args) {
    const [destination, setDestination] = useState(args.destination);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [pushed, setPushed] = useState(args.lmsPushed);
    const [done, setDone] = useState(args.publishDone);
    return (
      <div style={{ minHeight: 720 }}>
        <PublishModal
          courseTitle={COURSE_TITLE}
          sections={SECTIONS}
          publishLmsDestination={destination}
          setPublishLmsDestination={setDestination}
          publishLmsDropdownOpen={dropdownOpen}
          setPublishLmsDropdownOpen={setDropdownOpen}
          publishLmsPushed={pushed}
          setPublishLmsPushed={setPushed}
          publishDone={done}
          setPublishDone={setDone}
          onClose={fn()}
          onDashboard={fn()}
          onTranslate={fn()}
        />
      </div>
    );
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const ReadyToPublish: Story = {};
export const Published: Story = { args: { publishDone: true } };
export const PushedToLms: Story = { args: { publishDone: true, lmsPushed: true, destination: 'Zell Learning' } };
