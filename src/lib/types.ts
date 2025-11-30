import type { LucideIcon } from "lucide-react";

export type MealTypeId = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type Dish = {
  id: number;
  name: string;
  type: MealTypeId;
};

export type MealType = {
  id: MealTypeId | 'all';
  label: string;
  icon: LucideIcon;
};
