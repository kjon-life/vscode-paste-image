import { describe, it, expect, vi, beforeEach } from 'vitest';

// Define the mocks before importing the extension
vi.mock('vscode', () => {
  return {
    window: {
      createOutputChannel: vi.fn().mockReturnValue({
        appendLine: vi.fn(),
        dispose: vi.fn(),
        show: vi.fn(),
        hide: vi.fn(),
        clear: vi.fn()
      }),
      showErrorMessage: vi.fn(),
      showInformationMessage: vi.fn().mockResolvedValue('Yes'),
      showWarningMessage: vi.fn().mockResolvedValue('Yes'),
      showInputBox: vi.fn().mockResolvedValue('test-input'),
      activeTextEditor: {
        document: {
          languageId: 'markdown',
          isUntitled: false,
          uri: {
            fsPath: '/test/path/document.md'
          }
        },
        selection: {
          active: { line: 10, character: 5 }
        },
        edit: vi.fn().mockResolvedValue(true)
      }
    },
    commands: {
      registerCommand: vi.fn().mockReturnValue({ dispose: vi.fn() })
    }
  };
});

vi.mock('fs/promises', () => ({
  writeFile: vi.fn().mockResolvedValue(undefined),
  access: vi.fn().mockRejectedValue({ code: 'ENOENT' })
}));

vi.mock('fs', () => ({
  existsSync: vi.fn().mockReturnValue(false),
  mkdirSync: vi.fn()
}));

vi.mock('../../src/clipboard', () => ({
  readImageFromClipboard: vi.fn().mockResolvedValue(Buffer.from('test-image-data'))
}));

// Import after mocks are defined
import * as vscode from 'vscode';
import { activate, deactivate } from '../../src/extension';

describe('Extension', () => {
  let context: { subscriptions: any[] };

  beforeEach(() => {
    vi.clearAllMocks();
    
    context = {
      subscriptions: []
    };
  });

  describe('activate', () => {
    it('should register the pasteImage command', () => {
      activate(context as any);

      expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
        'extension.pasteImage',
        expect.any(Function)
      );
      
      // Check that the output channel was created
      expect(vscode.window.createOutputChannel).toHaveBeenCalledWith('PasteImageExt');
      
      // Verify something was added to subscriptions
      expect(context.subscriptions.length).toBeGreaterThan(0);
    });
  });

  describe('deactivate', () => {
    it('should clean up resources on deactivation', () => {
      // Set up mock output channel
      const mockOutputChannel = {
        appendLine: vi.fn(),
        dispose: vi.fn()
      };
      
      // Override the mock implementation for this test
      vi.mocked(vscode.window.createOutputChannel).mockReturnValueOnce(mockOutputChannel as any);
      
      // First activate to create the output channel
      activate(context as any);
      
      // Then deactivate
      deactivate();
      
      // Verify that the outputChannel was disposed
      expect(mockOutputChannel.dispose).toHaveBeenCalled();
    });
  });
});