"use client";

import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Sparkles, Loader2 } from 'lucide-react';
import { MEAL_TYPES } from '@/shared/data';
import type { Dish, MealTypeId } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/frontend/components/ui/card';
import { Button } from '@/frontend/components/ui/button';
import { Input } from '@/frontend/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/frontend/components/ui/select';
import { ScrollArea } from '@/frontend/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/frontend/components/ui/alert-dialog';

interface ManagerTabProps {
  dishes: Dish[];
  newDishName: string;
  setNewDishName: (name: string) => void;
  newDishType: MealTypeId;
  setNewDishType: (type: MealTypeId) => void;
  handleAddDish: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteDish: (id: number) => void;
  handleReset: () => void;
  handleAISuggest: () => void;
  isSuggesting: boolean;
}

export default function ManagerTab({
  dishes, newDishName, setNewDishName, newDishType, setNewDishType,
  handleAddDish, handleDeleteDish, handleReset, handleAISuggest, isSuggesting
}: ManagerTabProps) {

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus size={20} className="text-green-500" /> Thêm Món Mới
            </CardTitle>
            <Button
              onClick={handleAISuggest}
              disabled={isSuggesting}
              size="sm"
              variant="outline"
              className="text-xs bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
            >
              {isSuggesting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={12} />}
              AI Gợi ý
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddDish} className="space-y-3">
            <Input
              type="text"
              value={newDishName}
              onChange={(e) => setNewDishName(e.target.value)}
              placeholder="VD: Bún đậu mắm tôm..."
              className="p-3 h-auto rounded-xl focus:ring-primary"
            />
            <div className="flex gap-2">
              <Select value={newDishType} onValueChange={(value: MealTypeId) => setNewDishType(value)}>
                <SelectTrigger className="p-3 h-auto rounded-xl focus:ring-primary text-sm">
                  <SelectValue placeholder="Chọn bữa" />
                </SelectTrigger>
                <SelectContent>
                  {MEAL_TYPES.filter(t => t.id !== 'all').map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" className="flex-1 rounded-xl font-bold bg-green-500 hover:bg-green-600">
                Lưu
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Thực đơn ({dishes.length})</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
                  <RotateCcw size={12} /> Khôi phục gốc
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc không?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này sẽ xóa tất cả các món bạn đã thêm và khôi phục lại danh sách món ăn mặc định.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Khôi phục</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] pr-2 custom-scrollbar">
            <div className="space-y-2">
              {dishes.slice().reverse().map((dish) => (
                <div key={dish.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl group hover:bg-orange-50 transition">
                  <div>
                    <div className="font-semibold text-card-foreground">{dish.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {MEAL_TYPES.find(t => t.id === dish.type)?.label}
                    </div>
                  </div>
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="ghost" size="icon" className="p-2 text-muted-foreground/50 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8 transition">
                        <Trash2 size={18} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                       <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc muốn xóa món "{dish.name}" khỏi thực đơn không?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteDish(dish.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Xóa</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
