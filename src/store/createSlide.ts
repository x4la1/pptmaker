import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";

function createSlide(editor: EditorType): EditorType {

    function getNewSlideId(): string {
        let maxId: number = 0;
        editor.presentation.slides.forEach(element => {
            maxId = Math.max(maxId, parseInt(element.id))
        });
        maxId = maxId + 1
        return maxId.toString()
    }

    const newSlide: SlideType = {
        id: getNewSlideId(),
        elements: [],
        background: { type: "Solid", color: "#FFFFFF" }
    }

    const edit: EditorType = {
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides, newSlide
            ]
        },
        selection: editor.selection
    }

    return edit

}

export {
    createSlide
}