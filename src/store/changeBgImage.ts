import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";
import { ChangeBackgroundImageAction } from "./redux/actions";

function changeBackgroundImage(editor: EditorType, action: ChangeBackgroundImageAction): EditorType {
    if (!editor.selection.selectedSlideId) {
        return editor
    }

    const newslides: Array<SlideType> = editor.presentation.slides.map(Slide => {
        if (Slide.id === editor.selection.selectedSlideId) {
            return {
                ...Slide,
                background: {
                    src: action.payload,
                    type: "Image"
                }
            };

        }
        return Slide
    })

    const edit: EditorType = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newslides,
        }
    }

    return edit
}

export {
    changeBackgroundImage
}