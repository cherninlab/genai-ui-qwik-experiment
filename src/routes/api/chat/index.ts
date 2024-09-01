import type { RequestHandler } from "@builder.io/qwik-city";
import type { BuilderContent } from "~/utils/types";
import { AnthropicChat } from "~/utils/anthropicApi";
import { MistralChat } from "~/utils/mistralApi";
import { OpenAIChat } from "~/utils/openaiApi";

interface AIProviderConfigItem {
  chat: (
    message: string,
    apiKey: string,
    model: string,
  ) => Promise<BuilderContent>;
}

interface AIProviderConfig {
  [key: string]: AIProviderConfigItem;
}

const aiProviders: AIProviderConfig = {
  anthropic: {
    chat: AnthropicChat,
  },
  mistral: {
    chat: MistralChat,
  },
  openai: {
    chat: OpenAIChat,
  },
};

export const onPost: RequestHandler = async ({ json, parseBody, env }) => {
  const body = await parseBody();
  const DEFAULT_PROVIDER = env.get("DEFAULT_AI_PROVIDER");
  const { message, provider = DEFAULT_PROVIDER || "anthropic" } = body as {
    message: string;
    provider?: string;
  };

  const selectedProvider = aiProviders[provider];

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!selectedProvider) {
    json(400, { error: "Invalid AI provider specified" });
    return;
  }

  const apiKey = env.get(`${provider.toUpperCase()}_API_KEY`);
  const model =
    env.get(`${provider.toUpperCase()}_MODEL`) || getDefaultModel(provider);

  if (!apiKey) {
    json(500, { error: `${provider.toUpperCase()}_API_KEY is not set` });
    return;
  }

  try {
    const aiResponse: BuilderContent = await selectedProvider.chat(
      message,
      apiKey,
      model,
    );
    json(200, aiResponse);
  } catch (error) {
    console.error(`Error from ${provider} API:`, error);
    json(500, {
      error: `Failed to fetch response from ${provider} API`,
    });
    return;
  }
};

function getDefaultModel(provider: string): string {
  switch (provider) {
    case "anthropic":
      return "claude-2";
    case "mistral":
      return "mistral-tiny";
    case "openai":
      return "gpt-3.5-turbo";
    default:
      return "";
  }
}
