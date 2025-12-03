export const utilTemplate = (name: string) => `/**
 * ${name} utility functions
 */

export const ${name} = () => {
  // Add your utility logic here
};
`;

export const utilTestTemplate = (name: string) => `import { describe, test, expect } from 'bun:test';
import { ${name} } from './${name}';

describe('${name}', () => {
  test('should work correctly', () => {
    // Add your tests here
    expect(true).toBe(true);
  });
});
`;
