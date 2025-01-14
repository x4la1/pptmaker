import { EditorType } from "./EditorType";

function setNextSlide(editor: EditorType): EditorType {

    const currentSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selection.selectedSlideId);

    if (currentSlideIndex === -1 || currentSlideIndex === editor.presentation.slides.length - 1) {
        return editor;
    }

    // Otherwise, move to the next slide
    const nextSlideId = editor.presentation.slides[currentSlideIndex + 1].id;

    // Return a new EditorType with the updated selection
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedSlideId: nextSlideId
        }
    };
}

export{
    setNextSlide
}