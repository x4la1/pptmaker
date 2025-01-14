import { SlideType } from '../../store/PresentationType'
import styles from './Slide.module.css'
import { CSSProperties } from 'react'
import { TextObject } from './TextObject'
import { ImageObject } from './ImageObject'
import { useAppActions } from '../Hooks/useAppActions'
import { useDragAndDrop } from '../Hooks/useDragAndDrop'


const SLIDE_WIDTH = 1122
const SLIDE_HEIGHT = 780

type SlideProps = {
    slide: SlideType | null,
    scale?: number,
    className?: string,
    isSelected: boolean,
    selectedObjectId: string | null,
}

function Slide({ slide, scale = 1, className, isSelected, selectedObjectId }: SlideProps) {
    const { setSelection } = useAppActions()

    let slideStyles: CSSProperties
    if (slide == null) {
        return (<></>)
    }
    if (slide.background.type == "Image") {
        slideStyles = {
            backgroundImage: `url("${slide.background.src}")`,
            width: `${SLIDE_WIDTH * scale}px`,
            height: `${SLIDE_HEIGHT * scale}px`,
            backgroundSize: "cover"
        }
    }
    else {
        slideStyles = {
            backgroundColor: slide.background.color,
            width: `${SLIDE_WIDTH * scale}px`,
            height: `${SLIDE_HEIGHT * scale}px`
        }
    }

    if (isSelected && scale < 1) {
        slideStyles.border = '3px solid #0b57d0'
    }

    function onObjectClick(event: React.MouseEvent, objectId: string): void {
        event.stopPropagation()
        if (isDragging) {
            return
        }
        setSelection({
            selectedSlideId: slide.id,
            selectedObjectId: objectId
        })
        console.log(objectId)
    }

    function onSlideClick() {
        setSelection({
            selectedSlideId: slide.id,
            selectedObjectId: null
        })
    }

    const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDragAndDrop(slide.id)

    if (scale < 1) {
        return (
            <div style={{ ...slideStyles, zIndex: "0" }}
                className={styles.slide + ' ' + className}
                onClick={onSlideClick}
            >
                {slide.elements.map(slideObject => {
                    switch (slideObject.type) {
                        case "TextObject":
                            return (
                                <div style={{ zIndex: "1" }} key={slideObject.id}  >
                                    <TextObject textObject={slideObject} isSelected={slideObject.id == selectedObjectId} scale={scale}></TextObject>
                                </div>
                            )
                        case "ImageObject":
                            return (
                                <div key={slideObject.id}>
                                    <ImageObject key={slideObject.id} imageObject={slideObject} isSelected={slideObject.id == selectedObjectId} scale={scale}></ImageObject>
                                </div>
                            )
                    }
                })}
            </div>
        )
    }

    return (
        <div style={{ ...slideStyles, zIndex: "0" }} className={styles.slide + ' ' + className} onClick={onSlideClick}
            onMouseUp={handleMouseUp}
            onMouseMove={(event) => {
                handleMouseMove(event)
            }}>
            {slide.elements.map(slideObject => {
                switch (slideObject.type) {
                    case "TextObject":
                        return (
                            <div style={{ zIndex: "1" }} key={slideObject.id} onClick={(event) => onObjectClick(event, slideObject.id)}
                                onMouseDown={(event) => {
                                    event.stopPropagation()
                                    handleMouseDown(event, slideObject.id)
                                }}
                            >
                                <TextObject textObject={slideObject} isSelected={slideObject.id == selectedObjectId} scale={scale}></TextObject>
                            </div>
                        )
                    case "ImageObject":
                        return (
                            <div key={slideObject.id} onClick={(event) => onObjectClick(event, slideObject.id)}
                                onMouseDown={(event) => {
                                    event.stopPropagation()
                                    handleMouseDown(event, slideObject.id)
                                }}>
                                <ImageObject key={slideObject.id} imageObject={slideObject} isSelected={slideObject.id == selectedObjectId} scale={scale}></ImageObject>
                            </div>
                        )
                }
            })}
        </div>
    )

}
export {
    Slide
}