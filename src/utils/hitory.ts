import { Store } from "redux";
import { EditorType } from "../store/EditorType";

type HistoryType = {
    undo: () => EditorType | undefined,
    redo: () => EditorType | undefined,
}

function getLastItem(stack: Array<EditorType>): EditorType {
    return stack[stack.length - 1]
}

function initHistory(store: Store<EditorType>): HistoryType {
    let undoStack: Array<EditorType> = []
    let redoStack: Array<EditorType> = []
    let isUndoRedo: boolean = false
    let previousEditor = store.getState()

    store.subscribe(() => {
        const editor = store.getState()

        if (isUndoRedo) {
            isUndoRedo = false
            previousEditor = editor
            return
        }

        if (!undoStack.length || previousEditor.presentation !== editor.presentation) {
            if (editor === getLastItem(undoStack)) {
                undoStack.pop()
                redoStack.push(previousEditor)
                console.log("Запихнули в реду")
            } else if (editor === getLastItem(redoStack)) {
                redoStack.pop()
                undoStack.push(previousEditor)
                console.log("Запихнули в анду")
            } else {
                console.log("Очистили реду")
                undoStack.push(previousEditor)
                redoStack = []
            }
        }
        previousEditor = editor
    })

    function undo() {
        const lastState = undoStack.pop()
        redoStack.push(store.getState())
        isUndoRedo = true

        return lastState
    }

    function redo() {
        const lastState = redoStack.pop()
        undoStack.push(store.getState())
        isUndoRedo = true

        return lastState;
    }

    return {
        undo,
        redo,
    }
}

export {
    type HistoryType,
    initHistory
}