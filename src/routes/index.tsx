import { component$, useStore, $, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { RenderContent } from "~/components/componentFactory/componentFactory";
import { localMessages } from "~/data/localMessagesStore";
import type { ChatMessage, BuilderContent } from "~/utils/types";
import styles from "./styles.module.css";

export default component$(() => {
  const chatState = useStore({
    messages: [] as ChatMessage[],
    inputValue: "",
  });

  const findLocalResponse = $((input: string): BuilderContent | undefined => {
    const localMessage = localMessages.find(
      (msg) => msg.trigger.toLowerCase() === input.toLowerCase(),
    );
    return localMessage?.response;
  });

  const sendMessage = $(async (content: string) => {
    // Add user message
    chatState.messages = [
      ...chatState.messages,
      {
        content: {
          data: {
            blocks: [
              {
                component: {
                  name: "Text",
                  options: { text: content },
                },
              },
            ],
          },
        },
        isUser: true,
      },
    ];
    console.log(content);
    // Find local response
    const localResponse = await findLocalResponse(content);

    console.log(localResponse);
    if (localResponse) {
      chatState.messages = [
        ...chatState.messages,
        { content: localResponse, isUser: false },
      ];
    } else {
      // Only fetch from AI if no local response is found
      try {
        const aiResponse = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: content }),
        });

        if (!aiResponse.ok) {
          throw new Error("Failed to fetch AI response");
        }

        const responseData: BuilderContent = await aiResponse.json();
        chatState.messages = [
          ...chatState.messages,
          { content: responseData, isUser: false },
        ];
      } catch (error) {
        console.error("Error fetching AI response:", error);
        chatState.messages = [
          ...chatState.messages,
          {
            content: {
              data: {
                blocks: [
                  {
                    component: {
                      name: "Text",
                      options: {
                        text: "I'm sorry, but I encountered an error. Could you please try again?",
                      },
                    },
                  },
                ],
              },
            },
            isUser: false,
          },
        ];
      }
    }

    chatState.inputValue = "";
  });

  const handleAction = $((action: string) => {
    sendMessage(action);
  });

  useTask$(({ track }) => {
    track(() => chatState.messages.length);
    if (chatState.messages.length === 0) {
      const welcomeMessage = localMessages.find((msg) => msg.id === "welcome");
      if (welcomeMessage) {
        chatState.messages = [
          { content: welcomeMessage.response, isUser: false },
        ];
      }
    }
  });

  return (
    <div class={styles.container}>
      <div class={styles.chatHistory}>
        {chatState.messages.map((msg, index) => (
          <div
            key={index}
            class={msg.isUser ? styles.userMessage : styles.botMessage}
          >
            <RenderContent content={msg.content} onAction$={handleAction} />
          </div>
        ))}
      </div>
      <div class={styles.chatInput}>
        <input
          type="text"
          value={chatState.inputValue}
          onInput$={(ev) =>
            (chatState.inputValue = (ev.target as HTMLInputElement).value)
          }
          onKeyUp$={(ev) =>
            ev.key === "Enter" && sendMessage(chatState.inputValue)
          }
        />
        <button onClick$={() => sendMessage(chatState.inputValue)}>Send</button>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "CV Chatbot",
};
