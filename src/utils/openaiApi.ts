import type { BuilderContent } from "./types";
import { SYSTEM_PROMPT, parseAIResponse } from "./systemPrompt";

export async function OpenAIChat(
  message: string,
  apiKey: string,
  model: string,
): Promise<BuilderContent> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from OpenAI API");
  }

  const data = await response.json();

  return parseAIResponse(data.choices[0].message.content);
}
