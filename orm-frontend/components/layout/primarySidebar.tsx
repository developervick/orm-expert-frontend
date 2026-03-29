import React from 'react';
import { Home, BookOpen, User, Settings, Layout, X } from 'lucide-react';

interface PrimarySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrimarySidebar({ isOpen, onClose }: PrimarySidebarProps) {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-20 lg:w-64 bg-surface-900 flex flex-col items-center lg:items-start transition-transform duration-300 shadow-xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:static`}
    >
      <div className="h-16 flex items-center justify-between lg:justify-start px-4 w-full border-b border-surface-800 text-white">
        <div className="flex items-center">
          <Layout className="w-8 h-8 text-brand-400" />
          <span className="ml-3 font-bold text-xl hidden lg:block tracking-wide">ORM Expert</span>
        </div>
        {/* Mobile Close Button */}
        <button 
          className="lg:hidden text-surface-400 hover:text-white transition-colors" 
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 w-full py-6 flex flex-col gap-2 px-3">
        <NavItem icon={<Home />} label="Home" />
        <NavItem icon={<BookOpen />} label="My Courses" active />
        <NavItem icon={<User />} label="Profile" />
      </nav>
      
      <div className="w-full pb-6 px-3 border-t border-surface-800 pt-4">
        {/* Kept "Local Setup" as requested for your local machine focus */}
        <NavItem icon={<Settings />} label="Local Setup" />
      </div>
    </aside>
  );
}

// --- HELPER COMPONENT ---
function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-center lg:justify-start gap-4 p-3.5 rounded-xl transition-all ${
      active 
        ? 'bg-brand-600 text-white shadow-md' 
        : 'text-surface-400 hover:bg-surface-800 hover:text-white'
    }`}>
      <div className={`${active ? 'text-white' : 'text-surface-400'}`}>
        {icon}
      </div>
      <span className="font-semibold hidden lg:block tracking-wide">{label}</span>
    </button>
  );
}