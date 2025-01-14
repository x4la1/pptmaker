import { SlideType } from "../PresentationType"
import { ActionType } from "./actions"

function createSlide() {
    return {
        type: ActionType.CREATE_SLIDE,
    }
}

function removeSlide() {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

function changeSlidePosition(newSlides: Array<SlideType>) {
    return {
        type: ActionType.CHANGE_SLIDE_POSITION,
        payload: newSlides
    }
}

function createTextObject() {
    return {
        type: ActionType.CREATE_TEXT_OBJECT
    }
}

function createImageObject(file: string) {
    return {
        type: ActionType.CREATE_IMAGE_OBJECT,
        payload: file
    }
}

function deleteSlideObject() {
    return {
        type: ActionType.DELETE_SLIDE_OBJECT
    }
}

function changeBackgroundColor(color: string) {
    return {
        type: ActionType.CHANGE_BACKGROUND_COLOR,
        payload: color
    }
}

function changeBackgroundImage(src: string) {
    return {
        type: ActionType.CHANGE_BACKGROUND_IMAGE,
        payload: src
    }
}

function changeTextObjectValue(value: string) {
    return {
        type: ActionType.CHANGE_TEXT_OBJECT_VALUE,
        payload: value
    }
}

function moveSlideObject(slideId: string, objectId: string, ox: number, oy: number){
    return{
        type: ActionType.MOVE_SLIDE_OBJECT,
        payload: {slideId, objectId, ox, oy}
    }
}

export {
    createSlide,
    removeSlide,
    changeSlidePosition,
    createTextObject,
    createImageObject,
    deleteSlideObject,
    changeBackgroundColor,
    changeBackgroundImage,
    changeTextObjectValue,
    moveSlideObject
}