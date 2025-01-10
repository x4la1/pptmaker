import { EditorType } from "./EditorType";
import { SetEditorAction } from "./redux/actions";

function setEditor(action: SetEditorAction): EditorType {
    return {
        ...action.payload
    }
}

export {
    setEditor
}