import { CSSProperties} from "react"
import { ImageObjectType } from "../../store/PresentationType"
import styles from "./SlideObject.module.css"


type ImageObjectProps = {
    imageObject: ImageObjectType,
    scale?: number,
    isSelected: boolean,
}

function ImageObject({ imageObject, scale = 1, isSelected }: ImageObjectProps) {


    let imageObjectStyles: CSSProperties
    let pointStyle: CSSProperties = {
        width: "8px",
        height: "8px",
        backgroundColor: "blue",
        position: "absolute",
        borderRadius: "50%",
        zIndex: "2",
    };

    if (scale != 1) {
        imageObjectStyles = {
            top: `${imageObject.position.y * scale}px`,
            left: `${imageObject.position.x * scale}px`,
            width: `${imageObject.size.width * scale}px`,
            height: `${imageObject.size.height * scale}px`,
            userSelect: "none"
        }
        return (
            <img style={imageObjectStyles} className={styles.slideObject} src={`${imageObject.src}`} />
        )
    } else {
        imageObjectStyles = {
            top: `${imageObject.position.y * scale}px`,
            left: `${imageObject.position.x * scale}px`,
            width: `${imageObject.size.width * scale}px`,
            height: `${imageObject.size.height * scale}px`,
        }
        if (isSelected) {
            imageObjectStyles.border = '3px dashed gray'
        } else {
            pointStyle = {
                display: "none"
            }
        }
        return (
            <>
                <div style={{
                    ...pointStyle, top: imageObject.position.y,
                    left: imageObject.position.x,
                    cursor: "nwse-resize"
                }} className={styles.leftUpPoint}></div>
                <div style={{
                    ...pointStyle, top: imageObject.position.y,
                    left: (imageObject.position.x + Math.floor(imageObject.size.width / 2)),
                    cursor: "ns-resize"
                }} className={styles.upPoint}></div>
                <div style={{
                    ...pointStyle, top: imageObject.position.y,
                    left: (imageObject.position.x + imageObject.size.width),
                    cursor: "nesw-resize"
                }} className={styles.rightUpPoint}></div>
                <div style={{
                    ...pointStyle, top: imageObject.position.y + Math.floor(imageObject.size.height / 2),
                    left: imageObject.position.x,
                    cursor: "ew-resize"
                }} className={styles.leftPoint}></div>
                <div style={{
                    ...pointStyle, top: imageObject.position.y + Math.floor(imageObject.size.height / 2),
                    left: (imageObject.position.x + imageObject.size.width),
                    cursor: "ew-resize"
                }} className={styles.rightPoint}></div>
                <div style={{
                    ...pointStyle, top: imageObject.position.y + imageObject.size.height,
                    left: imageObject.position.x,
                    cursor: "nesw-resize"
                }} className={styles.leftDownPoint}></div>
                <div style={{
                    ...pointStyle, top: imageObject.position.y + imageObject.size.height,
                    left: imageObject.position.x + Math.floor(imageObject.size.width / 2),
                    cursor: "ns-resize"
                }} className={styles.downPoint}></div>
                <div style={{
                    ...pointStyle, top: imageObject.position.y + imageObject.size.height,
                    left: imageObject.position.x + imageObject.size.width,
                    cursor: "nwse-resize"
                }} className={styles.rightDownPoint}></div>
                <img style={imageObjectStyles} className={styles.slideObject} src={`${imageObject.src}`} />
            </>
        )
    }
}

export {
    ImageObject
}