# VS Code Paste Image v0.1.0

## Initial Release

This is the first release of the VS Code Paste Image extension, which allows you to easily paste images from your clipboard directly into Markdown files.

### Features

- Paste images from clipboard directly into Markdown documents
- Automatically saves images to an assets folder
- Creates Markdown image links with alt text
- Works across platforms (Windows, macOS, Linux)
- Compatible with VS Code, Codium, and Cursor
- Zero third-party dependencies for a lightweight experience

### Installation

1. Download the `.vsix` file from this release
2. In VS Code, go to Extensions (Ctrl+Shift+X)
3. Click the `...` menu in the top-right of the Extensions panel
4. Select `Install from VSIX...`
5. Choose the downloaded file

### Usage

1. Copy an image to your clipboard
2. In a Markdown file, use command `Paste Image and Insert Markdown Link` (Fn+F5)
3. Enter a filename and alt text when prompted
4. The image will be saved and linked automatically

### Known Issues

- There are some npm warnings about deprecated dependencies that will be addressed in future updates
- See full list of known issues in the GitHub repository

### Feedback

Please report any bugs or feature requests on the [GitHub issues page](https://github.com/kjon-life/vscode-paste-image/issues).