import { beforeEach, afterEach, describe, it, expect, vi, SpyInstance } from 'vitest';
import * as path from 'path';
import { vscode, MockFactory } from './mocks/vscode.mock';
import { electron, useEmptyClipboard, useClipboardWithImage, resetElectronMocks } from './mocks/electron.mock';
import { fs, resetFileSystem, markPathAsExisting } from './mocks/fs.mock';

// Mock the VS Code module
vi.mock('vscode', () => vscode);

// Mock Node.js modules
vi.mock('fs/promises', () => fs.promises);
vi.mock('fs', () => fs);
vi.mock('path', () => {
  return {
    ...vi.importActual('path'),
    join: (...parts: string[]) => parts.join('/'),
    dirname: (p: string) => p.substring(0, p.lastIndexOf('/')),
  };
});

// Mock the electron module to use our mock
vi.mock('electron', () => electron);

// Import our extension after setting up mocks
let activateFn: Function;
let deactivateFn: Function;

describe('Paste Image Extension', () => {
  // Set up spies for mocked require
  let requireSpy: SpyInstance;

  beforeEach(async () => {
    // Reset all mocks before each test
    MockFactory.resetAllStubs();
    resetElectronMocks();
    resetFileSystem();
    useClipboardWithImage();

    // Create spy for require function to intercept and mock 'electron'
    requireSpy = vi.spyOn(globalThis, 'require').mockImplementation((id: string) => {
      if (id === 'electron') {
        return electron;
      }
      // Allow actual require for other modules
      return vi.importActual(id);
    });

    // Import the extension module
    const extension = await import('../src/extension');
    activateFn = extension.activate;
    deactivateFn = extension.deactivate;
  });

  afterEach(() => {
    // Clean up after each test
    requireSpy.mockRestore();
  });

  it('should register the paste image command when activated', () => {
    // Create a mock extension context
    const context = new vscode.ExtensionContext();
    
    // Activate the extension
    activateFn(context);
    
    // Verify the command was registered
    expect(vscode.commands.registerCommand).toHaveBeenCalled();
    expect(vscode.commands.registerCommand.firstCall.args[0]).toBe('extension.pasteImage');
  });

  it('should show error when no active editor', async () => {
    // Set up with no active editor
    vscode.window.activeTextEditor = null;
    
    // Create context and activate
    const context = new vscode.ExtensionContext();
    activateFn(context);
    
    // Get the command function
    const commandFn = vscode.commands.registerCommand.firstCall.args[1];
    
    // Execute the command function
    await commandFn();
    
    // Verify error message was shown
    expect(vscode.window.showErrorMessage).toHaveBeenCalled();
    expect(vscode.window.showErrorMessage.firstCall.args[0]).toContain('No active editor');
  });

  it('should show error when active file is not markdown', async () => {
    // Set up editor with non-markdown file
    MockFactory.setupActiveEditor({
      document: new vscode.TextDocument({ languageId: 'javascript' })
    });
    
    // Create context and activate
    const context = new vscode.ExtensionContext();
    activateFn(context);
    
    // Get the command function
    const commandFn = vscode.commands.registerCommand.firstCall.args[1];
    
    // Execute the command function
    await commandFn();
    
    // Verify error message was shown
    expect(vscode.window.showErrorMessage).toHaveBeenCalled();
    expect(vscode.window.showErrorMessage.firstCall.args[0]).toContain('not a Markdown file');
  });

  it('should show error when no image in clipboard', async () => {
    // Set up a markdown editor
    MockFactory.setupActiveEditor();
    
    // Use empty clipboard
    useEmptyClipboard();
    
    // Create context and activate
    const context = new vscode.ExtensionContext();
    activateFn(context);
    
    // Get the command function
    const commandFn = vscode.commands.registerCommand.firstCall.args[1];
    
    // Execute the command function
    await commandFn();
    
    // Verify error message was shown
    expect(vscode.window.showErrorMessage).toHaveBeenCalled();
    expect(vscode.window.showErrorMessage.firstCall.args[0]).toContain('No image found in clipboard');
  });

  it('should handle workflow correctly when image is in clipboard', async () => {
    // Set up editor with markdown file
    const editor = MockFactory.setupActiveEditor({
      document: new vscode.TextDocument({
        uri: { fsPath: '/test/path/document.md' },
        languageId: 'markdown',
        isUntitled: false
      })
    });
    
    // Set up input responses
    vscode.window.showInputBox.onFirstCall().resolves('test-image');
    vscode.window.showInputBox.onSecondCall().resolves('Test image description');
    
    // Create context and activate
    const context = new vscode.ExtensionContext();
    activateFn(context);
    
    // Get the command function
    const commandFn = vscode.commands.registerCommand.firstCall.args[1];
    
    // Execute the command function
    await commandFn();
    
    // Verify directory creation
    expect(fs.mkdirSync).toHaveBeenCalled();
    
    // Verify image was saved
    expect(fs.promises.writeFile).toHaveBeenCalled();
    expect(fs.promises.writeFile.firstCall.args[0]).toContain('test-image.png');
    
    // Verify markdown link was inserted
    expect(editor.edit).toHaveBeenCalled();
    
    // Verify success message
    expect(vscode.window.showInformationMessage).toHaveBeenCalled();
    expect(vscode.window.showInformationMessage.firstCall.args[0]).toContain('test-image.png');
  });

  it('should handle file overwrite confirmation', async () => {
    // Set up editor with markdown file
    MockFactory.setupActiveEditor();
    
    // Set up input responses
    vscode.window.showInputBox.onFirstCall().resolves('test-image');
    vscode.window.showInputBox.onSecondCall().resolves('Test image description');
    
    // Set up file already exists
    markPathAsExisting('/test/path/assets/images/test-image.png');
    
    // Set up overwrite confirmation (Yes)
    vscode.window.showWarningMessage.resolves('Yes');
    
    // Create context and activate
    const context = new vscode.ExtensionContext();
    activateFn(context);
    
    // Get the command function
    const commandFn = vscode.commands.registerCommand.firstCall.args[1];
    
    // Execute the command function
    await commandFn();
    
    // Verify warning was shown
    expect(vscode.window.showWarningMessage).toHaveBeenCalled();
    
    // Verify image was still saved
    expect(fs.promises.writeFile).toHaveBeenCalled();
  });

  it('should cancel when user rejects overwrite', async () => {
    // Set up editor with markdown file
    MockFactory.setupActiveEditor();
    
    // Set up input responses
    vscode.window.showInputBox.onFirstCall().resolves('test-image');
    vscode.window.showInputBox.onSecondCall().resolves('Test image description');
    
    // Set up file already exists
    markPathAsExisting('/test/path/assets/images/test-image.png');
    
    // Set up overwrite confirmation (No)
    vscode.window.showWarningMessage.resolves('No');
    
    // Create context and activate
    const context = new vscode.ExtensionContext();
    activateFn(context);
    
    // Get the command function
    const commandFn = vscode.commands.registerCommand.firstCall.args[1];
    
    // Execute the command function
    await commandFn();
    
    // Verify warning was shown
    expect(vscode.window.showWarningMessage).toHaveBeenCalled();
    
    // Verify error message was shown
    expect(vscode.window.showErrorMessage).toHaveBeenCalled();
    expect(vscode.window.showErrorMessage.firstCall.args[0]).toContain('file already exists');
  });

  it('should properly clean up on deactivation', () => {
    // Set up OutputChannel mock
    const outputChannel = {
      appendLine: vi.fn(),
      dispose: vi.fn()
    };
    vscode.window.createOutputChannel.returns(outputChannel);
    
    // Create context and activate
    const context = new vscode.ExtensionContext();
    activateFn(context);
    
    // Call deactivate
    deactivateFn();
    
    // Verify outputChannel was disposed
    expect(outputChannel.dispose).toHaveBeenCalled();
  });
});