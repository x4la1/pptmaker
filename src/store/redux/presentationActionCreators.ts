import { EditorType } from "../EditorType";
import { ActionType } from "./actions";

function changePresentationName(newName: string) {
    return {
        type: ActionType.CHANGE_PRESENTATION_NAME,
        payload: newName
    }
}

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor
    }
}

export {
    changePresentationName,
    setEditor
}