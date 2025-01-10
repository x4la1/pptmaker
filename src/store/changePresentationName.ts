import { EditorType } from "./EditorType";
import { ChangePresentationNameAction} from "./redux/actions";

function changePresentationName(editor: EditorType, action: ChangePresentationNameAction): EditorType {

    const edit: EditorType = {
        ...editor,
        presentation:
        {
            ...editor.presentation,
            name: action.payload,
        }
    }

    return edit
}

export {
    changePresentationName
}