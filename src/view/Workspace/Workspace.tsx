import { SlideType } from "../../store/PresentationType"
import { Slide } from "../Slide/Slide"
import styles from "./Workspace.module.css"

type WorkspaceProps = {
    slide: SlideType | null
    selectedObjectId: string | null
}

function Workspace({ slide, selectedObjectId }: WorkspaceProps) {
    return (
        <div className={styles.slide} key={slide?.id}>
            <Slide slide={slide} isSelected={true} selectedObjectId={selectedObjectId} />
        </div>
    )
}

export {
    Workspace
}