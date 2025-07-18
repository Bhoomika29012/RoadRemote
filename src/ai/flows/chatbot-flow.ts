'use server';
/**
 * @fileOverview An AI flow for a roadside assistance chatbot.
 *
 * - roadsideAssistantFlow - A function that provides answers to driver queries.
 * - RoadsideAssistantInput - The input type for the roadsideAssistantFlow function.
 * - RoadsideAssistantOutput - The return type for the roadsideAssistantFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RoadsideAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question about their car trouble or for roadside guidance.'),
});
export type RoadsideAssistantInput = z.infer<typeof RoadsideAssistantInputSchema>;

const RoadsideAssistantOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s helpful response.'),
});
export type RoadsideAssistantOutput = z.infer<typeof RoadsideAssistantOutputSchema>;

export async function roadsideAssistantFlow(input: RoadsideAssistantInput): Promise<RoadsideAssistantOutput> {
  const prompt = ai.definePrompt({
    name: 'roadsideAssistantPrompt',
    input: { schema: RoadsideAssistantInputSchema },
    output: { schema: RoadsideAssistantOutputSchema },
    prompt: `You are a friendly and expert AI roadside assistant. Your goal is to help drivers who are experiencing car trouble.

    You can provide:
    - Clear, step-by-step DIY instructions for simple fixes (e.g., how to check oil, how to change a tire, what to do if the battery is dead).
    - Safety advice and best practices for roadside emergencies.
    - Contact information for emergency services if requested (use placeholder numbers like 911 for emergencies).
    - General guidance on what might be wrong with their vehicle based on their description.

    IMPORTANT:
    - Keep your responses concise and easy to understand for someone who is stressed.
    - If a task is dangerous or requires a professional, strongly advise the user to call for professional help instead of attempting it themselves.
    - Do not answer questions that are not related to car trouble or roadside assistance. Politely decline and state your purpose.

    User's query: {{{query}}}
    `,
  });

  const { output } = await prompt(input);
  return output!;
}
