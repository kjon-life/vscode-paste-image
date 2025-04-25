import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';
import { getConfiguration } from '../../src/settings';

// Mock the vscode namespace
vi.mock('vscode', () => {
  return {
    workspace: {
      getConfiguration: vi.fn().mockReturnValue({
        get: vi.fn().mockImplementation((key: string, defaultValue: any) => defaultValue)
      })
    }
  };
});

describe('Settings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get configuration from vscode workspace', () => {
    getConfiguration();
    expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('pasteImage');
  });

  it('should return an empty object currently (as we have no configurable settings yet)', () => {
    const config = getConfiguration();
    expect(config).toEqual({});
  });
});