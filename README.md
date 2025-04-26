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

A VS Code extension to paste clipboard images directly into Markdown files. Currently fully supported on macOS Sequoia, with Windows and Linux support under development.

## Features

- **Smart Asset Management**: Automatically creates and manages `assets/images` folders
- **Accessibility Focus**: Prompts for descriptive alt text
- **Fast Workflow**: Quick paste-to-markdown workflow
- **Local Storage**: Saves images as PNGs in your project structure
- **Detailed Logging**: Built-in logging for troubleshooting

## How It Works

1. Capture image data from the OS clipboard via Electron's `nativeImage` API
2. Prompt user for a filename (no extension) and alt-text
3. Create (if missing) an `assets/images/` folder alongside the current Markdown file
4. Save the clipboard image as PNG in that folder
5. Insert a Markdown image link (`![alt-text](assets/images/name.png)`) at the cursor


### From VSIX File

1. Download the `.vsix` file from the [Releases](https://github.com/kjon-life/vscode-paste-image/releases/latest) page
2. In VS Code, go to Extensions view (Ctrl/Cmd+Shift+X)
3. Click the `...` menu (top-right) and select `Install from VSIX...`
4. Locate and select the downloaded `.vsix` file

### From Source
On macOS
```bash
brew install pngpaste
```
1. Clone the repository
2. Run `npm install` (or your preferred package manager)
3. Run `npm run package` to build the VSIX file
4. Install the VSIX as described above

## Requirements

- VS Code 1.80.0 or higher (or compatible editor)

## Usage

1. Copy an image to your clipboard:
   - Take a screenshot (`Cmd+Shift+4` on macOS)
   - Copy an image from any application

2. In a Markdown file:
   - Press `Cmd+Alt+V` (macOS)
   - Or use command palette (`Cmd+Shift+P`): "Paste Image and Insert Markdown Link"

3. When prompted:
   - Enter a filename (alphanumeric, hyphens, underscores)
   - Provide alt text for accessibility

4. The extension will:
   - Create `assets/images` if needed
   - Save the image as PNG
   - Insert a Markdown link at your cursor:
     ```markdown
     ![Your alt text](assets/images/your-filename.png)
     ```

## Technical Details

### Project Structure
```
src/
  ├── extension.ts   # Main extension logic
  └── clipboard.ts   # Platform-specific clipboard handling
```

### Tech Stack
- TypeScript
- VS Code Extension API
- Vitest for testing
- Platform utilities (pngpaste)

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Open in VS Code
4. Press F5 to start debugging

### Running Tests

The project includes unit, integration, and E2E tests:

```bash
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

Current test coverage:
- Overall: 19.47% statement coverage
- clipboard.ts: 86.84%
- settings.ts: 100%
- extension.ts: 12.73% (in progress)

### Building

```bash
npm run package
```

## Known Limitations

- Full functionality currently on macOS only
- PNG format only
- Single image paste at a time
- Document must be saved before pasting
- Filenames limited to alphanumeric, hyphens, underscores

## Troubleshooting

### No Image Found
If you get "No image found in clipboard":
1. Verify you've copied an image
2. Try copying again
3. Check if `pngpaste` is installed (macOS)

### Permission Issues
If image saving fails:
1. Check write permissions
2. Ensure document is saved
3. Verify `assets/images` isn't write-protected

## Contributing

Active areas for contribution:
- Windows implementation
- Linux implementation
- Additional image format support
- Test coverage improvements

## License

MIT
