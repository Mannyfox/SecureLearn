'use server';

/**
 * @fileOverview Flow to generate quiz questions from a document.
 *
 * - generateQuestionsFromText - A function that generates quiz questions based on document content.
 * - GenerateQuestionsInput - The input type for the function.
 * - GenerateQuestionsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionsInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The text content of the policy document.'),
});
export type GenerateQuestionsInput = z.infer<
  typeof GenerateQuestionsInputSchema
>;

const QuestionSchema = z.object({
  id: z.string().describe('A unique ID for the question (e.g., q5, q6).'),
  questionText: z.string().describe('The text of the question.'),
  options: z
    .array(z.string())
    .length(3)
    .describe('An array of exactly three possible answers.'),
  correctAnswerIndex: z
    .number()
    .min(0)
    .max(2)
    .describe('The index (0, 1, or 2) of the correct answer in the options array.'),
  explanation: z
    .string()
    .describe(
      'A brief explanation of why the correct answer is right, for user feedback.'
    ),
});

const GenerateQuestionsOutputSchema = z.object({
  questions: z
    .array(QuestionSchema)
    .describe('An array of generated quiz questions.'),
});
export type GenerateQuestionsOutput = z.infer<
  typeof GenerateQuestionsOutputSchema
>;

export async function generateQuestionsFromText(
  input: GenerateQuestionsInput
): Promise<GenerateQuestionsOutput> {
  return generateQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: {schema: GenerateQuestionsInputSchema},
  output: {schema: GenerateQuestionsOutputSchema},
  prompt: `You are an expert in creating educational content. Your task is to create a set of multiple-choice quiz questions based on the provided document content.

  Follow these instructions carefully:
  1.  Generate between 3 and 5 distinct questions.
  2.  For each question, provide exactly three possible options.
  3.  One of the options must be the correct answer.
  4.  Indicate the index of the correct answer.
  5.  Provide a clear and concise explanation for why the answer is correct.
  6.  The questions should cover different key concepts from the document.
  7.  Ensure the generated question IDs are unique.

  Document Content:
  {{{documentContent}}}
  `,
});

const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
