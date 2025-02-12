import { EditorType } from "./EditorType";
import { SlideType, TextObjectType } from "./PresentationType";

function createTextObject(editor: EditorType): EditorType {

    if (!editor.selection.selectedSlideId) {
        return editor
    }

    let selectedSlide: SlideType
    editor.presentation.slides.forEach(slide => {
        if (slide.id === editor.selection.selectedSlideId) {
            selectedSlide = slide
        }
    })



    function getNewObjectId(): string {
        let maxId: number = 0;
        selectedSlide.elements.forEach(element => {
            maxId = Math.max(maxId, parseInt(element.id))
        });
        maxId = maxId + 1
        return maxId.toString()
    }

    const textObject: TextObjectType = {
        id: getNewObjectId(),
        position: { x: 300, y: 300 },
        size: { width: 100, height: 50 },
        type: "TextObject",
        fontFamily: "Roboto",
        fontSize: 14,
        fontColor: "black",
        value: "Ведите текст",
    }

    const newSlides = editor.presentation.slides.map(Slide => {
        if (Slide.id == editor.selection.selectedSlideId) {
            return {
                ...Slide,
                elements: [...Slide.elements, textObject]
            }
        }
        return Slide
    })

    const edit: EditorType = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }

    return edit

}

export {
    createTextObject
}