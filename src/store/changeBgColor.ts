import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";
import { ChangeBackgroundColorAction } from "./redux/actions";

function changeBackgroundColor(editor: EditorType, action: ChangeBackgroundColorAction): EditorType {
    if (!editor.selection.selectedSlideId) {
        return editor
    }

    const newslides: Array<SlideType> = editor.presentation.slides.map(Slide => {
        if (Slide.id === editor.selection.selectedSlideId) {
            return {
                ...Slide,
                background: {
                    color: action.payload,
                    type: "Solid"
                }
            };

        }
        return Slide
    })

    const edit: EditorType = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newslides
        }
    }

    return edit


}
export {
    changeBackgroundColor
}