# HustisyaHub Template Generator

Generate React components, hooks, and utilities with Bun.

## 🚀 Quick Start

```bash
# Generate a component
bun generate Button

# Generate a component with tests
bun generate Header --tests

# Generate a hook
bun generate useAuth -t hook

# Generate a utility
bun generate formatDate -t util
```

## 📦 Available Commands

```bash
bun generate <name> [options]
```

### Options

- `-t, --type <type>` - Template type: `component`, `hook`, `util` (default: `component`)
- `-s, --styles` - Include styles (default: `true`, component only)
- `--tests` - Include test files (default: `false`)
- `-h, --help` - Show help message

### NPM Scripts

```bash
bun run generate          # Interactive generator
bun run generate:component # Generate component
bun run generate:hook     # Generate hook
bun run generate:util     # Generate utility
```

## 📁 Generated Structure

### Component
```
src/components/Button/
├── Button.tsx
├── index.ts
├── styles/
│   └── Button.module.css
└── Button.test.tsx (if --tests)
```

### Hook
```
src/hooks/
├── useAuth.ts
└── useAuth.test.ts (if --tests)
```

### Utility
```
src/utils/
├── formatDate.ts
└── formatDate.test.ts (if --tests)
```

## 💡 Examples

```bash
# Component with styles (default)
bun generate Card

# Component with tests
bun generate Modal --tests

# Component without styles
bun generate Alert -s false

# Custom hook
bun generate useLocalStorage -t hook --tests

# Utility function
bun generate debounce -t util
```

## 🧪 Testing

Templates include Bun's built-in test framework:

```bash
bun test
```
