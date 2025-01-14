import { SelectionType } from "../EditorType";
import { ActionType } from "./actions";

function setSelection(newSelection: SelectionType) {
    return {
        type: ActionType.SET_SELECTION,
        payload: newSelection,
    }
}

function setNextSlide(){
    return{
        type: ActionType.SET_NEXT_SLIDE
    }
}

function setPreviousSlide(){
    return {
        type: ActionType.SET_PREVIOUS_SLIDE
    }
}

export {
    setSelection,
    setNextSlide,
    setPreviousSlide
}