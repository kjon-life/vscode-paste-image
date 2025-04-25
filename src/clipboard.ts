import * as vscode from 'vscode';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { platform } from 'os';
import * as fs from 'fs/promises';

const execFileAsync = promisify(execFile);

/**
 * Read image data from the system clipboard
 */
export async function readImageFromClipboard(): Promise<Buffer | null> {
    const os = platform();
    
    switch (os) {
        case 'darwin': // macOS
            return await readImageFromClipboardMacOS();
        case 'win32': // Windows
            return await readImageFromClipboardWindows();
        case 'linux': // Linux
            return await readImageFromClipboardLinux();
        default:
            throw new Error(`Unsupported operating system: ${os}`);
    }
}

async function readImageFromClipboardMacOS(): Promise<Buffer | null> {
    try {
        const tempFilePath = '/tmp/vscode-paste-image-temp.png';
        
        // Use pngpaste to save to a temporary file
        await execFileAsync('pngpaste', [tempFilePath]);
        
        // Read the file content
        const content = await fs.readFile(tempFilePath);
        
        // Clean up
        await fs.unlink(tempFilePath).catch(() => {});
        
        return content;
    } catch (error) {
        if ((error as any).code === 'ENOENT') {
            throw new Error('pngpaste utility is required. Install it with: brew install pngpaste');
        }
        throw error;
    }
}

async function readImageFromClipboardWindows(): Promise<Buffer | null> {
    // TODO: Implement Windows support using PowerShell
    throw new Error('Windows support not yet implemented');
}

async function readImageFromClipboardLinux(): Promise<Buffer | null> {
    // TODO: Implement Linux support using xclip
    throw new Error('Linux support not yet implemented');
}