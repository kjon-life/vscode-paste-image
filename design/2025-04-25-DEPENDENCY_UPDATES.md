# Dependency Update Plan

This document outlines the specific changes needed to resolve the npm warnings and update dependencies.

## Implementation Progress

### Phase 1 (Completed)
- u2705 Replaced `vsce` with `@vscode/vsce` and updated the package script
- u2705 Updated ESLint and related packages to their recommended versions
- u2705 Added resolutions section for transitive dependencies
- u2705 Created new unit tests for all components
- u2705 Added placeholder integration and e2e tests

### Phase 2 (Completed)
- u2705 Remove unused dependencies
- u2705 Fix missing dependencies
- u2705 Update outdated dependencies
- u2705 Fix security vulnerabilities
- u2705 Fix dependency conflicts
- u2705 Clean up extraneous packages

## Dependency Analysis Results

The following analysis was conducted using various npm tools to identify deprecated, outdated, and problematic dependencies:

### npm outdated
```
Package                            Current    Wanted   Latest  Location                                       Depended by
@types/node                       18.19.87  18.19.87  22.15.2  node_modules/@types/node                       vscode-paste-image
@typescript-eslint/eslint-plugin    7.18.0    7.18.0   8.31.0  node_modules/@typescript-eslint/eslint-plugin  vscode-paste-image
@typescript-eslint/parser           7.18.0    7.18.0   8.31.0  node_modules/@typescript-eslint/parser         vscode-paste-image
@vitest/coverage-v8                  1.6.1     1.6.1    3.1.2  node_modules/@vitest/coverage-v8               vscode-paste-image
eslint                              8.57.1    8.57.1   9.25.1  node_modules/eslint                            vscode-paste-image
glob                                 7.2.3    10.4.5   11.0.2  node_modules/glob                              vscode-paste-image
vitest                               1.6.1     1.6.1    3.1.2  node_modules/vitest                            vscode-paste-image
```

### npm ls --depth=0
Several issues were identified:
1. Missing dependencies: `@types/glob`, `@types/mocha`, and `mocha`
2. Invalid version of `glob`: Has v7.2.3 but requires ^10.3.10
3. Extraneous packages: Several Sinon-related packages
We do not use mocha, or Sinon-related packages

### npm-check
Identified problems:
1. Major updates available for multiple packages
2. Missing dependencies: `mocha`, `@types/mocha`
3. Potentially unused packages: `@vscode/test-electron`, `vsce`, `@vitest/coverage-v8`, `glob`
4. Missing `vscode` dependency referenced in code

### depcheck
Confirmed unused devDependencies:
* `@vscode/test-electron`
* `vsce`
* `@vitest/coverage-v8`
* `mocha`
* `@types/mocha`
* `glob`
* `@types/glob`

Confirmed missing dependency:
* `vscode` (used in `./src/clipboard.ts`)

### npm audit
Security vulnerabilities detected:
1. Moderate severity in `esbuild` (dependency of vitest)
2. Moderate severity in `xml2js` (dependency of vsce)

## Immediate Updates

1. Replace `@types/electron` with correct import approach:
   ```diff
   - "@types/electron": "^1.6.10",
   ```

   Update any imports in the code to use Electron API types directly.

2. Replace `vsce` with `@vscode/vsce`:
   ```diff
   - "vsce": "^2.15.0",
   + "@vscode/vsce": "^2.22.0",
   ```

   Update scripts in package.json:
   ```diff
   - "package": "vsce package"
   + "package": "@vscode/vsce package"
   ```

3. Update ESLint and related packages:
   ```diff
   - "eslint": "^8.57.0",
   - "@typescript-eslint/eslint-plugin": "^7.3.1",
   - "@typescript-eslint/parser": "^7.3.1"
   + "eslint": "^9.0.0",
   + "@typescript-eslint/eslint-plugin": "^7.4.0",
   + "@typescript-eslint/parser": "^7.4.0",
   + "@eslint/config-array": "^1.0.0",
   + "@eslint/object-schema": "^1.0.0",
   ```

## Underlying Dependencies

Some warnings come from transitive dependencies. These need to be addressed by:

1. Adding resolutions to package.json:
   ```json
   "resolutions": {
     "glob": "^9.0.0",
     "rimraf": "^4.0.0",
     "inflight": "npm:lru-cache@^10.0.0",
     "lodash.get": "npm:just-safe-get@^4.0.0",
     "boolean": "npm:is-boolean-object@^2.0.0"
   }
   ```

2. For packages still using `lodash.get`, identify direct dependencies that use it and update them, or create custom wrappers that use the optional chaining operator.

## Recommended Actions Based on Analysis

### 1. Fix Missing Dependencies

* Install the missing `vscode` dependency referenced in the code:
  ```bash
  npm install @types/vscode --save-dev
  ```

### 2. Remove Unused Dependencies

The following dependencies are not actually used in the codebase and should be removed:

```bash
npm uninstall @vscode/test-electron vsce @vitest/coverage-v8 mocha @types/mocha glob @types/glob --save-dev
```

### 3. Update Outdated Dependencies

Update dependencies to their latest versions (consider compatibility first):

```bash
npm install @types/node@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest vitest@latest --save-dev
```

### 4. Fix Security Vulnerabilities

Run the following command to fix security vulnerabilities (test thoroughly after):

```bash
npm audit fix
```

For more severe fixes that might include breaking changes:

```bash
npm audit fix --force
```

### 5. Fix Dependency Conflicts

Resolve the invalid version of glob:

```bash
npm install glob@^10.3.10 --save-dev
```

### 6. Clean Up Extraneous Packages

Run the following to clean up the node_modules directory:

```bash
npm prune
```

## Implementation Plan

1. Create a new branch for dependency updates
2. Make changes incrementally, testing after each major change
3. Update one group of related dependencies at a time
4. Run tests to verify functionality
5. Create a PR with the dependency updates

## Testing After Updates

After updating dependencies, perform the following tests:

1. Run unit tests: `npm test`
2. Verify compilation: `npm run compile`
3. Check packaging: `npm run package`
4. Test the extension in a VS Code instance
5. Verify that the image paste functionality works correctly

## Notes

- Some dependencies might require additional configuration changes
- If any tests fail after updates, isolate the problematic dependency
- Consider using `npm-check-updates` to identify other outdated packages