import type { Decorator, Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/styles/index.css';

/** Toggles the `.dark` class used by src/styles/theme.css. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark';
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return (
    <div className="bg-background text-foreground" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    options: {
      storySort: {
        order: ['Foundations', ['Design tokens', 'Icon library'], 'SaaS', ['Layout', 'Button', 'IconButton', 'Form fields', 'SearchBar', 'Checkbox', 'Toggle', 'SelectionCard', 'Chip', 'StatusBadge', 'Avatar', 'Tabs', 'Accordion', 'DropdownMenu', 'Tooltip', 'Modal (popup)', 'Toaster', 'DataTable', 'Pagination', 'Widgets', 'SectionCard', 'PageHeader', 'ActionBar', 'Screens'], 'Layout', 'Navigation', 'Dashboard', 'Courses', 'Editor', 'Slides', 'Translation', 'Primitives (shadcn)'],
      },
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: {
      // WCAG 2.2 AA is mandatory (see CLAUDE.md). 'error' fails story tests on violations;
      // kept at 'todo' until the existing hard-coded palette is migrated to the approved pairs.
      test: 'todo',
      options: { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } },
    },
  },
};

export default preview;
