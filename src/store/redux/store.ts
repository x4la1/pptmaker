import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { EditorType } from "../EditorType";
import Ajv from "ajv";
import { getSchema } from "../../utils/schema";
import { defaultEditor } from "./defaultEditor";



function saveEditorToLocalStorage(editor: EditorType) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('editor', JSON.stringify(editor));
    }
}

function loadEditorFromLocalStorage(): EditorType {
    if (typeof localStorage !== 'undefined') {
        const savedState = localStorage.getItem('editor');
        if (savedState) {
            const ajv = new Ajv()
            const schema = getSchema()
            const validatePresentation = ajv.compile(schema)
            try {
                const parsedState: EditorType = JSON.parse(savedState);
                if (validatePresentation(parsedState)) {
                    return parsedState;
                } else {
                    alert("Ошибка при загрузке файла презентации")
                    console.error("Ошибка при загрузке файла презентации:", validatePresentation.errors);
                }
            } catch (error) {
                console.error('Ошибка при загрузке файла презентации:', error);
                alert('Неверный формат файла презентации.');
            }
        }
    }
    return defaultEditor;
}

const state: EditorType = loadEditorFromLocalStorage();

const store = createStore(editorReducer, state)

store.subscribe(() => {
    saveEditorToLocalStorage(store.getState())
})

export {
    store
}

