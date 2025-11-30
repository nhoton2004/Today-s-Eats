import { config } from 'dotenv';
config();

import '@/backend/ai/flows/suggest-new-dishes.ts';
import '@/backend/ai/flows/recipe-from-dish.ts';
import '@/backend/ai/flows/suggest-dishes-from-ingredients.ts';