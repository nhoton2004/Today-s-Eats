"use client";

import { Home, Refrigerator, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ActiveTab = 'home' | 'fridge' | 'manager';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const navItems = [
  { id: 'home', label: 'Quay Món', icon: Home, activeClass: 'text-orange-600 bg-orange-100' },
  { id: 'fridge', label: 'Tủ Lạnh', icon: Refrigerator, activeClass: 'text-blue-600 bg-blue-50' },
  { id: 'manager', label: 'Menu', icon: List, activeClass: 'text-green-600 bg-green-50' },
] as const;

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-20 pb-safe shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-around p-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'flex flex-col items-center p-2 rounded-xl transition-all w-20 h-[60px] justify-center gap-1 text-muted-foreground hover:bg-secondary',
                isActive && item.activeClass
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
