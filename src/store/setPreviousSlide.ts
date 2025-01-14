import { EditorType } from "./EditorType";

function setPreviousSlide(editor: EditorType): EditorType {

    const currentSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selection.selectedSlideId);

    if (currentSlideIndex === -1 || currentSlideIndex === 0) {
        return editor;
    }

    const previousSlideId = editor.presentation.slides[currentSlideIndex - 1].id;

    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedSlideId: previousSlideId
        }
    };
}

export{
    setPreviousSlide
}