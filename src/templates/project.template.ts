export const appTemplate = () => `import React from 'react';
import './styles/globals.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>HustisyaHub</h1>
        <p>Welcome to your application</p>
      </header>
      <main className="app-main">
        {/* Add your components here */}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 HustisyaHub</p>
      </footer>
    </div>
  );
}

export default App;
`;

export const indexTemplate = () => `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

export const indexHTMLTemplate = () => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="HustisyaHub - Your Application">
    <title>HustisyaHub</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
`;

export const globalStylesTemplate = () => `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --background-color: #ffffff;
  --text-color: #212529;
  --border-color: #dee2e6;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  --transition-speed: 0.3s;
}

body {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: var(--primary-color);
  color: white;
  padding: 2rem;
  text-align: center;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background-color: var(--dark-color);
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}

/* Utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center {
  text-align: center;
}

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

.p-1 { padding: 0.5rem; }
.p-2 { padding: 1rem; }
.p-3 { padding: 1.5rem; }
.p-4 { padding: 2rem; }
`;

export const componentFolderReadmeTemplate = () => `# Components

This folder contains all React components for the application.

## Structure

Each component should follow this structure:

\`\`\`
ComponentName/
├── ComponentName.tsx       # Main component file
├── index.ts                # Exports
├── styles/                 # Component styles
│   └── ComponentName.module.css
└── ComponentName.test.tsx  # Tests (optional)
\`\`\`

## Creating Components

Use the generator:

\`\`\`bash
bun generate ComponentName
\`\`\`

## Best Practices

- Keep components small and focused
- Use TypeScript for type safety
- Add prop types and documentation
- Write tests for complex logic
- Use CSS modules for styling
`;

export const stylesFolderReadmeTemplate = () => `# Styles

This folder contains global styles and style utilities.

## Files

- \`globals.css\` - Global styles and CSS variables
- \`*.module.css\` - Component-specific styles (CSS modules)

## CSS Variables

Global CSS variables are defined in \`globals.css\`:

- Colors: \`--primary-color\`, \`--secondary-color\`, etc.
- Typography: \`--font-family\`
- Spacing: Use utility classes or custom values
- Transitions: \`--transition-speed\`

## Usage

\`\`\`tsx
// Import global styles in your app
import './styles/globals.css';

// Use CSS modules in components
import styles from './styles/Component.module.css';
\`\`\`
`;
