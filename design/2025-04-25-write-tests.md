# VSCode Paste Image: Test Architecture Design

**Date:** 2025-04-25
**Status:** Draft

## 1. Introduction

This document defines steps to create a comprehensive testing strategy for the VSCode Paste Image extension.

## 2. Current State of Testing

The extension currently had:
- A basic `tests/` directory with limited test coverage
- Some test mocks for VS Code and filesystem
- Tests using Vitest as the test runner
- Lack of comprehensive coverage across different test types (unit, integration, E2E)
- No clear test architecture or organization

## 3. Goals and Objectives

We will implement testing in a production ready architecture:
- Each file will have a related test_file w coverage for all extension functionality
- Establish a clear separation between unit, integration, and E2E tests
- Create reusable test utilities and mocks
- Ensure tests are maintainable and understandable and rational
- Support continuous integration workflows
- Catch regressions before they reach users

## 4. Testing Approach

### 4.1 Test Types

We will implement three distinct types of tests:

#### 4.1.1 Unit Tests
- Purpose: Test individual functions and classes in isolation
- Scope: Individual components with all dependencies mocked
- Example: Testing the `promptForFilename` function in isolation

#### 4.1.2 Integration Tests
- Purpose: Test interactions between multiple components
- Scope: Workflows spanning multiple modules with external dependencies mocked
- Example: Testing the image saving workflow without testing clipboard access

#### 4.1.3 End-to-End Tests
- Purpose: Test complete user workflows
- Scope: Full extension functionality with minimal mocking
- Example: Testing the entire flow from command activation to markdown insertion

### 4.2 Directory Structure

```
tests/
├── unit/
│   ├── clipboard.test.ts    # Tests for clipboard.ts functions
│   ├── extension.test.ts    # Tests for extension.ts components
│   └── settings.test.ts     # Tests for settings.ts functions
├── integration/
│   └── workflow.test.ts     # Tests for larger workflows with partial mocks
├── e2e/
│   └── extension.test.ts    # End-to-end tests for complete user scenarios
│   └── runTest.js           # VS Code E2E test runner
├── mocks/
│   ├── vscode.mock.ts       # VS Code API mocks
│   ├── fs.mock.ts           # File system mocks
│   └── clipboard.mock.ts    # Clipboard utility mocks
└── utils/
    └── test-helpers.ts      # Helper functions for tests
```

### 4.3 What to Test

#### 4.3.1 Unit Tests

**clipboard.ts**
- Platform detection logic
- Error handling for each platform implementation
- Successful image reading from clipboard (mocked)

**extension.ts**
- `promptForFilename` validation logic
- `promptForAltText` functionality
- `ensureDirExists` directory creation logic
- `saveImage` with various conditions:
  - New file creation
  - File overwrite scenarios
  - Error handling
- `insertMarkdownLink` formatting and insertion

**settings.ts**
- Configuration retrieval functionality

#### 4.3.2 Integration Tests

**Workflow Tests**
- Image saving workflow (with mocked clipboard)
- Markdown link insertion workflow
- Error handling across module boundaries
- User cancellation paths at different stages

#### 4.3.3 E2E Tests

**Complete Extension Tests**
- Command registration and activation
- Full workflow from activation to markdown insertion
- Editor integration
- Real-world scenarios:
  - Various markdown file states
  - Different cursor positions
  - With/without images in clipboard

### 4.4 Tools and Technologies

We will use the following testing tools:

- **Testing Framework**: Vitest
  - Fast execution
  - Modern features
  - Compatible with TypeScript
  - Already configured in the project

- **Mocking**: Vitest's built-in mocking utilities
  - `vi.mock()` for module mocking
  - `vi.fn()` for function mocking
  - `vi.spyOn()` for monitoring function calls

- **VS Code Testing**: @vscode/test-electron
  - Allows running tests in a real VS Code environment
  - Essential for E2E tests

- **Coverage**: @vitest/coverage-v8
  - Track test coverage
  - Identify untested code paths

### 4.5 Mocking Strategy

#### 4.5.1 VS Code API Mocking

Create a comprehensive mock for the VS Code API that:
- Simulates the behavior of core APIs (window, workspace, commands)
- Provides test hooks to control behavior
- Allows verification of interactions with the API

