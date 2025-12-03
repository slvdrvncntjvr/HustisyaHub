export const componentTemplate = (name: string) => `import React from 'react';
import styles from './styles/${name}.module.css';

interface ${name}Props {
  // Add your props here
}

export const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div className={styles.container}>
      <h1>${name} Component</h1>
    </div>
  );
};
`;

export const componentStyleTemplate = (name: string) => `.container {
  padding: 1rem;
}

/* Add your ${name} styles here */
`;

export const componentTestTemplate = (name: string) => `import { describe, test, expect } from 'bun:test';
import { ${name} } from './${name}';

describe('${name}', () => {
  test('should render', () => {
    // Add your tests here
    expect(true).toBe(true);
  });
});
`;

export const componentIndexTemplate = (name: string) => `export { ${name} } from './${name}';
export type { ${name}Props } from './${name}';
`;
