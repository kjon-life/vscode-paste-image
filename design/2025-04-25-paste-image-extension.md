# Paste Image VS Code Extension Design Document

## Current Context
- Authors writing Markdown must manually save clipboard images to disk and insert links by hand.
- Existing marketplace extensions may be heavy or unavailable in secondary editors (Codium, Cursor).
- We need a zero–3rd-party solution that works out of the box in any VS Code flavor.

## Requirements

### Functional Requirements
- Command `Paste Image and Insert Markdown Link` available in any workspace.
- Grab image data from the OS clipboard via Electron's `nativeImage` API.
- Prompt user for a filename (no extension) and alt-text.
- Create (if missing) an `assets/images/` folder alongside the current Markdown file.
- Save the clipboard image as PNG in that folder.
- Insert a Markdown image link (`![alt-text](assets/images/name.png)`) at the cursor.

### Non-Functional Requirements
- Cross-platform support: macOS, Windows, Linux.
- Editor compatibility: VS Code, Codium, Cursor.
- Minimal footprint: no external dependencies beyond VS Code API and Node/Electron.
- Fast, synchronous UX (sub–1s for prompt→save→insert).
- Respect user keybindings (e.g. bind to Fn+F5 on macOS).
- Skip compiling/declarations errors in node_modules (`skipLibCheck`).

## Design Decisions

### 1. Extension vs. External Script
Will build as a first-class VS Code extension because:
- Leverages VS Code's native command palette and API.
- No external processes or watchers needed.
- Easy packaging (`vsce package`) and cross-editor install.

### 2. Clipboard Access via Electron
Will use `nativeImage.createFromClipboard()`:
- Built into the VS Code extension host (Electron).
- No need for CLI tools or third-party native bindings.

### 3. Filesystem Layout
- `assets/images/` relative to the Markdown file's directory.
- Ensures images stay adjacent to docs, in version control.
- Uses `fs.mkdir(..., { recursive: true })` to handle missing folders.

## Technical Design

### 1. Core Components
```typescript
// src/extension.ts
export function activate(ctx: ExtensionContext) { ... }
```
- Register `extension.pasteImage` command
- Use VS Code APIs: `window.showInputBox`, `workspace.fs`, `commands.registerCommand`
- Use Electron API: `nativeImage` for clipboard image

### 2. Path Resolution
- `const mdDir = path.dirname(document.uri.fsPath)`
- `const assetsDir = path.join(mdDir, 'assets', 'images')`
- Normalize with `.replace(/\\/g, '/')` for Markdown link.

### 3. User Interaction
- Two sequential prompts: filename, then alt-text.
- Cancel handling on empty input.
- Show error messages via `window.showErrorMessage`.

### 4. Packaging
- Add `vsce` devDependency.
- Script: `uv run vsce package` → produces `*.vsix`.
- Install globally via `code --install-extension file.vsix`.
- Keybinding suggestions in `package.json`:
```json
"contributes": {
  "keybindings": [{
    "command": "extension.pasteImage",
    "key": "fn+f5",
    "when": "editorTextFocus && editorLangId == markdown"
  }]
}
```

## Implementation Plan

1. Phase 1: Scaffold & Bootstrap
   - Initialize TS project (`uv init`), add `@types/vscode`, `@types/electron`.
   - Configure `tsconfig.json` with `skipLibCheck`.
   - Write basic `activate` stub and compile.

2. Phase 2: Command Logic
   - Implement clipboard capture and prompts.
   - Write file-system logic to save PNG.
   - Insert Markdown link and test in Extension Host.

3. Phase 3: Packaging & Keybinding
   - Add `vsce` and `@vscode/test-electron` for tests.
   - Define `package.json` contributes (commands & keybindings).
   - Write simple integration test that opens a temp Markdown file, pastes a known image, and asserts link.
   - Package `.vsix` and document installation steps.

## Testing Strategy

### Unit Tests
- Mock Electron's `nativeImage` and `clipboard` APIs.
- Validate filename and alt-text prompting logic.
- Test path-normalization utility functions.

### Integration Tests
- Use `@vscode/test-electron` to launch Extension Host.
- Open a temp Markdown file, programmatically write to clipboard, invoke command, and verify file creation + editor insertion.

## Observability

### Logging
- Use VS Code's `window.createOutputChannel('PasteImageExt')`.
- Log at `debug` level for:
  - Prompt responses
  - File write success/failure

### Metrics
- Count number of images saved via a simple JSON file in global storage (optional).

## Future Considerations

### Potential Enhancements
- Support JPG/PNG selection prompts.
- Drag-and-drop support.
- Bulk paste multiple images.

### Known Limitations
- Only handles PNG; clipboard images in other formats may require conversion.
- No conflict resolution if filename already exists (overwrites by default).

## Dependencies

### Runtime
- VS Code API (`@types/vscode`)
- Electron API (built into extension host)

### Dev
- TypeScript
- `@types/electron`
- `@vscode/test-electron`
- `vsce`

## Security Considerations
- Runs on user-owned files only.
- No network access.
- Prompts guard against accidental overwrites.

## Rollout Strategy

1. Local development via F5 in Extension Host
2. Publish pre-release `.vsix` to team
3. Gather feedback, fix bugs
4. Publish stable `.vsix` and share installation instructions

## References
- VS Code Extension API docs: https://code.visualstudio.com/api
- Electron Clipboard API: https://www.electronjs.org/docs/api/clipboard 