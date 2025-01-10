import { EditorType } from "./EditorType";

function deleteSlideObject(editor: EditorType): EditorType {
    if (!editor.selection.selectedObjectId || !editor.selection.selectedObjectId) {
        return editor
    }

    const slide = editor.presentation.slides.find(Slide => Slide.id === editor.selection.selectedSlideId)

    if (!slide) {
        return editor
    }

    const edit: EditorType = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(Slide => Slide.id === editor.selection.selectedSlideId ? {
                ...Slide,
                elements: slide.elements.filter(element => element.id !== editor.selection.selectedObjectId),
            } : Slide
            )
        },
        selection: {
            ...editor.selection,
            selectedObjectId: null,
        }
    }

    return edit
}

export {
    deleteSlideObject
}