import type { PropFunction, Component } from "@builder.io/qwik";

export interface ChatMessage {
  content: BuilderContent;
  isUser: boolean;
}

export interface UserInput {
  text: string;
}

// CV Data types
export interface CVData {
  skills: Skill[];
  experiences: WorkExperience[];
  education: EducationEntry[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string; // YYYY-MM-DD
  endDate: string | null; // YYYY-MM-DD or null if current
  description: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string; // YYYY-MM-DD
}

// Builder.io inspired types
export interface BuilderContent {
  data: {
    blocks: BuilderBlock[];
  };
}

export interface BuilderBlock {
  component: {
    name: string;
    options: Record<string, any>;
  };
}

// Component-specific types
export interface ComponentProps {
  onAction$?: PropFunction<(action: string) => void>;
}

export interface TextProps extends Omit<ComponentProps, "onAction$"> {
  text: string;
}

export interface ButtonGroupProps extends ComponentProps {
  buttons: Button[];
}

export interface Button {
  text: string;
  action: string;
}

export interface SkillChartProps extends Omit<ComponentProps, "onAction$"> {
  skills: Skill[];
}

export interface TimelineProps extends Omit<ComponentProps, "onAction$"> {
  events: TimelineEvent[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
}

export interface InfoCardProps extends Omit<ComponentProps, "onAction$"> {
  title: string;
  items: string[];
}

// API-related types
export interface AnthropicApiRequest {
  message: string;
  cvData: CVData;
}

export interface AnthropicApiResponse {
  content: BuilderContent;
}

// Local message store types
export interface LocalMessage {
  id: string;
  trigger: string;
  response: BuilderContent;
}

// Utility type for component map
export type ComponentMap = {
  [key: string]: Component<any>;
};
