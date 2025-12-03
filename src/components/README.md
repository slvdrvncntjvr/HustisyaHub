# Components

This folder contains all React components for the application.

## Structure

Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx       # Main component file
├── index.ts                # Exports
├── styles/                 # Component styles
│   └── ComponentName.module.css
└── ComponentName.test.tsx  # Tests (optional)
```

## Creating Components

Use the generator:

```bash
bun generate ComponentName
```

## Best Practices

- Keep components small and focused
- Use TypeScript for type safety
- Add prop types and documentation
- Write tests for complex logic
- Use CSS modules for styling
