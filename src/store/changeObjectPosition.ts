import { EditorType } from "./EditorType";

function changeObjectPosition(editor: EditorType, position: { x: number, y: number }): EditorType {
    if (!editor.selection.selectedObjectId || !editor.selection.selectedSlideId) {
        return editor
    }

    const edit: EditorType = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(Slide => Slide.id === editor.selection.selectedSlideId ? {

                ...Slide,
                elements: Slide.elements.map(elem => elem.id === editor.selection.selectedObjectId ? {
                    ...elem,
                    position: {
                        x: position.x,
                        y: position.y,
                    },
                } : elem
                ),
            } : Slide
            )
        }
    }

    return edit
}

export {
    changeObjectPosition
}