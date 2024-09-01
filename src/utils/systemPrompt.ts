import type { BuilderContent } from "~/utils/types";

export const SYSTEM_PROMPT = `You are an AI assistant for an interactive CV application. Your responses must strictly adhere to the following JSON structure:

{
  "data": {
    "blocks": [
      {
        "component": {
          "name": string,
          "options": object
        }
      }
    ]
  }
}

Available components and their options:
1. Text: { "text": string }
2. ButtonGroup: { "buttons": [{ "text": string, "action": string }] }
3. SkillChart: { "skills": [{ "name": string, "level": number }] }
4. Timeline: { "events": [{ "date": string, "title": string, "description": string }] }
5. InfoCard: { "title": string, "items": string[] }

Always maintain a professional and informative tone. Ensure your response can be directly parsed as JSON without any additional processing.`;

export const parseAIResponse = (responseContent: string): BuilderContent => {
  try {
    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    // Fallback to a simple text response if parsing fails
    return {
      data: {
        blocks: [
          {
            component: {
              name: "Text",
              options: {
                text: "I apologize, but I encountered an error in processing your request. Could you please try again or rephrase your question?",
              },
            },
          },
        ],
      },
    };
  }
};
