import { useState, useRef } from "react";
import { useAppActions } from "./useAppActions";
import { useAppSelector } from "./useAppSelector";


function useDragAndDrop(slideId: string) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElemId, setDraggedElemId] = useState<string | null>(null);
    const startPos = useRef({ x: 0, y: 0 });
    const objectStartPos = useRef({ x: 0, y: 0 });
    const { moveSlideObject } = useAppActions();
    const editor = useAppSelector((state) => state)

    function handleMouseDown(event: React.MouseEvent, objectId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedElemId(objectId);
        startPos.current = { x: event.clientX, y: event.clientY };


        const slide = editor.presentation.slides.find((slide) => slide.id === slideId);
        const object = slide?.elements.find((elem) => elem.id === objectId);
        if (object) {
            objectStartPos.current = { x: object.position.x, y: object.position.y };
        }
        console.log("down")
    }

    function handleMouseMove(event: React.MouseEvent): void {
        if (!isDragging || !draggedElemId) {
            return;
        }

        const deltaX = event.clientX - startPos.current.x;
        const deltaY = event.clientY - startPos.current.y;

        const slide = editor.presentation.slides.find((slide) => slide.id === slideId);
        if (!slide) return;
        const object = slide.elements.find((elem) => elem.id === draggedElemId);
        if (!object) return;

        const newX = Math.max(0, Math.min(objectStartPos.current.x + deltaX, 1122 - object.size.width));
        const newY = Math.max(0, Math.min(objectStartPos.current.y + deltaY, 780 - object.size.height));
        console.log("move")
        moveSlideObject(slideId, draggedElemId, newX, newY);

    }

    function handleMouseUp(): void {
        setIsDragging(false);
        setDraggedElemId(null);
        
    }


    return {
        isDragging, handleMouseMove, handleMouseDown, handleMouseUp
    }



}





export {
    useDragAndDrop
}