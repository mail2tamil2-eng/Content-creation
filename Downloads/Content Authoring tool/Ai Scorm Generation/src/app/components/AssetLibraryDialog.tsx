import { useMemo, useState, type RefObject } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, Search, X } from 'lucide-react';
import { cn } from './ui/utils';
import { ASSET_CATEGORIES, ASSET_LIBRARY, type Asset, type AssetCategory } from './assetLibrary';

export interface AssetLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called with the chosen image URL when the author clicks "Use image". */
  onSelect: (src: string) => void;
  /** Image currently on the slide (pre-selected). */
  current?: string;
  assets?: Asset[];
  /** Element that gets focus back when the dialog closes (the button that opened it). */
  returnFocusRef?: RefObject<HTMLElement | null>;
}

type Filter = 'All' | AssetCategory;

/** Asset Library: search and pick a stock image for an image slide. */
export function AssetLibraryDialog({ open, onOpenChange, onSelect, current, assets = ASSET_LIBRARY, returnFocusRef }: AssetLibraryDialogProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [picked, setPicked] = useState<string | undefined>(current);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter(a => (filter === 'All' || a.category === filter) && (!q || `${a.name} ${a.category}`.toLowerCase().includes(q)));
  }, [assets, filter, query]);

  const change = (o: boolean) => { if (o) { setPicked(current); setQuery(''); setFilter('All'); } onOpenChange(o); };

  return (
    <Dialog.Root open={open} onOpenChange={change}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/40" />
        <Dialog.Content onCloseAutoFocus={e => { if (returnFocusRef?.current) { e.preventDefault(); returnFocusRef.current.focus(); } }} className="fixed left-1/2 top-1/2 z-[91] flex max-h-[min(640px,90vh)] w-[min(760px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white shadow-2xl focus:outline-none" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
          <div className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] px-5 py-4">
            <div>
              <Dialog.Title className="m-0 text-base font-bold text-[#111827]">Asset Library</Dialog.Title>
              <Dialog.Description className="m-0 mt-0.5 text-[13px] text-[#6B7280]">Choose a licence-free image for this slide.</Dialog.Description>
            </div>
            <Dialog.Close aria-label="Close" className="flex size-8 items-center justify-center rounded-lg text-[#4B5563] hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
              <X size={16} aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
            <div className="relative min-w-[200px] flex-1">
              <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input type="search" aria-label="Search images" placeholder="Search images" value={query} onChange={e => setQuery(e.target.value)}
                className="h-9 w-full rounded-lg border border-[#D1D5DB] bg-white pl-8 pr-2.5 text-[13px] text-[#111827] placeholder:text-[#6B7280]" />
            </div>
            <div role="group" aria-label="Category" className="flex flex-wrap gap-1.5">
              {(['All', ...ASSET_CATEGORIES] as Filter[]).map(c => (
                <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}
                  className={cn('h-8 rounded-full px-3 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-1',
                    filter === c ? 'bg-[#EBF3FF] text-[#1254C7] ring-1 ring-[#93C5FD]' : 'bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB]')}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <p role="status" className="sr-only">{shown.length} images</p>
            {shown.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-[#6B7280]">No images match “{query}”.</p>
            ) : (
              <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
                {shown.map(a => {
                  const on = picked === a.src;
                  return (
                    <li key={a.id}>
                      <button type="button" aria-pressed={on} onClick={() => setPicked(a.src)} onDoubleClick={() => { onSelect(a.src); change(false); }}
                        className={cn('group relative block w-full overflow-hidden rounded-[10px] border-2 bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2',
                          on ? 'border-[#1565F0]' : 'border-transparent hover:border-[#D1D5DB]')}>
                        <img src={a.src} alt="" className="block aspect-video w-full object-cover" />
                        <span className="block truncate px-2 py-1.5 text-[13px] font-semibold text-[#111827]">{a.name}</span>
                        <span className="block px-2 pb-1.5 text-xs text-[#6B7280]">{a.category}</span>
                        {on && (
                          <span aria-hidden="true" className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-[#1565F0] text-white shadow">
                            <Check size={14} />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="flex justify-end gap-2 border-t border-[#E5E7EB] px-5 py-3">
            <Dialog.Close className="h-9 rounded-lg border border-[#D1D5DB] bg-white px-4 text-[13px] font-semibold text-[#374151] hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
              Cancel
            </Dialog.Close>
            <button type="button" disabled={!picked} onClick={() => { if (picked) { onSelect(picked); change(false); } }}
              className="h-9 rounded-lg bg-[#1565F0] px-4 text-[13px] font-semibold text-white hover:bg-[#1A63E8] disabled:cursor-not-allowed disabled:bg-[#C4C4C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2">
              Use image
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
