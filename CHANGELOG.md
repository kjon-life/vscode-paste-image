# Change Log

All notable changes to the "vscode-paste-image" extension will be documented in this file.

## [0.1.1] - 2025-05-10

### Changed
- Replaced `vsce` with `@vscode/vsce` for packaging
- Updated ESLint and related packages to latest versions
- Added dependency resolutions to address transitive dependencies

### Added
- Comprehensive unit tests for all components
- Test infrastructure for future integration and e2e tests
- Package script using `@vscode/vsce`

## [0.1.0] - 2025-04-25

### Added
- Initial release
- Command to paste clipboard images into Markdown files
- Auto-creation of assets/images directory
- Filename and alt-text prompts
- Markdown link insertion at cursor position
- Keybinding (fn+f5) for quick access
- Cross-platform support
