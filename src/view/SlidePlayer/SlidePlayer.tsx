import { useAppActions } from "../Hooks/useAppActions"
import { useAppSelector } from "../Hooks/useAppSelector"
import { useNavigate } from "react-router"
import { Slide } from "../Slide/Slide"
import styles from './SlidePlayer.module.css'
import { Button } from "../../components/Button/Button"

function SlidePlayer() {
    const navigate = useNavigate()
    const store = useAppSelector((store) => store)
    const { setNextSlide, setPreviousSlide } = useAppActions()

    

    return (

        <div className={styles.container}>
            <Button className="" type="text" value="exit" onClick={() => navigate('/')} />
            <Button className="" type="text" value="prev" onClick={setPreviousSlide} />
            <Button className="" type="text" value="next" onClick={setNextSlide} />
            <Slide
                scale={1.18}
                slide={store.presentation.slides.find((slide) => slide.id === store.selection.selectedSlideId) || null}
                isSelected={true}
                selectedObjectId={null}
            />
        </div>
    );
}

export { SlidePlayer };