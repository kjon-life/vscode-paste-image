# Change Log

All notable changes to the "vscode-paste-image" extension will be documented in this file.

## [0.1.3] - 2025-04-26

### Added
- Improved CI workflow configuration
- Added Codecov integration for test coverage reporting
- Updated badges in README.md

### Changed
- Updated GitHub Actions workflow to use latest versions
- Configured Codecov for better test coverage visibility

## [0.1.2] - 2025-04-26

### Changed
- Removed unused dependencies (@vscode/test-electron, @vitest/coverage-v8, mocha, and others)
- Updated dependencies (@types/node to v22, TypeScript ESLint packages to v7, Vitest to v3)
- Fixed security vulnerabilities in dependencies
- Cleaned up extraneous packages
- Ensured compatibility between ESLint and TypeScript ESLint packages

### Improved
- Dependency resolution and management
- Build process stability
- Test coverage configuration

## [0.1.1] - 2025-04-25

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
