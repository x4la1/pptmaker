import { CSSProperties} from "react"
import { TextObjectType } from "../../store/PresentationType"
import styles from "./SlideObject.module.css"
import { useAppActions } from "../Hooks/useAppActions"


type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number
    isSelected: boolean,
}

function TextObject({ textObject, scale = 1, isSelected }: TextObjectProps) {
    let textObjectStyles: CSSProperties
    const {changeTextObjectValue} = useAppActions()

    const onChangeTextObjectValue: React.ChangeEventHandler = (event) => {
        changeTextObjectValue((event.target as HTMLInputElement).value)
        console.log(textObject.value)
    }

    let pointStyle: CSSProperties = {
        width: "8px",
        height: "8px",
        backgroundColor: "blue",
        position: "absolute",
        borderRadius: "50%",
        zIndex: "2",
    };

    if (scale != 1) {
        textObjectStyles = {
            color: `${textObject.fontColor}`,
            top: `${textObject.position.y * scale}px`,
            left: `${textObject.position.x * scale}px`,
            width: `${textObject.size.width * scale}px`,
            height: `${textObject.size.height * scale}px`,
            fontSize: `${textObject.fontSize * scale}px`,
            userSelect: 'none',
        }
        return (
            <textarea readOnly style={textObjectStyles} className={styles.smalltext} value={textObject.value} />
        )
    } else {
        textObjectStyles = {
            color: `${textObject.fontColor}`,
            top: `${textObject.position.y * scale}px`,
            left: `${textObject.position.x * scale}px`,
            width: `${textObject.size.width * scale}px`,
            height: `${textObject.size.height * scale}px`,
            fontSize: `${textObject.fontSize * scale}px`,
        }
        if (isSelected) {
            textObjectStyles.border = '3px dashed gray'
        } else {
            pointStyle = {
                display: "none"
            }
        }
        return (
            <>
                <div style={{
                    ...pointStyle, top: textObject.position.y,
                    left: textObject.position.x,
                    cursor: "nwse-resize"
                }} className={styles.leftUpPoint}></div>
                <div style={{
                    ...pointStyle, top: textObject.position.y,
                    left: (textObject.position.x + Math.floor(textObject.size.width / 2)),
                    cursor: "ns-resize"
                }} className={styles.upPoint}></div>
                <div style={{
                    ...pointStyle, top: textObject.position.y,
                    left: (textObject.position.x + textObject.size.width),
                    cursor: "nesw-resize"
                }} className={styles.rightUpPoint}></div>
                <div style={{
                    ...pointStyle, top: textObject.position.y + Math.floor(textObject.size.height / 2),
                    left: textObject.position.x,
                    cursor: "ew-resize"
                }} className={styles.leftPoint}></div>
                <div style={{
                    ...pointStyle, top: textObject.position.y + Math.floor(textObject.size.height / 2),
                    left: (textObject.position.x + textObject.size.width),
                    cursor: "ew-resize"
                }} className={styles.rightPoint}></div>
                <div style={{
                    ...pointStyle, top: textObject.position.y + textObject.size.height,
                    left: textObject.position.x,
                    cursor: "nesw-resize"
                }} className={styles.leftDownPoint}></div>
                <div style={{
                    ...pointStyle, top: textObject.position.y + textObject.size.height,
                    left: textObject.position.x + Math.floor(textObject.size.width / 2),
                    cursor: "ns-resize"
                }} className={styles.downPoint}></div>
                <div style={{
                    ...pointStyle, top: textObject.position.y + textObject.size.height,
                    left: textObject.position.x + textObject.size.width,
                    cursor: "nwse-resize"
                }} className={styles.rightDownPoint}></div>
                <textarea
                    style={textObjectStyles}
                    className={styles.text}
                    onChange={onChangeTextObjectValue}
                    defaultValue={textObject.value}
                />
            </>
        )
    }



}

export {
    TextObject
}