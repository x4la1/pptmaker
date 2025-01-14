import { EditorType } from "../EditorType";
import { createSlide } from "./../createSlide";
import { defaultEditor } from "./defaultEditor";
import { setSelection } from "./../SetSelection";
import { ActionType, EditorAction } from "./actions";
import { removeSlide } from "../removeSlide";
import { changeSlidePosition } from "../changeSlidePosition";
import { changePresentationName } from "../changePresentationName";
import { createTextObject } from "../createTextObject";
import { createImageObject } from "../createImageObject";
import { deleteSlideObject } from "../deleteSlideObject";
import { changeBackgroundColor } from "../changeBgColor";
import { changeBackgroundImage } from "../changeBgImage";
import { setEditor } from "../setEditor";
import { changeTextObjectValue } from "../changeTextObjectValue";
import { setNextSlide } from "../setNextSlide";
import { setPreviousSlide } from "../setPreviousSlide";
import { moveObjectOnSlide } from "../moveSlideObject";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.CREATE_SLIDE:
            return createSlide(editor)
        case ActionType.SET_SELECTION:
            return setSelection(editor, action)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.CHANGE_SLIDE_POSITION:
            return changeSlidePosition(editor, action)
        case ActionType.CHANGE_PRESENTATION_NAME:
            return changePresentationName(editor, action)
        case ActionType.CREATE_TEXT_OBJECT:
            return createTextObject(editor)
        case ActionType.CREATE_IMAGE_OBJECT:
            return createImageObject(editor, action)
        case ActionType.DELETE_SLIDE_OBJECT:
            return deleteSlideObject(editor)
        case ActionType.CHANGE_BACKGROUND_COLOR:
            return changeBackgroundColor(editor, action)
        case ActionType.CHANGE_BACKGROUND_IMAGE:
            return changeBackgroundImage(editor, action)
        case ActionType.SET_EDITOR:
            return setEditor(action)
        case ActionType.CHANGE_TEXT_OBJECT_VALUE:
            return changeTextObjectValue(editor, action)
        case ActionType.SET_NEXT_SLIDE:
            return setNextSlide(editor)
        case ActionType.SET_PREVIOUS_SLIDE:
            return setPreviousSlide(editor)
        case ActionType.MOVE_SLIDE_OBJECT:
            return moveObjectOnSlide(editor, action)
        default:
            return editor
    }
}

export {
    editorReducer,
}