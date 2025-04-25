import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

// OutputChannel for logging
let outputChannel: vscode.OutputChannel;

/**
 * This method is called when the extension is activated.
 * It registers commands and initializes the logging.
 */
export function activate(context: vscode.ExtensionContext) {
  // Create output channel for logging
  outputChannel = vscode.window.createOutputChannel('PasteImageExt');
  outputChannel.appendLine('Paste Image extension is now active!');

  // Register the command to paste an image
  let disposable = vscode.commands.registerCommand('extension.pasteImage', async () => {
    try {
      await pasteImage();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      outputChannel.appendLine(`Error: ${errorMessage}`);
      vscode.window.showErrorMessage(`Failed to paste image: ${errorMessage}`);
    }
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(outputChannel);
  outputChannel.appendLine('Command registered: extension.pasteImage');
}

/**
 * Main function that handles the image pasting workflow.
 * 1. Validates the active editor
 * 2. Gets image from clipboard
 * 3. Prompts for filename and alt text
 * 4. Saves the image to disk
 * 5. Inserts markdown link
 */
async function pasteImage() {
  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw new Error('No active editor found');
  }

  // Check if the active file is Markdown
  if (editor.document.languageId !== 'markdown') {
    throw new Error('Active file is not a Markdown file');
  }

  // Verify the document is saved
  if (editor.document.isUntitled) {
    throw new Error('Please save the document before pasting an image');
  }

  outputChannel.appendLine('Checking clipboard for image...');
  // Get image from clipboard using Electron API
  let nativeImage, clipboard;
  try {
    const electron = require('electron');
    nativeImage = electron.nativeImage;
    clipboard = electron.clipboard;
  } catch (error) {
    outputChannel.appendLine(`Error loading Electron APIs: ${error}`);
    throw new Error('Failed to access clipboard. Electron APIs not available.');
  }
  
  const image = clipboard.readImage();
  if (image.isEmpty()) {
    throw new Error('No image found in clipboard');
  }
  outputChannel.appendLine('Image found in clipboard');

  // Get filename from user with validation
  const filename = await promptForFilename();
  if (!filename) {
    return; // User cancelled
  }

  // Get alt text from user
  const altText = await promptForAltText();
  if (altText === undefined) {
    return; // User cancelled
  }

  // Process and save the image
  const savedImagePath = await saveImage(editor, filename, image);

  // Insert markdown link
  await insertMarkdownLink(editor, altText, savedImagePath);

  vscode.window.showInformationMessage(`Image saved and linked as ${filename}.png`);
}

/**
 * Prompts the user for a filename, with validation.
 * @returns The filename or undefined if cancelled
 */
async function promptForFilename(): Promise<string | undefined> {
  const filename = await vscode.window.showInputBox({
    prompt: 'Enter image filename (without extension)',
    placeHolder: 'image-name',
    validateInput: (value: string) => {
      if (!value) {
        return 'Filename cannot be empty';
      }
      
      if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
        return 'Filename can only contain letters, numbers, hyphens and underscores';
      }
      
      return null; // validation passed
    }
  });
  
  if (!filename) {
    outputChannel.appendLine('User cancelled filename input');
    return undefined;
  }
  
  outputChannel.appendLine(`Filename entered: ${filename}`);
  return filename;
}

/**
 * Prompts the user for alt text.
 * @returns The alt text or undefined if cancelled
 */
async function promptForAltText(): Promise<string | undefined> {
  const altText = await vscode.window.showInputBox({
    prompt: 'Enter image alt text',
    placeHolder: 'Image description'
  });
  
  if (altText === undefined) {
    outputChannel.appendLine('User cancelled alt text input');
    return undefined;
  }
  
  outputChannel.appendLine(`Alt text entered: ${altText}`);
  return altText;
}

/**
 * Saves the image to disk in the assets/images folder.
 * @param editor The active text editor
 * @param filename The filename to use (without extension)
 * @param image The native image object
 * @returns The relative path to use in markdown
 */
async function saveImage(editor: vscode.TextEditor, filename: string, image: any): Promise<string> {
  // Get current document's directory path
  const mdFile = editor.document.uri.fsPath;
  const mdDir = path.dirname(mdFile);
  
  // Create assets/images directory if it doesn't exist
  const assetsDir = path.join(mdDir, 'assets', 'images');
  await ensureDirExists(assetsDir);
  outputChannel.appendLine(`Assets directory ensured: ${assetsDir}`);

  // Construct the image file path
  const imagePath = path.join(assetsDir, `${filename}.png`);
  outputChannel.appendLine(`Image will be saved to: ${imagePath}`);

  // Check if file already exists
  try {
    await fs.access(imagePath);
    // If we get here, file exists
    const overwrite = await vscode.window.showWarningMessage(
      `File ${filename}.png already exists. Overwrite?`,
      'Yes',
      'No'
    );
    
    if (overwrite !== 'Yes') {
      throw new Error('Operation cancelled: file already exists');
    }
  } catch (error) {
    // File doesn't exist, which is fine
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error; // Re-throw if it's a different error
    }
  }

  // Save image to file
  try {
    const pngData = image.toPNG();
    await fs.writeFile(imagePath, pngData);
    outputChannel.appendLine('Image saved successfully');
  } catch (error) {
    outputChannel.appendLine(`Error saving image: ${error}`);
    throw new Error(`Failed to save image: ${error}`);
  }

  // Normalize path for Markdown (always use forward slashes)
  return path.join('assets', 'images', `${filename}.png`).replace(/\\/g, '/');
}

/**
 * Inserts a markdown image link at the cursor position.
 * @param editor The active text editor
 * @param altText Alt text for the image
 * @param relativePath Relative path to the image
 */
async function insertMarkdownLink(editor: vscode.TextEditor, altText: string, relativePath: string): Promise<void> {
  const markdownLink = `![${altText}](${relativePath})`;
  
  // Insert the Markdown link at cursor position
  const success = await editor.edit(editBuilder => {
    editBuilder.insert(editor.selection.active, markdownLink);
  });
  
  if (!success) {
    throw new Error('Failed to insert markdown link into document');
  }
  
  outputChannel.appendLine(`Markdown link inserted: ${markdownLink}`);
}

/**
 * Helper function to ensure a directory exists.
 * @param dirPath Directory path to create
 */
async function ensureDirExists(dirPath: string): Promise<void> {
  if (!existsSync(dirPath)) {
    outputChannel.appendLine(`Creating directory: ${dirPath}`);
    try {
      mkdirSync(dirPath, { recursive: true });
    } catch (error) {
      outputChannel.appendLine(`Error creating directory: ${error}`);
      throw new Error(`Failed to create directory: ${error}`);
    }
  }
}

/**
 * This method is called when the extension is deactivated.
 */
export function deactivate() {
  if (outputChannel) {
    outputChannel.appendLine('Paste Image extension is now deactivated');
    outputChannel.dispose();
  }
}