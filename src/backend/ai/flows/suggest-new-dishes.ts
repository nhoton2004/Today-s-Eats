'use server';
/**
 * @fileOverview Suggests new dishes for a specific meal type using Genkit.
 *
 * - suggestNewDishes - A function that suggests new dishes.
 * - SuggestNewDishesInput - The input type for the suggestNewDishes function.
 * - SuggestNewDishesOutput - The output type for the suggestNewDishes function.
 */

import {ai} from '@/backend/ai/genkit';
import {z} from 'genkit';

const SuggestNewDishesInputSchema = z.object({
  mealType: z.string().describe('The meal type for which to suggest new dishes (e.g., breakfast, lunch, dinner, snack).'),
  existingDishes: z.string().describe('A comma-separated string of existing dishes to avoid suggesting.'),
});
export type SuggestNewDishesInput = z.infer<typeof SuggestNewDishesInputSchema>;

const SuggestNewDishesOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggested dish names.'),
});
export type SuggestNewDishesOutput = z.infer<typeof SuggestNewDishesOutputSchema>;

export async function suggestNewDishes(input: SuggestNewDishesInput): Promise<SuggestNewDishesOutput> {
  return suggestNewDishesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestNewDishesPrompt',
  input: {schema: SuggestNewDishesInputSchema},
  output: {schema: SuggestNewDishesOutputSchema},
  prompt: `Suggest 5 món Việt Nam for {{mealType}} that are not in the following list: {{{existingDishes}}}. Only return the names of the dishes, separated by commas.
`,
});

const suggestNewDishesFlow = ai.defineFlow(
  {
    name: 'suggestNewDishesFlow',
    inputSchema: SuggestNewDishesInputSchema,
    outputSchema: SuggestNewDishesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output || !output.suggestions) {
      return {suggestions: []};
    }
    return output;
  }
);
