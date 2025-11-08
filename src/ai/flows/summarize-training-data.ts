'use server';

/**
 * @fileOverview Summarizes training data across all completed training modules.
 *
 * - summarizeTrainingData - A function that generates a summary of training data.
 * - SummarizeTrainingDataInput - The input type for the summarizeTrainingData function.
 * - SummarizeTrainingDataOutput - The return type for the summarizeTrainingData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTrainingDataInputSchema = z.object({
  trainingData: z
    .string()
    .describe('A stringified JSON array containing training data objects.'),
});
export type SummarizeTrainingDataInput = z.infer<typeof SummarizeTrainingDataInputSchema>;

const SummarizeTrainingDataOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A natural language summary of the training data, highlighting areas of high and low success rates.'
    ),
});
export type SummarizeTrainingDataOutput = z.infer<typeof SummarizeTrainingDataOutputSchema>;

export async function summarizeTrainingData(input: SummarizeTrainingDataInput): Promise<SummarizeTrainingDataOutput> {
  return summarizeTrainingDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTrainingDataPrompt',
  input: {schema: SummarizeTrainingDataInputSchema},
  output: {schema: SummarizeTrainingDataOutputSchema},
  prompt: `You are an expert in data analysis and summarization. Your task is to analyze the provided training data and provide a concise summary highlighting key trends in training performance.

The training data is provided as a JSON string:

{{{trainingData}}}

Focus on identifying modules or areas where users consistently perform well and areas where they struggle. Provide specific examples of modules with high success rates and modules with low success rates.  The output should be easily understandable by non-technical stakeholders.
`,
});

const summarizeTrainingDataFlow = ai.defineFlow(
  {
    name: 'summarizeTrainingDataFlow',
    inputSchema: SummarizeTrainingDataInputSchema,
    outputSchema: SummarizeTrainingDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
