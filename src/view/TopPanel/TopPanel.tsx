import styles from './TopPanel.module.css'
import { Button } from '../../components/Button/Button.tsx'
import React, { ChangeEvent, useEffect, useRef, useContext } from 'react'
import { EditorType } from '../../store/EditorType.ts'
import Ajv from 'ajv'
import jsPDF from 'jspdf'
import { getSchema } from '../../utils/schema.ts'
import { useAppActions } from '../Hooks/useAppActions.ts'
import { useAppSelector } from '../Hooks/useAppSelector.ts'
import { HistoryContext } from '../Hooks/historyContext.ts'
import "../../assets/fonts/Roboto.js"
import { useNavigate } from 'react-router'
function TopPanel() {

    const store: EditorType = useAppSelector((editor => editor))
    const { createSlide,
        removeSlide,
        changePresentationName,
        createTextObject,
        createImageObject,
        deleteSlideObject,
        changeBackgroundColor,
        changeBackgroundImage,
        setEditor
    } = useAppActions()

    const onChangePresentationName: React.ChangeEventHandler = (event) => {
        changePresentationName((event.target as HTMLInputElement).value)
    }



    const imageObjectInput = useRef<HTMLInputElement | null>(null)

    function onCreateImageObject() {
        if (imageObjectInput.current) {
            imageObjectInput.current.click()
        }
    }

    function imageObjectChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = (reader.result as string)
                createImageObject(base64String)
            }
            reader.readAsDataURL(file)
        }
    }

    function onDeleteObject() {
        deleteSlideObject()
    }

    const colorInput = useRef<HTMLInputElement | null>(null)
    function onChangeBackgronudColor() {
        if (colorInput.current) {
            colorInput.current.click()
        }
    }

    function colorChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const color = event.target.value
        changeBackgroundColor(color)
    }

    const imageBgInput = useRef<HTMLInputElement | null>(null)

    function onChangeBackgroundImage() {
        if (imageBgInput.current) {
            imageBgInput.current.click()
        }
    }

    function backgroundImageChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                changeBackgroundImage(base64String)
            }
            reader.readAsDataURL(file)
        }
    }

    function onDownloadPresentation() {
        const jsonString = JSON.stringify(store, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })

        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = 'presentation.json'
        link.click()

        URL.revokeObjectURL(url)
    }

    const uploadFile = useRef<HTMLInputElement | null>(null)

    function onUploadPresentation() {
        if (uploadFile.current) {
            uploadFile.current.click()
        }
    }


    function jsonChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const ajv = new Ajv()
        const schema = getSchema()
        const validatePresentation = ajv.compile(schema)
        const file = event?.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                try {
                    const presentationData: EditorType = JSON.parse(reader.result as string)
                    const isValid = validatePresentation(presentationData)

                    if (!isValid) {
                        console.error("Ошибки валидации:", validatePresentation.errors)
                        alert("Неверный формат файла презентации.")
                        return
                    }
                    setEditor(presentationData)

                } catch (error) {
                    console.error('Ошибка при загрузке файла презентации:', error)
                    alert('Неверный формат файла презентации.')
                }
            }
            reader.readAsText(file)
        }

    }



    const history = useContext(HistoryContext)

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if ((event.ctrlKey || event.metaKey ) && event.code === "KeyZ") {
                event.preventDefault()
                onUndo()
            }

            if ((event.ctrlKey || event.metaKey ) && event.code === "KeyY") {
                event.preventDefault()
                onRedo()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => document.removeEventListener("keydown", handleKeyDown)
        
    }, []) 



    function onUndo() {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onDownloadPdf() {
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [1122, 780]
        })
        store.presentation.slides.forEach((slide, index) => {
            if (slide.background.type === "Solid") {
                pdf.setFillColor(slide.background.color)
                pdf.rect(0, 0, 1122, 780, "F")
            } else if (slide.background.type === "Image") {
                pdf.addImage(slide.background.src, "JPEG", 0, 0, 1122, 780)
            }

            slide.elements.forEach((element) => {
                if (element.type === "TextObject") {
                    pdf.setFont("Roboto");
                    pdf.setFontSize(element.fontSize)
                    pdf.setTextColor(element.fontColor || "#000000");
                    pdf.text(element.value, element.position.x, element.position.y)

                } else if (element.type === "ImageObject") {
                    pdf.addImage(element.src, "JPEG", element.position.x, element.position.y, element.size.width, element.size.width);
                }
            })
            if (index < store.presentation.slides.length - 1) {
                pdf.addPage()
            }
        })
        pdf.save(`${store.presentation.name}.pdf`)
    }

    const navigate = useNavigate()

    return (
        <div className={styles.topPanel}>
            <input type="text" className={styles.topPanel__titleInput} value={store.presentation.name} onChange={onChangePresentationName} />
            <input type="file" ref={imageObjectInput} className={styles.input} onChange={imageObjectChangeHandler} accept='.jpg, .jpeg, .png, .gif' />
            <input type="file" ref={imageBgInput} className={styles.input} onChange={backgroundImageChangeHandler} accept='.jpg, .jpeg, .png, .gif' />
            <input type="file" ref={uploadFile} className={styles.input} onChange={jsonChangeHandler} accept='.json' />
            <input type="color" ref={colorInput} onChange={colorChangeHandler} className={styles.color} />
            <div className={styles.topPanel__buttons}>
                <Button className={styles.topPanel__button} type='text' value={'Добавить слайд'} onClick={createSlide} />
                <Button className={styles.topPanel__button} type='text' value={'Удалить слайд'} onClick={removeSlide} />
                <Button className={styles.topPanel__button} type='text' value={'Добавить текст'} onClick={createTextObject} />
                <Button className={styles.topPanel__button} type='text' value={'Добавить картинку'} onClick={onCreateImageObject} />
                <Button className={styles.topPanel__button} type='text' value={'Удалить объект'} onClick={onDeleteObject} />
                <Button className={styles.topPanel__button} type='text' value={'Цвет фона'} onClick={onChangeBackgronudColor} />
                <Button className={styles.topPanel__button} type='text' value={'Фоновое изображение'} onClick={onChangeBackgroundImage} />
                <Button className={styles.topPanel__button} type='text' value={'Скачать'} onClick={onDownloadPresentation} />
                <Button className={styles.topPanel__button} type='text' value={'Загрузить'} onClick={onUploadPresentation} />
                <Button className={styles.topPanel__button} type='text' value={'Скачать PDF'} onClick={onDownloadPdf} />
                <Button className={styles.topPanel__button} type='text' value={'Undo'} onClick={onUndo} />
                <Button className={styles.topPanel__button} type='text' value={'Redo'} onClick={onRedo} />
                <Button className={styles.topPanel__button} type='text' value={'Слайд-шоу'} onClick={() => navigate('/player')} />
            </div>
        </div>
    )
}

export {
    TopPanel
}