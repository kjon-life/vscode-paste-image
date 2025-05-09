# VS Code Paste Image v0.1.4

## Visual Enhancement Release

Improved visual appearance and formatting of the documents:

### Added
- Extension icon
- "Made with love" signature in README

### Documentation Improvements
- Modified markdown syntax display in documentation

# VS Code Paste Image v0.1.3

## CI and Coverage Reporting Release

This release focuses on improving the continuous integration and test coverage reporting:

### Added
- Codecov integration for test coverage reporting
- Improved GitHub Actions workflow configuration
- Updated badges in README.md for better project status visibility

### Technical Improvements
- Updated GitHub Actions to v4
- Configured Codecov for accurate coverage reporting
- Improved test coverage reporting and visualization

### Benefits
- Better visibility into test coverage
- More reliable CI pipeline
- Enhanced project quality metrics

# VS Code Paste Image v0.1.2

## Dependency Cleanup Release

This release focuses on optimizing the extension's dependency structure, enhancing security, and improving build stability.

### Changes

- Removed unnecessary dependencies (mocha, glob, test-electron)
- Updated core dependencies to latest compatible versions
- Fixed all security vulnerabilities in dependencies
- Cleaned up extraneous packages in node_modules
- Updated build and package scripts

### Technical Improvements

- Upgraded @types/node to v22
- Configured ESLint v8 with TypeScript ESLint v7 for compatibility
- Upgraded Vitest to v3.1.0
- Fixed package script to use npx for @vscode/vsce

### Benefits

- Smaller installation footprint
- Enhanced security for development and usage
- More stable build process
- Simplified dependency structure

# VS Code Paste Image v0.1.1

## Enhancement Release

This release updates the extension infrastructure and dependency management:

- Replaced `vsce` with `@vscode/vsce` for packaging
- Updated ESLint and related packages to latest versions
- Added dependency resolutions to address transitive dependencies
- Added comprehensive unit tests for all components
- Added test infrastructure for future integration and e2e tests

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