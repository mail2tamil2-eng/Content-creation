import { Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  isCollapsed?: boolean;
}

export function Header({ userName = 'Dheva', isCollapsed = false }: HeaderProps) {
  const leftOffset = isCollapsed ? 64 : 220;

  return (
    <header
      className="fixed top-0 right-0 h-20 bg-white border-b border-gray-100 flex items-center z-20 shadow-sm"
      style={{
        left: leftOffset,
        transition: 'left 200ms ease',
        fontFamily: 'Nunito Sans, system-ui, sans-serif',
      }}
    >
      {/* Search */}
      <div style={{ flex: '0 1 440px', paddingLeft: 24 }}>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search here…"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* Right: notification + user */}
      <div className="flex items-center gap-3 pr-6">
        {/* Bell */}
        <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2.5 pl-1 pr-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
            {userName.charAt(0)}
          </div>
          <div className="leading-tight text-left">
            <p className="font-semibold text-gray-800 text-sm leading-none mb-0.5">{userName}</p>
            <p className="text-sm text-gray-500 leading-none">Course Creator</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" />
        </button>
      </div>
    </header>
  );
}
