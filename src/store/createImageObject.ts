import { EditorType } from "./EditorType";
import { ImageObjectType, SlideType } from "./PresentationType";
import { CreateImageObjectAction } from "./redux/actions";

function createImageObject(editor: EditorType, action : CreateImageObjectAction): EditorType {
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

    const imageObject: ImageObjectType = {
        id: getNewObjectId(),
        position: { x: 300, y: 300 },
        size: { width: 200, height: 200 },
        type: "ImageObject",
        src: action.payload,
    }

    const newSlides = editor.presentation.slides.map(Slide => {
        if (Slide.id == editor.selection.selectedSlideId) {
            return {
                ...Slide,
                elements: [...Slide.elements, imageObject]
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
    createImageObject
}