#!/bin/bash
# Quick build script for VS Code Paste Image extension

set -e

echo "=== Building VS Code Paste Image Extension ==="
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Compile TypeScript
echo "Compiling TypeScript..."
npm run compile

# Run tests
echo "Running tests..."
npm test

# Package the extension
echo "Creating VSIX package..."
npm run package

# Find the created VSIX file
VSIX_FILE=$(find . -maxdepth 1 -name "*.vsix" | sort -r | head -n 1)

if [ -n "$VSIX_FILE" ]; then
  echo ""
  echo "=== Build Successful! ==="
  echo "VSIX file created: $VSIX_FILE"
  echo ""
  echo "To install the extension, run:"
  echo "code --install-extension $VSIX_FILE"
  echo ""
  echo "To create a GitHub release, follow the instructions in GITHUB_RELEASE.md"
else
  echo "Failed to find generated VSIX file."
  exit 1
fi