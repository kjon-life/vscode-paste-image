# VS Code Paste Image Extension

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/kjon-life.vscode-paste-image)](https://marketplace.visualstudio.com/items?itemName=kjon-life.vscode-paste-image)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/kjon-life.vscode-paste-image)](https://marketplace.visualstudio.com/items?itemName=kjon-life.vscode-paste-image)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/kjon-life.vscode-paste-image)](https://marketplace.visualstudio.com/items?itemName=kjon-life.vscode-paste-image)
[![Test Coverage](https://img.shields.io/codecov/c/github/kjon-life/vscode-paste-image)](https://codecov.io/gh/kjon-life/vscode-paste-image)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kjon-life/vscode-paste-image/ci.yml?branch=main)](https://github.com/kjon-life/vscode-paste-image/actions)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=visual-studio-code&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/kjon-life/vscode-paste-image)](https://github.com/kjon-life/vscode-paste-image/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/kjon-life/vscode-paste-image)](https://github.com/kjon-life/vscode-paste-image/issues)

A lightweight extension that enables pasting clipboard images directly into Markdown files with zero third-party dependencies. Works across all VS Code flavors including VS Code, Codium, and Cursor.

## Features

- **Zero Dependencies**: Uses only built-in VS Code and Electron APIs
- **Fast Workflow**: Sub-1 second operation from paste to insert
- **Cross-Platform**: Works on macOS, Windows, and Linux
- **Editor Compatibility**: Compatible with VS Code, Codium, and Cursor
- **Simple UX**: Just two prompts (filename and alt-text) for complete operation

## How It Works

1. Capture image data from the OS clipboard via Electron's `nativeImage` API
2. Prompt user for a filename (no extension) and alt-text
3. Create (if missing) an `assets/images/` folder alongside the current Markdown file
4. Save the clipboard image as PNG in that folder
5. Insert a Markdown image link (`![alt-text](assets/images/name.png)`) at the cursor

## Usage

1. Copy an image to your clipboard:
   - Take a screenshot
   - Copy an image from another application
   - Use your OS screenshot tool (e.g., ⌘+Shift+4 on macOS, Win+Shift+S on Windows)

2. In a Markdown file, either:
   - Press the default keybinding `Fn+F5` 
   - Use the command palette (Ctrl/Cmd+Shift+P) and search for `Paste Image and Insert Markdown Link`

3. Enter a filename when prompted (without extension)

4. Enter alt-text when prompted (for accessibility)

5. The image will be:
   - Saved as a PNG in the `assets/images/` directory (created if it doesn't exist)
   - Linked automatically at your cursor position with proper Markdown syntax

## Installation

### From VSIX File

1. Download the `.vsix` file from the [Releases](https://github.com/kjon-life/vscode-paste-image/releases/latest) page
2. In VS Code, go to Extensions view (Ctrl/Cmd+Shift+X)
3. Click the `...` menu (top-right) and select `Install from VSIX...`
4. Locate and select the downloaded `.vsix` file

### From Source

1. Clone the repository
2. Run `npm install` (or your preferred package manager)
3. Run `npm run package` to build the VSIX file
4. Install the VSIX as described above

## Requirements

- VS Code 1.80.0 or higher (or compatible editor)

## Extension Settings

This extension currently has no configurable settings, but future versions may include:

- Custom image format options (PNG, JPG, WebP)
- Custom asset directory path
- Default alt-text templates
- Image resize options

## Troubleshooting

### No Image in Clipboard

If you receive an error stating "No image found in clipboard", make sure:
1. You've copied an actual image, not just text or a file
2. Your clipboard contains a valid image format
3. Try copying the image again from the source

### Permission Issues

If the extension fails to save the image, check:
1. You have write permissions to the directory
2. The path doesn't contain special characters that might cause issues

## Development

1. Clone the repository
2. Run `npm install`
3. Open the project in VS Code
4. Press F5 to start debugging in Extension Development Host

### Running Tests

The project includes comprehensive unit tests for all components:

```bash
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Building

To build the VSIX package:

```bash
npm run package
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT