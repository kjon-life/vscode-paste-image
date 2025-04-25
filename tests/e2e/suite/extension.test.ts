import { describe, test, expect } from 'vitest';
import * as vscode from 'vscode';

describe('Extension Basic E2E Tests', () => {
  test('Extension should be present', () => {
    expect(vscode.extensions.getExtension('vscode-paste-image')).toBeTruthy();
  });

  test('Should register the pasteImage command', async () => {
    // Get the list of all available commands
    const commands = await vscode.commands.getCommands();
    // Check if our command is in the list
    expect(commands).toContain('extension.pasteImage');
  });
});