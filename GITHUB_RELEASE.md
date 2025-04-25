# Creating a GitHub Release

Follow these steps to create a GitHub Release with the VSIX file:

1. **Navigate to your GitHub repository**
   - Go to https://github.com/kjon-life/vscode-paste-image

2. **Create a new release**
   - Click on "Releases" in the right sidebar
   - Click the "Create a new release" button (or "Draft a new release")

3. **Fill in the release information**
   - Tag version: `v0.1.2`
   - Release title: `VS Code Paste Image v0.1.2`
   - Description: Copy and paste the content from RELEASE_NOTES.md for version 0.1.2

4. **Upload the VSIX file**
   - Drag and drop the `vscode-paste-image-0.1.2.vsix` file into the "Attach binaries" section
   - Alternatively, click "Upload assets" and select the file

5. **Publish the release**
   - If you want to create a draft first, select "Save draft"
   - Otherwise, click "Publish release"

## Updating the README

After creating the release, update the README.md with a link to the release:

```markdown
## Installation

You can install the extension in several ways:

### From GitHub Releases

1. Download the `.vsix` file from the [latest release](https://github.com/kjon-life/vscode-paste-image/releases/latest)
2. In VS Code, go to Extensions (Ctrl+Shift+X)
3. Click the `...` menu in the top-right of the Extensions panel
4. Select `Install from VSIX...`
5. Choose the downloaded file
```

Add this to the README.md in the appropriate section.

## Tagging the Release in Git

To tag the release in git, run the following commands after a successful release:

```bash
# Create a tag
git tag -a v0.1.2 -m "Release v0.1.2 - Dependency Cleanup Release"

# Push the tag to the remote repository
git push origin v0.1.2
```

This ensures that the commit is properly tagged in the git history.