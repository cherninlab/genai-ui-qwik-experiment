import type { BuilderContent } from "./types";
import { SYSTEM_PROMPT, parseAIResponse } from "./systemPrompt";
import { Anthropic } from "@anthropic-ai/sdk";

export async function AnthropicChat(
  message: string,
  apiKey: string,
  model: string,
): Promise<BuilderContent> {
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });

  try {
    const completion = await anthropic.messages.create({
      model: model,
      max_tokens: 1000,
      temperature: 0,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: message,
            },
          ],
        },
      ],
    });

    console.log(completion);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!completion.content || completion.content.length === 0) {
      throw new Error("Unexpected response format from Anthropic API");
    }

    if (completion.content[0].type === "tool_use") {
      return parseAIResponse('{"data": "tool usage"}');
    }

    return parseAIResponse(completion.content[0].text);
  } catch (error) {
    console.error("Error from Anthropic API:", error);
    throw new Error("Failed to fetch response from Anthropic API");
  }
}
