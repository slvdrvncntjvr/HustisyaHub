export interface TemplateConfig {
  name: string;
  type: 'component' | 'page' | 'hook' | 'util';
  path: string;
}

export interface ComponentTemplate {
  name: string;
  hasStyles?: boolean;
  hasTests?: boolean;
  typescript?: boolean;
}
