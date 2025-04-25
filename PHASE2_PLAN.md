# Phase 2 Dependency Update Plan

## Overview
This document outlines the specific tasks, commands, and verification steps for Phase 2 of the dependency updates. It builds upon the work completed in Phase 1 and focuses on removing unused dependencies, updating outdated ones, and fixing security vulnerabilities.

## Phase 1 Recap (Completed)
- Replaced `vsce` with `@vscode/vsce` and updated package scripts
- Updated ESLint and related packages to their latest versions
- Added resolutions section to package.json for transitive dependencies
- Implemented comprehensive unit tests for all components
- Added placeholder integration and e2e tests
- Updated documentation in CHANGELOG.md, README.md, and ISSUES.md

## Phase 2 Tasks

### 1. Remove Unused Dependencies

**Task Description:**  
Remove dependencies identified as unused by depcheck and npm-check.

**Steps:**
1. Verify current dependencies are correctly marked as unused:
   ```bash
   npx depcheck
   ```

2. Remove unused dependencies:
   ```bash
   npm uninstall @vscode/test-electron @vitest/coverage-v8 mocha @types/mocha glob @types/glob --save-dev
   ```

3. Verification:
   ```bash
   npm run compile
   npm test
   ```

### 2. Fix Missing Dependencies

**Task Description:**  
We've already verified in Phase 1 that `@types/vscode` is correctly installed. No additional action needed here.

### 3. Update Outdated Dependencies

**Task Description:**  
Update dependencies to their latest compatible versions.

**Steps:**
1. Check current outdated packages:
   ```bash
   npm outdated
   ```

2. Update dependencies one group at a time:
   ```bash
   # Update TypeScript types
   npm install @types/node@latest --save-dev
   npm run compile
   npm test
   
   # Update testing libraries
   npm install vitest@latest --save-dev
   npm run compile
   npm test
   ```

3. Verification after each update:
   ```bash
   npm run compile
   npm test
   ```

### 4. Fix Security Vulnerabilities

**Task Description:**  
Resolve security vulnerabilities identified by npm audit.

**Steps:**
1. Check current security vulnerabilities:
   ```bash
   npm audit
   ```

2. Fix non-breaking vulnerabilities:
   ```bash
   npm audit fix
   ```

3. If step 2 doesn't resolve all issues, examine remaining vulnerabilities:
   ```bash
   npm audit
   ```

4. For remaining vulnerabilities, update specific packages or use resolutions:
   ```bash
   # Example - check what's needed based on audit results
   npm install esbuild@latest --save-dev
   ```

5. Verification:
   ```bash
   npm run compile
   npm test
   npm audit
   ```

### 5. Fix Dependency Conflicts

**Task Description:**  
Resolve conflicts between dependency versions.

**Steps:**
1. Verify glob dependency is configured correctly based on what we specified in resolutions:
   ```bash
   npm ls glob
   ```

2. If there are still conflicts, update the glob package:
   ```bash
   npm install glob@^10.3.10 --save-dev
   ```

3. Verification:
   ```bash
   npm run compile
   npm test
   npm ls --depth=0
   ```

### 6. Clean Up Extraneous Packages

**Task Description:**  
Remove extraneous packages and clean up node_modules.

**Steps:**
1. Run npm prune to remove extraneous packages:
   ```bash
   npm prune
   ```

2. Verification:
   ```bash
   npm ls --depth=0
   ```

## Final Verification

After completing all tasks, perform these final verification steps:

1. **Compilation Check:**
   ```bash
   npm run compile
   ```

2. **Test Suite:**
   ```bash
   npm test
   ```

3. **Build Package:**
   ```bash
   npm run package
   ```

4. **Security Check:**
   ```bash
   npm audit
   ```

5. **Manual Testing:**
   - Install the built VSIX in VS Code
   - Test the extension's functionality
   - Verify image pasting works as expected

## Documentation Updates

Once Phase 2 is completed, update the following files:

1. **CHANGELOG.md:**
   - Add details about removed dependencies
   - Note security vulnerability fixes
   - Mention any performance improvements

2. **DEPENDENCY_UPDATES.md:**
   - Mark Phase 2 tasks as completed
   - Add any new findings or issues encountered

3. **ISSUES.md:**
   - Check off completed tasks
   - Update status for remaining issues

4. **package.json:**
   - Update version to 0.1.2

## Risk Assessment and Mitigation

- **Risk:** Removing dependencies might break functionality
  - **Mitigation:** Our comprehensive test suite will catch most issues
  
- **Risk:** Updating dependencies might introduce incompatibilities
  - **Mitigation:** Update one group at a time and verify each change
  
- **Risk:** Security fixes might require major version bumps
  - **Mitigation:** Carefully review each vulnerability and its fix
  
- **Risk:** Build process might fail with updated dependencies
  - **Mitigation:** Test packaging after major dependency changes

## Timeline

Estimated time to complete Phase 2: 2-3 hours of focused work, including testing and verification.