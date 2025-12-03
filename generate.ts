#!/usr/bin/env bun

import { parseArgs } from 'util';
import { TemplateGenerator } from './src/templates/generator';

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    type: {
      type: 'string',
      short: 't',
      default: 'component',
    },
    styles: {
      type: 'boolean',
      short: 's',
      default: true,
    },
    tests: {
      type: 'boolean',
      default: false,
    },
    init: {
      type: 'boolean',
      default: false,
    },
    help: {
      type: 'boolean',
      short: 'h',
      default: false,
    },
  },
  allowPositionals: true,
});

function showHelp() {
  console.log(`
🎨 HustisyaHub Template Generator

Usage:
  bun generate <name> [options]
  bun generate --init                    # Initialize project structure

Options:
  -t, --type <type>    Template type: component, hook, util (default: component)
  -s, --styles         Include styles (default: true, component only)
  --tests              Include test files (default: false)
  --init               Initialize complete project structure
  -h, --help           Show this help message

Examples:
  bun generate --init                    # Setup project folders and files
  bun generate Button                    # Create a component with styles
  bun generate Button --tests            # Create a component with tests
  bun generate Counter -t hook           # Create a custom hook
  bun generate formatDate -t util        # Create a utility function
  bun generate useAuth -t hook --tests   # Create a hook with tests

Template Types:
  component  - React component with optional styles and tests
  hook       - Custom React hook
  util       - Utility function
`);
}

function main() {
  const generator = new TemplateGenerator();

  // Handle --init flag
  if (values.init) {
    try {
      generator.initializeProject();
      process.exit(0);
    } catch (error) {
      console.error('❌ Error initializing project:', error);
      process.exit(1);
    }
  }

  if (values.help || positionals.length === 0) {
    showHelp();
    process.exit(0);
  }

  const name = positionals[0];
  const type = values.type as string;

  try {
    switch (type) {
      case 'component':
        generator.generateComponent({
          name,
          hasStyles: values.styles,
          hasTests: values.tests,
        });
        break;
      case 'hook':
        generator.generateHook(name, values.tests);
        break;
      case 'util':
        generator.generateUtil(name, values.tests);
        break;
      default:
        console.error(`❌ Unknown template type: ${type}`);
        console.log('   Valid types: component, hook, util');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error generating template:', error);
    process.exit(1);
  }
}

main();
