type PresentationType = {
    id: string
    name: string
    slides: Array<SlideType>
}

type SlideObjectType = {
    id: string,
    position: {
        x: number,
        y: number
    },
    size: {
        width: number,
        height: number
    }
}



type TextObjectType = SlideObjectType & {
    value: string,
    type: "TextObject",
    fontFamily: string,
    fontColor: string,
    fontSize: number
}

type ImageObjectType = SlideObjectType & {
    src: string
    type: "ImageObject"
}
type SlideType = {
    id: string,
    elements: Array<TextObjectType | ImageObjectType>,
    background: BackgroundType
}

type BackgroundSolidType = {
    color: string,
    type: "Solid"
}

type BackgroundImageType = {
    src: string,
    type: "Image"
}

type BackgroundType = BackgroundImageType | BackgroundSolidType;

export type{
    BackgroundType,
    PresentationType,
    SlideType,
    TextObjectType,
    ImageObjectType
}