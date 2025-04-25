import * as vscode from 'vscode';

/**
 * Gets configuration values for the extension.
 * Currently, we don't have any configurable settings,
 * but this infrastructure is in place for future enhancements.
 */
export function getConfiguration() {
  const config = vscode.workspace.getConfiguration('pasteImage');
  
  return {
    // Example future settings:
    // - imageFormat: config.get<string>('imageFormat', 'png'),
    // - assetDirPath: config.get<string>('assetDirPath', 'assets/images'),
    // - defaultAltText: config.get<string>('defaultAltText', ''),
  };
}