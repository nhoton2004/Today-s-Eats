import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-new-dishes.ts';
import '@/ai/flows/recipe-from-dish.ts';
import '@/ai/flows/suggest-dishes-from-ingredients.ts';