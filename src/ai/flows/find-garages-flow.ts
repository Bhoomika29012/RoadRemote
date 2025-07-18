'use server';
/**
 * @fileOverview An AI flow to find nearby car garages.
 *
 * - findGarages - A function that finds garages near a given location.
 * - FindGaragesInput - The input type for the findGarages function.
 * - FindGaragesOutput - The return type for the findGarages function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FindGaragesInputSchema = z.object({
  location: z.string().describe('The current location of the user as latitude and longitude (e.g., "40.7128, -74.0060") or a city name.'),
});
export type FindGaragesInput = z.infer<typeof FindGaragesInputSchema>;

const FindGaragesOutputSchema = z.object({
  garages: z.array(
    z.object({
      name: z.string().describe('The name of the garage.'),
      address: z.string().describe('The full address of the garage.'),
    })
  ).describe('A list of nearby garages.'),
});
export type FindGaragesOutput = z.infer<typeof FindGaragesOutputSchema>;

export async function findGarages(input: FindGaragesInput): Promise<FindGaragesOutput> {
  return findGaragesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findGaragesPrompt',
  input: { schema: FindGaragesInputSchema },
  output: { schema: FindGaragesOutputSchema },
  prompt: `You are a helpful assistant for a roadside assistance app. Your task is to find car repair garages near the user's location.

User's Location: {{{location}}}

Please find 3-5 nearby car repair garages and return them in the specified format. Do not include imaginary or fake businesses.`,
});

const findGaragesFlow = ai.defineFlow(
  {
    name: 'findGaragesFlow',
    inputSchema: FindGaragesInputSchema,
    outputSchema: FindGaragesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
