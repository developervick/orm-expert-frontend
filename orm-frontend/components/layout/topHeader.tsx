import React from 'react';
import { Menu, List } from 'lucide-react';

export default function TopHeader({ onOpenPrimary, onOpenSecondary }: { onOpenPrimary: () => void, onOpenSecondary: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-30 shadow-sm relative">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-lg" onClick={onOpenPrimary}>
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-lg lg:text-xl font-bold text-surface-900 truncate">Mastering Database Queries</h1>
          <p className="text-xs lg:text-sm text-surface-500 font-medium hidden sm:block">Backend Architecture Path</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2 text-brand-600 hover:bg-brand-50 rounded-lg mr-2" onClick={onOpenSecondary}>
          <List size={24} />
        </button>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-surface-900">Vicky</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-200 text-brand-700 font-bold shrink-0">
          V
        </div>
      </div>
    </header>
  );
}