# Styles

This folder contains global styles and style utilities.

## Files

- `globals.css` - Global styles and CSS variables
- `*.module.css` - Component-specific styles (CSS modules)

## CSS Variables

Global CSS variables are defined in `globals.css`:

- Colors: `--primary-color`, `--secondary-color`, etc.
- Typography: `--font-family`
- Spacing: Use utility classes or custom values
- Transitions: `--transition-speed`

## Usage

```tsx
// Import global styles in your app
import './styles/globals.css';

// Use CSS modules in components
import styles from './styles/Component.module.css';
```
