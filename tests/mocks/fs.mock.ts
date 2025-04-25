import * as sinon from 'sinon';
import { EventEmitter } from 'events';

// Mock file system paths that exist
const existingPaths = new Set<string>();

// Mock file system
export const fs = {
  promises: {
    writeFile: sinon.stub().resolves(),
    readFile: sinon.stub().resolves(Buffer.from('mock file content')),
    access: sinon.stub().callsFake(async (path) => {
      if (!existingPaths.has(path)) {
        const error: NodeJS.ErrnoException = new Error(`ENOENT: no such file or directory, access '${path}'`);
        error.code = 'ENOENT';
        throw error;
      }
    }),
    mkdir: sinon.stub().callsFake((path, options) => {
      existingPaths.add(path);
      return Promise.resolve();
    }),
  },
  existsSync: sinon.stub().callsFake((path) => existingPaths.has(path as string)),
  mkdirSync: sinon.stub().callsFake((path, options) => {
    existingPaths.add(path as string);
  }),
  createReadStream: sinon.stub().returns(new EventEmitter()),
  createWriteStream: sinon.stub().returns(new EventEmitter()),
};

// Helper to mark a path as existing
export const markPathAsExisting = (path: string) => {
  existingPaths.add(path);
};

// Helper to mark a path as not existing
export const markPathAsNotExisting = (path: string) => {
  existingPaths.delete(path);
};

// Reset the mock filesystem state
export const resetFileSystem = () => {
  existingPaths.clear();
  fs.promises.writeFile.reset();
  fs.promises.readFile.reset();
  fs.promises.access.reset();
  fs.promises.mkdir.reset();
  fs.existsSync.reset();
  fs.mkdirSync.reset();
};