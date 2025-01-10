import { EditorType } from "./EditorType";
import { ChangeSlidePositionAction } from "./redux/actions.ts";

function changeSlidePosition(editor: EditorType, action: ChangeSlidePositionAction): EditorType {

    const edit: EditorType = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: action.payload
        }
    }

    return edit
}

export {
    changeSlidePosition
}