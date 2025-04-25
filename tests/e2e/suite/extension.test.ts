import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Basic E2E Tests', () => {
  test('Extension should be present', () => {
    assert.ok(vscode.extensions.getExtension('vscode-paste-image'));
  });

  test('Should register the pasteImage command', async () => {
    // Get the list of all available commands
    const commands = await vscode.commands.getCommands();
    // Check if our command is in the list
    assert.ok(commands.includes('extension.pasteImage'));
  });
});