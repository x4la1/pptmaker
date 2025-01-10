import { EditorType } from "./EditorType";
import { ChangeTextObjectValueAction } from "./redux/actions";


function changeTextObjectValue(editor: EditorType, action: ChangeTextObjectValueAction): EditorType {

    if (!editor.selection.selectedObjectId) {
        return editor;
    }

    const edit: EditorType = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(Slide => Slide.id === editor.selection.selectedSlideId ? {

                ...Slide,
                elements: Slide.elements.map(elem => elem.id === editor.selection.selectedObjectId ? {
                    ...elem,
                    value: action.payload
                } : elem
                ),
            } : Slide
            )
        }
    }

    return edit
}

export {
    changeTextObjectValue
}