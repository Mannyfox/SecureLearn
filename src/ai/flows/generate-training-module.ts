'use server';

/**
 * @fileOverview Training module generation flow.
 *
 * - generateTrainingModule - A function that generates a training module based on a text description.
 * - GenerateTrainingModuleInput - The input type for the generateTrainingModule function.
 * - GenerateTrainingModuleOutput - The return type for the generateTrainingModule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTrainingModuleInputSchema = z.object({
  description: z
    .string()
    .describe('A detailed text description of the training module content.'),
});
export type GenerateTrainingModuleInput = z.infer<
  typeof GenerateTrainingModuleInputSchema
>;

const GenerateTrainingModuleOutputSchema = z.object({
  title: z.string().describe('The title of the training module.'),
  content: z.string().describe('The full content of the training module.'),
});
export type GenerateTrainingModuleOutput = z.infer<
  typeof GenerateTrainingModuleOutputSchema
>;

export async function generateTrainingModule(
  input: GenerateTrainingModuleInput
): Promise<GenerateTrainingModuleOutput> {
  return generateTrainingModuleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTrainingModulePrompt',
  input: {schema: GenerateTrainingModuleInputSchema},
  output: {schema: GenerateTrainingModuleOutputSchema},
  prompt: `You are an expert in creating training modules. Based on the description provided, generate a complete training module.

Description: {{{description}}}`,
});

const generateTrainingModuleFlow = ai.defineFlow(
  {
    name: 'generateTrainingModuleFlow',
    inputSchema: GenerateTrainingModuleInputSchema,
    outputSchema: GenerateTrainingModuleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
