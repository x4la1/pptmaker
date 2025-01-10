import { EditorType } from "./EditorType"
import { SlideType } from "./PresentationType"

function removeSlide(editor: EditorType): EditorType {
    if (!editor.selection) {
        return editor
    }

    const removeSlideId: string | null = editor.selection.selectedSlideId
    const removeSlideIndex: number = editor.presentation.slides.findIndex(slide => slide.id == removeSlideId)
    const newSlides: Array<SlideType> = editor.presentation.slides.filter(Slide => Slide.id !== removeSlideId)

    let newSelectedSlideId: string | null = null;
    if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1)
        newSelectedSlideId = newSlides[index].id
    }

    const edit: EditorType = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: newSelectedSlideId,
            selectedObjectId: null
        }
    }


    return edit
}

export {
    removeSlide
}