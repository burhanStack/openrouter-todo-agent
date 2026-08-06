import { OpenRouter } from '@openrouter/agent';

export const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});
