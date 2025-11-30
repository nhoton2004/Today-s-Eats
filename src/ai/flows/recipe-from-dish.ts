'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a recipe for a given dish using AI.
 *
 * The flow takes a dish name as input and returns a recipe, including an estimated calorie count and fun cooking advice.
 *
 * @interface RecipeFromDishInput - Input type for the recipeFromDish function, containing the dish name.
 * @interface RecipeFromDishOutput - Output type for the recipeFromDish function, containing the generated recipe.
 * @function recipeFromDish - An async function that calls the recipeFromDishFlow to generate the recipe.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeFromDishInputSchema = z.object({
  dishName: z.string().describe('The name of the dish for which to generate a recipe.'),
});
export type RecipeFromDishInput = z.infer<typeof RecipeFromDishInputSchema>;

const RecipeFromDishOutputSchema = z.object({
  recipe: z.string().describe('The generated recipe for the dish, including calorie estimate and fun cooking advice.'),
});
export type RecipeFromDishOutput = z.infer<typeof RecipeFromDishOutputSchema>;

export async function recipeFromDish(input: RecipeFromDishInput): Promise<RecipeFromDishOutput> {
  return recipeFromDishFlow(input);
}

const recipeFromDishPrompt = ai.definePrompt({
  name: 'recipeFromDishPrompt',
  input: {schema: RecipeFromDishInputSchema},
  output: {schema: RecipeFromDishOutputSchema},
  prompt: `Tôi chọn món "{{{dishName}}}". Đóng vai đầu bếp vui tính: 1. Ước lượng Calo. 2. Cách làm siêu ngắn (dưới 100 từ). 3. Lời khuyên vui. Dùng emoji.`,
});

const recipeFromDishFlow = ai.defineFlow(
  {
    name: 'recipeFromDishFlow',
    inputSchema: RecipeFromDishInputSchema,
    outputSchema: RecipeFromDishOutputSchema,
  },
  async input => {
    const {output} = await recipeFromDishPrompt(input);
    return output!;
  }
);
