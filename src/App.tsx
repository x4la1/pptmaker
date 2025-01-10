import styles from './App.module.css'
import { HistoryType } from './utils/hitory'
import { HistoryContext } from './view/Hooks/historyContext'
import { useAppSelector } from './view/Hooks/useAppSelector'
import { SlideList } from './view/SlideList/SlideList'
import { TopPanel } from './view/TopPanel/TopPanel'
import { Workspace } from './view/Workspace/Workspace'

type AppProps = {
  history: HistoryType
}


function App({ history }: AppProps) {
  const editor = useAppSelector(state => state)

  return (
    <HistoryContext.Provider value={history}>
      <TopPanel ></TopPanel>
      <div className={styles.container}>
        <SlideList slides={editor.presentation.slides} selection={editor.selection}></SlideList>
        <Workspace slide={editor.presentation.slides.find(Slide => Slide.id == editor.selection.selectedSlideId) || null}
          selectedObjectId={editor.selection.selectedObjectId || null}></Workspace>
      </div>
    </HistoryContext.Provider>
  )
}

export default App
