# Contributing to VS Code Paste Image

Thank you for your interest in contributing to VS Code Paste Image! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project.

## How to Contribute

### Reporting Bugs

1. Ensure the bug was not already reported by searching [Issues](https://github.com/kjon-life/vscode-paste-image/issues)
2. If you're unable to find an open issue addressing the problem, open a new one using the bug report template

### Suggesting Features

1. Check existing issues to see if the feature has already been suggested
2. Open a new issue using the feature request template

### Contributing Code

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure they pass: `npm test`
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the extension: `npm run compile`
4. Run tests: `npm test`

## Testing

- Run unit tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Run tests with coverage: `npm run test:coverage`
- Run end-to-end tests: `npm run test:e2e`

## Style Guidelines

- Code is linted using ESLint: `npm run lint`
- Follow TypeScript best practices
- Write clear commit messages

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG.md with details of changes
3. The PR should work on all supported platforms (Windows, macOS, Linux)
4. Ensure all tests pass
5. Make sure your code is properly documented

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).