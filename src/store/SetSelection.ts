import { EditorType } from "./EditorType.ts";
import { SetSelectionAction } from "./redux/actions.ts";

function setSelection(editor: EditorType, action: SetSelectionAction): EditorType {
    const edit: EditorType = {
        ...editor,
        selection: action.payload,
    }
    return edit
}

export {
    setSelection,
}