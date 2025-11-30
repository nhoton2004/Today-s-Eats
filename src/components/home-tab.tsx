"use client";

import { Utensils, Sparkles } from 'lucide-react';
import { MEAL_TYPES } from '@/lib/data';
import type { Dish, MealTypeId } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HomeTabProps {
  filter: MealTypeId | 'all';
  setFilter: (filter: MealTypeId | 'all') => void;
  result: Dish | null;
  isSpinning: boolean;
  handleSpin: () => void;
  handleGetRecipe: () => void;
}

export default function HomeTab({ filter, setFilter, result, isSpinning, handleSpin, handleGetRecipe }: HomeTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-muted-foreground mb-3 text-sm font-medium">BẠN ĐANG TÌM MÓN CHO...</p>
          <div className="flex justify-between gap-1 sm:gap-2">
            {MEAL_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setFilter(type.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 p-2 rounded-xl transition-all flex-1 text-muted-foreground hover:bg-secondary',
                    filter === type.id ? 'bg-orange-100 text-orange-600 ring-2 ring-primary/50' : ''
                  )}
                  aria-pressed={filter === type.id}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl shadow-xl p-8 text-center min-h-[250px] flex flex-col items-center justify-center relative overflow-hidden border-orange-100">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
        {result ? (
          <div className={cn(
            'transition-all duration-300 w-full',
            isSpinning ? 'scale-95 opacity-70 blur-sm' : 'scale-100 opacity-100'
          )}>
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
              {isSpinning ? 'Đang suy nghĩ...' : 'Hôm nay chốt đơn:'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-primary leading-tight mb-4 break-words">
              {result.name}
            </h2>
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 uppercase">
                {MEAL_TYPES.find(t => t.id === result.type)?.label || 'Món ngon'}
              </Badge>
            </div>
            {!isSpinning && (
              <Button 
                onClick={handleGetRecipe}
                variant="ghost"
                className="flex items-center justify-center gap-2 mx-auto text-purple-600 bg-purple-50 hover:bg-purple-100 px-4 py-2 h-auto rounded-full transition-colors border border-purple-200"
              >
                <Sparkles size={16} /> 
                Xem Công Thức
              </Button>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground">
            <Utensils size={48} className="mx-auto mb-3 opacity-20" />
            <p>Bấm nút bên dưới để vũ trụ quyết định!</p>
          </div>
        )}
      </Card>

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="w-full py-4 h-auto rounded-2xl text-xl font-bold text-primary-foreground shadow-lg transition-all transform active:scale-95 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-orange-200 disabled:bg-muted disabled:shadow-none disabled:text-muted-foreground disabled:bg-none"
      >
        {isSpinning ? 'Đang chọn...' : 'CHỐT MÓN NGAY!'}
      </Button>
    </div>
  );
}