```typescript
// Example VS Code window mock
const window = {
  showErrorMessage: vi.fn(),
  showInformationMessage: vi.fn(),
  showInputBox: vi.fn(),
  createOutputChannel: vi.fn().mockReturnValue({
    appendLine: vi.fn(),
    dispose: vi.fn()
  }),
  activeTextEditor: null // Can be set in tests
};
```

#### 4.5.2 Filesystem Mocking

Mock the filesystem for isolated tests:
- Simulate file existence
- Check directory creation
- Verify file writing operations
- Test error conditions

```typescript
// Example filesystem mock
const fs = {
  promises: {
    writeFile: vi.fn(),
    readFile: vi.fn(),
    access: vi.fn(),
    unlink: vi.fn()
  },
  existsSync: vi.fn(),
  mkdirSync: vi.fn()
};
```

#### 4.5.3 Clipboard Mocking

This is the most challenging part, as it's platform-specific:
- Create mocks for each platform implementation
- Provide test fixtures (sample image data)
- Simulate error conditions

```typescript
// Example clipboard mock
const clipboardMock = {
  readImageFromClipboard: vi.fn().mockImplementation(() => {
    return Buffer.from('mock image data');
  })
};
```

## 5. Implementation Plan

### 5.1 Phase 1: Setup Test Infrastructure

1. Delete the current `tests/` directory
2. Create the new directory structure
3. Set up base mocks (VS Code, filesystem)
4. Configure test helpers and utilities

### 5.2 Phase 2: Implement Unit Tests

1. Create clipboard unit tests
2. Create extension component unit tests
3. Create settings unit tests
4. Verify coverage of core functions

### 5.3 Phase 3: Implement Integration Tests

1. Create workflow integration tests
2. Test error paths and edge cases
3. Verify cross-component interactions

### 5.4 Phase 4: Implement E2E Tests

1. Set up E2E test environment
2. Create E2E test scenarios
3. Test full extension functionality

### 5.5 Phase 5: CI Integration

1. Configure test runs in CI pipeline
2. Set up coverage reporting
3. Establish quality gates for pull requests

## 6. Detailed Test Cases

### 6.1 Unit Test Cases

#### 6.1.1 Clipboard Tests

- **Platform Detection**
  - Test correct function calling based on platform
  - Test unsupported platform error

- **macOS Implementation**
  - Test successful image reading
  - Test missing pngpaste utility error
  - Test empty clipboard behavior

- **Windows Implementation** (future)
  - Test placeholder for Windows implementation

- **Linux Implementation** (future)
  - Test placeholder for Linux implementation

#### 6.1.2 Extension Tests

- **Filename Validation**
  - Test empty filename rejection
  - Test invalid character rejection
  - Test valid filename acceptance

- **Alt Text Input**
  - Test successful alt text entry
  - Test user cancellation

- **Image Saving**
  - Test directory creation
  - Test file writing
  - Test overwrite confirmation
  - Test error handling

- **Markdown Link Insertion**
  - Test correct formatting
  - Test insertion at cursor position
  - Test error handling

#### 6.1.3 Settings Tests

- **Configuration Retrieval**
  - Test default settings
  - Test custom settings (future)

### 6.2 Integration Test Cases

- **Image Processing Workflow**
  - Test flow from image buffer to saved file
  - Test with various image types and sizes

- **User Interaction Workflow**
  - Test prompts and user responses
  - Test cancellation at different stages

- **Error Handling Across Boundaries**
  - Test propagation of errors between modules
  - Test recovery mechanisms

### 6.3 E2E Test Cases

- **Command Registration**
  - Test command availability
  - Test keybinding activation

- **Full Paste Workflow**
  - Test with image in clipboard
  - Test without image in clipboard
  - Test in non-markdown documents

- **Real Editor Integration**
  - Test with various cursor positions
  - Test with selections
  - Test with different file states

## 7. Timeline and Milestones

1. **Phase 1**: Set up test infrastructure and implement base mocks
2. **Phase 2**: Implement unit tests and achieve >80% unit test coverage
3. **Phase 3**: Implement integration tests
4. **Phase 4**: Implement E2E tests and CI integration
5. **Phase 5**: Test refinement, documentation, and finalization

## 8. Conclusion

The modular approach to testing will also make it easier to add new features and modify existing ones without introducing regressions. This investment in testing infrastructure will pay dividends as the extension evolves and grows in complexity.
