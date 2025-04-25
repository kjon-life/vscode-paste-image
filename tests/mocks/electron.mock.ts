import * as sinon from 'sinon';

// Create a mock PNG buffer
export const createMockPngBuffer = (): Buffer => {
  // PNG header (8 bytes) followed by some dummy data
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const data = Buffer.from('MOCKEDPNGDATAFORIMAGEPASTETESTING');
  return Buffer.concat([header, data]);
};

// Mock clipboard with image
export const mockClipboardWithImage = {
  readImage: sinon.stub().returns({
    isEmpty: sinon.stub().returns(false),
    toPNG: sinon.stub().returns(createMockPngBuffer()),
  }),
};

// Mock clipboard without image
export const mockEmptyClipboard = {
  readImage: sinon.stub().returns({
    isEmpty: sinon.stub().returns(true),
    toPNG: sinon.stub().returns(Buffer.alloc(0)),
  }),
};

// Mock nativeImage
export const mockNativeImage = {
  createFromBuffer: sinon.stub().callsFake((buffer: Buffer) => ({
    isEmpty: () => buffer.length === 0,
    toPNG: () => buffer,
  })),
};

// Export the full mock
export const electron = {
  clipboard: mockClipboardWithImage,
  nativeImage: mockNativeImage,
};

// Helper to switch to empty clipboard
export const useEmptyClipboard = () => {
  electron.clipboard = mockEmptyClipboard;
};

// Helper to switch to clipboard with image
export const useClipboardWithImage = () => {
  electron.clipboard = mockClipboardWithImage;
};

// Reset all mocks
export const resetElectronMocks = () => {
  mockClipboardWithImage.readImage.reset();
  mockEmptyClipboard.readImage.reset();
  mockNativeImage.createFromBuffer.reset();
};