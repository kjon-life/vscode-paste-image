# Issue Templates for GitHub

Create the following issues in the GitHub repository to track and resolve the npm warnings:

## Issue 1: Update Dependencies to Resolve npm Warnings

**Title:** Update Dependencies to Resolve npm Warnings

**Description:**
During npm install, several warnings are generated about deprecated packages. We need to update these dependencies to their modern replacements.

### Warnings:

1. `inflight@1.0.6`: Leaks memory
   - Replace with an alternative or update to a newer version that doesn't have memory leaks

2. `@humanwhocodes/config-array@0.13.0` and `@humanwhocodes/object-schema@2.0.3`
   - Replace with `@eslint/config-array` and `@eslint/object-schema`

3. `rimraf@3.0.2`
   - Update to v4 or newer

4. `glob@7.2.3`
   - Update to v9 or newer

5. `eslint@8.57.1`
   - Update to the latest supported version

6. `lodash.get@4.4.2`
   - Replace with native optional chaining (?.) operator

7. `boolean@3.2.0`
   - Find alternative or evaluate if it's still needed

8. `vsce@2.15.0`
   - Replace with `@vscode/vsce`

9. `@types/electron@1.6.12`
   - Remove as Electron provides its own type definitions

### Acceptance Criteria:
- [ ] All npm warnings are resolved
- [ ] Functionality is not broken by the updates
- [ ] Tests pass with the updated dependencies

**Labels:** dependencies, maintenance

---

## Issue 2: Replace vsce with @vscode/vsce

**Title:** Replace vsce with @vscode/vsce

**Description:**
The `vsce` package has been deprecated and renamed to `@vscode/vsce`. We need to update our build scripts and dependencies to use the new package.

### Tasks:
- [ ] Update package.json to replace vsce with @vscode/vsce
- [ ] Update any build scripts that reference vsce
- [ ] Verify that packaging the extension still works correctly

**Labels:** dependencies, build

---

## Issue 3: Update ESLint and Related Packages

**Title:** Update ESLint and Related Packages

**Description:**
ESLint 8.57.1 is no longer supported, and several related packages are deprecated. We need to update to the latest ESLint and related packages.

### Tasks:
- [ ] Update eslint to the latest version
- [ ] Replace @humanwhocodes/config-array with @eslint/config-array
- [ ] Replace @humanwhocodes/object-schema with @eslint/object-schema
- [ ] Ensure all lint rules still work as expected
- [ ] Update any custom lint configurations if needed

**Labels:** dependencies, linting

---

## Issue 4: Replace inflight Package with Better Alternative

**Title:** Replace inflight Package with Better Alternative

**Description:**
The `inflight` package is deprecated and reported to leak memory. We need to find and implement a better alternative.

### Tasks:
- [ ] Identify direct and transitive dependencies that use `inflight`
- [ ] Research alternatives (lru-cache is suggested in the warning)
- [ ] Update dependencies or implement workarounds
- [ ] Verify no memory leaks in the updated implementation

**Labels:** dependencies, performance, bug

---

## Issue 5: Remove Unnecessary @types/electron Dependency

**Title:** Remove Unnecessary @types/electron Dependency

**Description:**
The `@types/electron` package is a stub types definition that's no longer needed as Electron provides its own type definitions. We should remove this dependency.

### Tasks:
- [ ] Remove @types/electron from package.json
- [ ] Update imports to use Electron's built-in types
- [ ] Verify that TypeScript compilation works correctly after the change

**Labels:** dependencies, types