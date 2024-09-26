import type { PropFunction } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";
import type {
  BuilderBlock,
  BuilderContent,
  ComponentMap,
  ComponentProps,
  TextProps,
  ButtonGroupProps,
  SkillChartProps,
  TimelineProps,
  InfoCardProps,
} from "~/utils/types";
import styles from "./styles.module.css";

const Text = component$<TextProps>(({ text }) => {
  return <p>{text}</p>;
});

const ButtonGroup = component$<ButtonGroupProps>(({ buttons, onAction$ }) => {
  return (
    <div>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick$={() => (onAction$ ? onAction$(button.action) : null)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
});

const SkillChart = component$<SkillChartProps>(({ skills }) => {
  return (
    <div class={styles.skillChart}>
      {skills.map((skill, index) => (
        <div key={index} class={styles.skillItem}>
          <span class={styles.skillName}>{skill.name}</span>
          <div
            class={styles.skillBar}
            style={{ width: `${skill.level}%` }}
          ></div>
        </div>
      ))}
    </div>
  );
});

const Timeline = component$<TimelineProps>(({ events }) => {
  return (
    <div class={styles.timeline}>
      {events.map((event, index) => (
        <div key={index} class={styles.timelineEvent}>
          <div class={styles.eventDate}>{event.date}</div>
          <div>
            <h3>{event.title}</h3>
            {event.description && <p>{event.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
});

const InfoCard = component$<InfoCardProps>(({ title, items }) => {
  return (
    <div class={styles.infoCard}>
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
});

const componentMap: ComponentMap = {
  Text,
  ButtonGroup,
  SkillChart,
  Timeline,
  InfoCard,
};

export const RenderBlock = component$<{
  block: BuilderBlock;
  onAction$: PropFunction<(action: string) => void>;
}>(({ block, onAction$ }) => {
  const Component = componentMap[block.component.name];

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!Component) {
    console.warn(`Component ${block.component.name} not found`);
    return null;
  }

  const props = {
    ...block.component.options,
    ...(block.component.name === "ButtonGroup" ? { onAction$ } : {}),
  };

  return <Component {...props} />;
});

export const RenderContent = component$<{
  content: BuilderContent;
  onAction$: PropFunction<(action: string) => void>;
}>(({ content, onAction$ }) => {
  return (
    <>
      {content.data.blocks.map((block, index) => (
        <RenderBlock key={index} block={block} onAction$={onAction$} />
      ))}
    </>
  );
});

export const ComponentWrapper = component$<ComponentProps>(() => {
  return (
    <div class="component-wrapper">
      <Slot />
    </div>
  );
});

// Export individual components for direct use if needed
export { Text, ButtonGroup, SkillChart, Timeline, InfoCard };
