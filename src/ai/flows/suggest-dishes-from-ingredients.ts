'use server';
/**
 * @fileOverview Suggests dishes based on available ingredients.
 *
 * - suggestDishesFromIngredients - A function that suggests dishes based on ingredients.
 * - SuggestDishesFromIngredientsInput - The input type for the suggestDishesFromIngredients function.
 * - SuggestDishesFromIngredientsOutput - The return type for the suggestDishesFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDishesFromIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available in the fridge.'),
});
export type SuggestDishesFromIngredientsInput = z.infer<
  typeof SuggestDishesFromIngredientsInputSchema
>;

const SuggestDishesFromIngredientsOutputSchema = z.string().describe(
  'A list of suggested dishes based on the available ingredients, including ingredients needed and instructions.'
);
export type SuggestDishesFromIngredientsOutput = z.infer<
  typeof SuggestDishesFromIngredientsOutputSchema
>;

export async function suggestDishesFromIngredients(
  input: SuggestDishesFromIngredientsInput
): Promise<SuggestDishesFromIngredientsOutput> {
  return suggestDishesFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDishesFromIngredientsPrompt',
  input: {schema: SuggestDishesFromIngredientsInputSchema},
  output: {schema: SuggestDishesFromIngredientsOutputSchema},
  prompt: `Tôi có các nguyên liệu sau trong tủ lạnh: "{{{ingredients}}}".\n
    Hãy đóng vai một đầu bếp sáng tạo, gợi ý giúp tôi 3 món ăn ngon nhất có thể chế biến từ các nguyên liệu này (bạn có thể giả định tôi có sẵn gia vị cơ bản như mắm, muối, đường, dầu ăn).\n    
    Yêu cầu định dạng câu trả lời rõ ràng cho từng món:\n    Món 1: [Tên món] (Độ khó: Dễ/Vừa/Khó)\n    - Nguyên liệu cần thêm (nếu có): ...\n    - Cách làm nhanh: ...

    Món 2: ...
    Món 3: ...
    
    Cuối cùng là một lời chúc ngon miệng ngắn gọn. Dùng nhiều emoji.`,
});

const suggestDishesFromIngredientsFlow = ai.defineFlow(
  {
    name: 'suggestDishesFromIngredientsFlow',
    inputSchema: SuggestDishesFromIngredientsInputSchema,
    outputSchema: SuggestDishesFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
