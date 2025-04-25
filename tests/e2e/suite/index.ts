import * as path from 'path';

export function run(): Promise<void> {
  return new Promise((resolve, reject) => {
    import('vitest/node').then(async ({ startVitest }) => {
      try {
        const testsRoot = path.resolve(__dirname, '..');
        
        await startVitest('test', [], {
          root: testsRoot,
          mode: 'test',
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}