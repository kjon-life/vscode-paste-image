# Initial Setup Instructions

To set up the repository for the first time, follow these steps:

```bash
# Navigate to your project directory
cd vscode-paste-image

# Initialize the git repository
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit: VS Code Paste Image extension"

# Add the remote repository
git remote add origin https://github.com/kjon-life/vscode-paste-image.git

# Push to GitHub
git push -u origin main
```

## After Pushing

1. Set up GitHub repository settings:
   - Enable GitHub Actions
   - Set up branch protection rules for main
   - Add CODECOV_TOKEN as a repository secret

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run compile
```

4. Run tests:
```bash
npm test
```

5. Run security audit:
```bash
npm audit
```

6. Package the extension:
```bash
npm run package
```

This will create a `.vsix` file that can be installed in VS Code.