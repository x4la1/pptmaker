import { EditorType } from "./EditorType";
import { MoveSlideObjectAction } from "./redux/actions";

function moveObjectOnSlide(editor: EditorType, action: MoveSlideObjectAction): EditorType {
    console.log("Обновление позиции объекта...");

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === action.payload.slideId
                    ? {
                        ...slide,
                        elements: slide.elements.map(elem =>
                            elem.id === action.payload.objectId
                                ? {
                                    ...elem,
                                    position: {
                                        x: action.payload.ox,
                                        y: action.payload.oy,
                                    },
                                }
                                : elem
                        ),
                    }
                    : slide
            ),
        },
    };
}

export {
    moveObjectOnSlide
}