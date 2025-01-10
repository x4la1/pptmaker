import { EditorType, SelectionType } from "../EditorType";
import { SlideType } from "../PresentationType";

enum ActionType {
    CREATE_SLIDE = 'createSlide',
    SET_SELECTION = 'setSelection',
    REMOVE_SLIDE = 'removeSlide',
    CHANGE_SLIDE_POSITION = 'changeSlidePosition',
    CHANGE_PRESENTATION_NAME = 'changePresentationName',
    CREATE_TEXT_OBJECT = 'createTextObject',
    CREATE_IMAGE_OBJECT = 'createImageObject',
    DELETE_SLIDE_OBJECT = 'deleteSlideObject',
    CHANGE_BACKGROUND_COLOR = 'changeBackgroundColor',
    CHANGE_BACKGROUND_IMAGE = 'changeBackgroundImage',
    SET_EDITOR = 'setEditor',
    CHANGE_TEXT_OBJECT_VALUE = 'changeTextObjectValue',


}

type AddSlideAction = {
    type: ActionType.CREATE_SLIDE
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: SelectionType
}

type ChangeSlidePositionAction = {
    type: ActionType.CHANGE_SLIDE_POSITION,
    payload: Array<SlideType>
}

type ChangePresentationNameAction = {
    type: ActionType.CHANGE_PRESENTATION_NAME,
    payload: string,
}

type CreateTextObjectAction = {
    type: ActionType.CREATE_TEXT_OBJECT
}

type CreateImageObjectAction = {
    type: ActionType.CREATE_IMAGE_OBJECT,
    payload: string
}

type DeleteSlideObjectAction = {
    type: ActionType.DELETE_SLIDE_OBJECT,
}

type ChangeBackgroundColorAction = {
    type: ActionType.CHANGE_BACKGROUND_COLOR,
    payload: string,
}

type ChangeBackgroundImageAction = {
    type: ActionType.CHANGE_BACKGROUND_IMAGE,
    payload: string
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType
}

type ChangeTextObjectValueAction = {
    type: ActionType.CHANGE_TEXT_OBJECT_VALUE,
    payload: string
}

type EditorAction = AddSlideAction | SetSelectionAction | RemoveSlideAction
    | ChangeSlidePositionAction | ChangePresentationNameAction | CreateTextObjectAction
    | CreateImageObjectAction | DeleteSlideObjectAction | ChangeBackgroundColorAction |
    ChangeBackgroundImageAction | SetEditorAction | ChangeTextObjectValueAction


export {
    ActionType,
    type SetSelectionAction,
    type ChangeSlidePositionAction,
    type ChangePresentationNameAction,
    type EditorAction,
    type CreateTextObjectAction,
    type CreateImageObjectAction,
    type DeleteSlideObjectAction,
    type ChangeBackgroundColorAction,
    type ChangeBackgroundImageAction,
    type SetEditorAction,
    type ChangeTextObjectValueAction,

}