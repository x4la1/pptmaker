import { editor as defaultEditor } from './data.ts';

let _editor = loadEditorFromLocalStorage();
let _handler: Function | null = null;

function loadEditorFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        const savedState = localStorage.getItem('editor');
        return savedState ? JSON.parse(savedState) : defaultEditor;
    }
    return defaultEditor;
}

function saveEditorToLocalStorage(editor: any) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('editor', JSON.stringify(editor));
    }
}

function getEditor() {
    return _editor;
}

function setEditor(newEditor: any) {
    _editor = newEditor;
    saveEditorToLocalStorage(_editor);
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);

    if (_handler) {
        _handler();
    }
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler;
}

export {
    setEditor,
    getEditor,
    dispatch,
    addEditorChangeHandler,
};