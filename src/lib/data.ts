import type { Dish, MealType } from './types';
import { Utensils, Sunrise, Sun, Moon, Coffee } from 'lucide-react';

export const INITIAL_DISHES: Dish[] = [
  { id: 1, name: 'Phở Bò', type: 'breakfast' },
  { id: 2, name: 'Bánh Mì', type: 'breakfast' },
  { id: 3, name: 'Xôi Mặn', type: 'breakfast' },
  { id: 4, name: 'Cơm Tấm', type: 'lunch' },
  { id: 5, name: 'Bún Chả', type: 'lunch' },
  { id: 6, name: 'Cơm Gà Xối Mỡ', type: 'lunch' },
  { id: 7, name: 'Lẩu Thái', type: 'dinner' },
  { id: 8, name: 'Ốc Len Xào Dừa', type: 'snack' },
  { id: 9, name: 'Bún Bò Huế', type: 'breakfast' },
  { id: 10, name: 'Cơm Rang Dưa Bò', type: 'dinner' },
  { id: 11, name: 'Bánh Tráng Trộn', type: 'snack' },
  { id: 12, name: 'Bún Đậu Mắm Tôm', type: 'lunch' },
];

export const MEAL_TYPES: MealType[] = [
  { id: 'all', label: 'Tất cả', icon: Utensils },
  { id: 'breakfast', label: 'Sáng', icon: Sunrise },
  { id: 'lunch', label: 'Trưa', icon: Sun },
  { id: 'dinner', label: 'Tối', icon: Moon },
  { id: 'snack', label: 'Ăn Vặt', icon: Coffee },
];
