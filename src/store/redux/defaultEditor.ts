import { EditorType } from "../EditorType";
import { SlideType } from "../PresentationType";

const slide: SlideType = {
    id: "1",
    elements: [
    ],
    background: {
        type: "Solid",
        color: "white"
    }
}
const defaultEditor: EditorType = {
    presentation: {
        id: "expamle",
        name: 'Название презентации',
        slides: [
            slide,
        ],
    },
    selection: {
        selectedSlideId: slide.id,
        selectedObjectId: null
    }
}

export {
    defaultEditor,
}