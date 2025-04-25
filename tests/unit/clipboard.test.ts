import { describe, it, expect, vi, beforeEach } from 'vitest';
import { platform } from 'os';
import * as fs from 'fs/promises';
import { readImageFromClipboard } from '../../src/clipboard';

// Mock the necessary modules
vi.mock('os', () => {
  return {
    platform: vi.fn()
  };
});

vi.mock('child_process', () => ({
  execFile: vi.fn()
}));

vi.mock('util', () => ({
  promisify: vi.fn().mockImplementation((fn) => {
    return (...args: any[]) => {
      const lastArg = args[args.length - 1];
      if (typeof lastArg === 'function') {
        const callback = lastArg;
        return new Promise((resolve, reject) => {
          fn(...args.slice(0, -1), (err: any, result: any) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
      return Promise.resolve();
    };
  })
}));

vi.mock('fs/promises', () => ({
  readFile: vi.fn().mockResolvedValue(Buffer.from('mock-image-data')),
  unlink: vi.fn().mockResolvedValue(undefined)
}));

describe('Clipboard Module', () => {
  const mockImageBuffer = Buffer.from('mock-image-data');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('readImageFromClipboard', () => {
    it('should throw an error for unsupported OS', async () => {
      // Setup
      vi.mocked(platform).mockReturnValue('freebsd');
      
      // Execute and verify
      await expect(readImageFromClipboard()).rejects.toThrow('Unsupported operating system');
    });

    describe('MacOS support', () => {
      beforeEach(() => {
        vi.mocked(platform).mockReturnValue('darwin');
      });

      it('should use pngpaste on macOS and return the image buffer', async () => {
        // Execute
        const result = await readImageFromClipboard();
        
        // Verify
        expect(platform).toHaveBeenCalled();
        expect(fs.readFile).toHaveBeenCalledWith('/tmp/vscode-paste-image-temp.png');
        expect(fs.unlink).toHaveBeenCalledWith('/tmp/vscode-paste-image-temp.png');
        expect(result).toEqual(mockImageBuffer);
      });
    });

    describe('Windows support', () => {
      beforeEach(() => {
        vi.mocked(platform).mockReturnValue('win32');
      });

      it('should throw a not implemented error for Windows', async () => {
        await expect(readImageFromClipboard()).rejects.toThrow('Windows support not yet implemented');
      });
    });

    describe('Linux support', () => {
      beforeEach(() => {
        vi.mocked(platform).mockReturnValue('linux');
      });

      it('should throw a not implemented error for Linux', async () => {
        await expect(readImageFromClipboard()).rejects.toThrow('Linux support not yet implemented');
      });
    });
  });
});