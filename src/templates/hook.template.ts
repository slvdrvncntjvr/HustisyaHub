export const hookTemplate = (name: string) => {
  const hookName = name.startsWith('use') ? name : `use${name}`;
  
  return `import { useState, useEffect } from 'react';

export const ${hookName} = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Add your hook logic here
  }, []);

  return { state };
};
`;
};

export const hookTestTemplate = (name: string) => {
  const hookName = name.startsWith('use') ? name : `use${name}`;
  
  return `import { describe, test, expect } from 'bun:test';
import { ${hookName} } from './${hookName}';

describe('${hookName}', () => {
  test('should work correctly', () => {
    // Add your tests here
    expect(true).toBe(true);
  });
});
`;
};
