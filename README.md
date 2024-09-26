# genAi UI (QWIK experiment)

## Key Components

- `componentFactory`: Defines reusable components for rendering AI responses
- `localMessagesStore`: Stores predefined responses for common queries
- `anthropicApi`, `mistralApi`, `openaiApi`: Wrappers for AI provider APIs
- `systemPrompt`: Defines the AI system prompt and response parsing logic

## Setup and Configuration

1. Clone the repository
2. Install dependencies: `npm install` or `bun install`
3. Set up environment variables:
    - `DEFAULT_AI_PROVIDER`: Default AI provider to use (anthropic, mistral, or openai)
    - `<PROVIDER>_API_KEY`: API key for the chosen provider
    - `<PROVIDER>_MODEL`: Model to use for the chosen provider (optional)

## Running the Project

- Development mode: `npm start` or `bun start`
- Production build: `npm run build` or `bun run build`
- Preview production build: `npm run preview` or `bun run preview`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
