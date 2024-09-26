import type { BuilderContent } from "~/utils/types";

export interface LocalMessage {
  id: string;
  trigger: string;
  response: BuilderContent;
}

export const localMessages: LocalMessage[] = [
  {
    id: "welcome",
    trigger: "auto",
    response: {
      data: {
        blocks: [
          {
            component: {
              name: "Text",
              options: {
                text: "Welcome to my interactive CV! I'd be happy to tell you about my professional background. What would you like to know?",
              },
            },
          },
          {
            component: {
              name: "ButtonGroup",
              options: {
                buttons: [
                  { text: "Skills", action: "show_skills" },
                  { text: "Experience", action: "show_skills" },
                  { text: "Education", action: "show_skills" },
                ],
              },
            },
          },
        ],
      },
    },
  },
  {
    id: "skills",
    trigger: "show_skills",
    response: {
      data: {
        blocks: [
          {
            component: {
              name: "Text",
              options: {
                text: "I specialize in the following areas:",
              },
            },
          },
          {
            component: {
              name: "SkillChart",
              options: {
                skills: [
                  { name: "Web Development", level: 90 },
                  { name: "Database Management", level: 85 },
                  { name: "Cloud Services", level: 80 },
                  { name: "Machine Learning", level: 75 },
                ],
              },
            },
          },
          {
            component: {
              name: "ButtonGroup",
              options: {
                buttons: [
                  { text: "Web Dev Details", action: "show_web_dev_details" },
                  {
                    text: "Tell me about flat earth",
                    action: "Tell me about flat earth!!!",
                  },
                  { text: "Education", action: "show_education" },
                ],
              },
            },
          },
        ],
      },
    },
  },
];
