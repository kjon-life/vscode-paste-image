import * as sinon from 'sinon';

// Mock the VS Code API
const TextDocument = class {
  private _uri: any;
  private _languageId: string;
  private _version: number;
  private _lineCount: number;
  private _text: string;
  private _isUntitled: boolean;

  constructor(options: any = {}) {
    this._uri = options.uri || { fsPath: '/mock/path/file.md' };
    this._languageId = options.languageId || 'markdown';
    this._version = options.version || 1;
    this._lineCount = options.lineCount || 1;
    this._text = options.text || '';
    this._isUntitled = options.isUntitled || false;
  }

  get uri() { return this._uri; }
  get languageId() { return this._languageId; }
  get version() { return this._version; }
  get lineCount() { return this._lineCount; }
  get isUntitled() { return this._isUntitled; }

  getText() { return this._text; }
  lineAt(line: number) { return { text: this._text }; }
};

class Position {
  constructor(public line: number, public character: number) {}
}

class Selection {
  constructor(public anchor: Position, public active: Position) {}
}

const TextEditor = class {
  private _document: any;
  private _selection: any;
  private _editSuccess: boolean;

  constructor(options: any = {}) {
    this._document = options.document || new TextDocument();
    this._selection = options.selection || new Selection(new Position(0, 0), new Position(0, 0));
    this._editSuccess = options.editSuccess !== undefined ? options.editSuccess : true;
  }

  get document() { return this._document; }
  get selection() { return this._selection; }
  set selection(selection) { this._selection = selection; }

  edit(callback: Function) {
    callback({ insert: () => {} });
    return Promise.resolve(this._editSuccess);
  }
};

// Create a mock VS Code namespace
export const vscode = {
  window: {
    activeTextEditor: null as any,
    showTextDocument: sinon.stub().resolves(null),
    showInformationMessage: sinon.stub().resolves(null),
    showErrorMessage: sinon.stub().resolves(null),
    showWarningMessage: sinon.stub().resolves('Yes'),
    showInputBox: sinon.stub().resolves('test-input'),
    createOutputChannel: sinon.stub().returns({
      appendLine: sinon.stub(),
      dispose: sinon.stub(),
    }),
  },
  workspace: {
    openTextDocument: sinon.stub().resolves(new TextDocument()),
    getConfiguration: sinon.stub().returns({
      get: sinon.stub().returns(null),
    }),
  },
  commands: {
    registerCommand: sinon.stub().returns({ dispose: sinon.stub() }),
    executeCommand: sinon.stub().resolves(),
    getCommands: sinon.stub().resolves(['extension.pasteImage']),
  },
  extensions: {
    getExtension: sinon.stub().returns({}),
  },
  Position,
  Selection,
  TextEditor,
  TextDocument,
  ExtensionContext: class {
    subscriptions: any[] = [];
    workspaceState: any = {
      get: sinon.stub(),
      update: sinon.stub().resolves(),
    };
    globalState: any = {
      get: sinon.stub(),
      update: sinon.stub().resolves(),
    };
  },
};

// Helper methods to set up the mock environment
export const MockFactory = {
  // Set up a mock active editor
  setupActiveEditor: (options: any = {}) => {
    const textEditor = new TextEditor(options);
    vscode.window.activeTextEditor = textEditor;
    return textEditor;
  },
  // Reset all stubs
  resetAllStubs: () => {
    Object.values(vscode.window).forEach((value) => {
      if (value && typeof value === 'object' && 'reset' in value) {
        (value as any).reset();
      }
    });
    Object.values(vscode.workspace).forEach((value) => {
      if (value && typeof value === 'object' && 'reset' in value) {
        (value as any).reset();
      }
    });
    Object.values(vscode.commands).forEach((value) => {
      if (value && typeof value === 'object' && 'reset' in value) {
        (value as any).reset();
      }
    });
  },
};