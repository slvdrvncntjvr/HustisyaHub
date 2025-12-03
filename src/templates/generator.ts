import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { ComponentTemplate } from './types';
import {
  componentTemplate,
  componentStyleTemplate,
  componentTestTemplate,
  componentIndexTemplate,
} from './component.template';
import { hookTemplate, hookTestTemplate } from './hook.template';
import { utilTemplate, utilTestTemplate } from './util.template';
import {
  appTemplate,
  indexTemplate,
  indexHTMLTemplate,
  globalStylesTemplate,
  componentFolderReadmeTemplate,
  stylesFolderReadmeTemplate,
} from './project.template';

export class TemplateGenerator {
  private basePath: string;

  constructor(basePath: string = './src') {
    this.basePath = basePath;
  }

  private ensureDir(path: string) {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  private writeFile(path: string, content: string) {
    writeFileSync(path, content, 'utf-8');
    console.log(`✓ Created: ${path}`);
  }

  generateComponent(config: ComponentTemplate) {
    const { name, hasStyles = true, hasTests = false } = config;
    const componentPath = join(this.basePath, 'components', name);
    
    this.ensureDir(componentPath);
    
    // Create component file
    const componentFile = join(componentPath, `${name}.tsx`);
    this.writeFile(componentFile, componentTemplate(name));
    
    // Create styles if needed
    if (hasStyles) {
      const stylesPath = join(componentPath, 'styles');
      this.ensureDir(stylesPath);
      const styleFile = join(stylesPath, `${name}.module.css`);
      this.writeFile(styleFile, componentStyleTemplate(name));
    }
    
    // Create tests if needed
    if (hasTests) {
      const testFile = join(componentPath, `${name}.test.tsx`);
      this.writeFile(testFile, componentTestTemplate(name));
    }
    
    // Create index file
    const indexFile = join(componentPath, 'index.ts');
    this.writeFile(indexFile, componentIndexTemplate(name));
    
    console.log(`\n✨ Component "${name}" generated successfully!\n`);
  }

  generateHook(name: string, withTests = false) {
    const hookName = name.startsWith('use') ? name : `use${name}`;
    const hooksPath = join(this.basePath, 'hooks');
    
    this.ensureDir(hooksPath);
    
    // Create hook file
    const hookFile = join(hooksPath, `${hookName}.ts`);
    this.writeFile(hookFile, hookTemplate(name));
    
    // Create tests if needed
    if (withTests) {
      const testFile = join(hooksPath, `${hookName}.test.ts`);
      this.writeFile(testFile, hookTestTemplate(name));
    }
    
    console.log(`\n✨ Hook "${hookName}" generated successfully!\n`);
  }

  generateUtil(name: string, withTests = false) {
    const utilsPath = join(this.basePath, 'utils');
    
    this.ensureDir(utilsPath);
    
    // Create util file
    const utilFile = join(utilsPath, `${name}.ts`);
    this.writeFile(utilFile, utilTemplate(name));
    
    // Create tests if needed
    if (withTests) {
      const testFile = join(utilsPath, `${name}.test.ts`);
      this.writeFile(testFile, utilTestTemplate(name));
    }
    
    console.log(`\n✨ Utility "${name}" generated successfully!\n`);
  }

  initializeProject() {
    console.log('🚀 Initializing project structure...\n');
    
    // Create main src structure
    this.ensureDir(this.basePath);
    this.ensureDir(join(this.basePath, 'components'));
    this.ensureDir(join(this.basePath, 'styles'));
    this.ensureDir(join(this.basePath, 'hooks'));
    this.ensureDir(join(this.basePath, 'utils'));
    
    // Create App.tsx
    const appFile = join(this.basePath, 'App.tsx');
    if (!existsSync(appFile)) {
      this.writeFile(appFile, appTemplate());
    }
    
    // Create index.tsx
    const indexFile = join(this.basePath, 'index.tsx');
    if (!existsSync(indexFile)) {
      this.writeFile(indexFile, indexTemplate());
    }
    
    // Create global styles
    const globalStylesFile = join(this.basePath, 'styles', 'globals.css');
    if (!existsSync(globalStylesFile)) {
      this.writeFile(globalStylesFile, globalStylesTemplate());
    }
    
    // Create index.html in root
    const htmlFile = join('.', 'index.html');
    if (!existsSync(htmlFile)) {
      this.writeFile(htmlFile, indexHTMLTemplate());
    }
    
    // Create README files
    const componentsReadme = join(this.basePath, 'components', 'README.md');
    if (!existsSync(componentsReadme)) {
      this.writeFile(componentsReadme, componentFolderReadmeTemplate());
    }
    
    const stylesReadme = join(this.basePath, 'styles', 'README.md');
    if (!existsSync(stylesReadme)) {
      this.writeFile(stylesReadme, stylesFolderReadmeTemplate());
    }
    
    console.log('\n✨ Project structure initialized successfully!\n');
    console.log('📁 Created:');
    console.log('   - src/App.tsx');
    console.log('   - src/index.tsx');
    console.log('   - src/styles/globals.css');
    console.log('   - src/components/');
    console.log('   - src/hooks/');
    console.log('   - src/utils/');
    console.log('   - index.html');
    console.log('\n💡 Next steps:');
    console.log('   1. bun install (install dependencies)');
    console.log('   2. bun generate MyComponent (create components)');
    console.log('   3. bun dev (start development)\n');
  }
}
