import { SlideType } from "../../store/PresentationType";
import { Slide } from "../Slide/Slide";
import styles from "./SlideList.module.css";
import { SelectionType } from "../../store/EditorType.ts";
import { useState } from "react";
import { useAppActions } from "../Hooks/useAppActions.ts";

const SLIDE_SCALE = 0.4;

type SlideListProps = {
    slides: Array<SlideType>,
    selection: SelectionType,
};

function SlideList({ slides, selection }: SlideListProps) {

    const {setSelection, changeSlidePosition} = useAppActions()
    const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null);

    function onSlideClick(slideId: string) {
        console.log(slideId)
        setSelection({selectedSlideId: slideId, selectedObjectId: null})
    }

    function onDragStart(event: React.DragEvent<HTMLDivElement>, slideId: string) {
        setDraggedSlideId(slideId);
        event.dataTransfer.effectAllowed = "move";
    }

    function onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    function onDrop(event: React.DragEvent<HTMLDivElement>, targetSlideId: string) {
        event.preventDefault();
        if (draggedSlideId !== null && draggedSlideId !== targetSlideId) {
            const draggedIndex = slides.findIndex(slide => slide.id === draggedSlideId);
            const targetIndex = slides.findIndex(slide => slide.id === targetSlideId);
            const updatedSlides: Array<SlideType> = [...slides];
            const [movedSlide] = updatedSlides.splice(draggedIndex, 1);
            updatedSlides.splice(targetIndex, 0, movedSlide);
            changeSlidePosition(updatedSlides)
        }
        setDraggedSlideId(null);
    }

    function onDragEnd() {
        setDraggedSlideId(null);
    }

    return (
        <div className={styles.slideList}>
            {slides.map((slide) => (
                <div
                    key={slide.id}
                    draggable
                    onClick={() => onSlideClick(slide.id)}
                    onDragStart={(event) => onDragStart(event, slide.id)}
                    onDragOver={onDragOver}
                    onDrop={(event) => onDrop(event, slide.id)}
                    onDragEnd={onDragEnd}
                    id={`slide-${slide.id}`}
                    className={styles.slide}
                >
                    <Slide
                        slide={slide}
                        isSelected={slide.id === selection.selectedSlideId}
                        scale={SLIDE_SCALE}
                        selectedObjectId={selection?.selectedObjectId}
                    />
                </div>
            ))}
        </div>
    );
}

export {
    SlideList
};