import { SlideType, PresentationType } from "./PresentationType"
import { EditorType } from "./EditorType"

const slide1: SlideType = {
    id: "1",
    elements: [
    ],
    background: {
        type: "Solid",
        color: "white" 
    }
}


const presentation: PresentationType = {
    id: "presentation",
    name: "Название презентации",
    slides: [
        slide1,
    ],
}

const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjectId: null
    }
}

export {
    editor,
}