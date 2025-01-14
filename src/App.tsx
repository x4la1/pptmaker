import { BrowserRouter, Route, Routes } from 'react-router'
import styles from './App.module.css'
import { HistoryType } from './utils/hitory'
import { HistoryContext } from './view/Hooks/historyContext'
import { useAppSelector } from './view/Hooks/useAppSelector'
import { SlideList } from './view/SlideList/SlideList'
import { TopPanel } from './view/TopPanel/TopPanel'
import { Workspace } from './view/Workspace/Workspace'
import { SlidePlayer } from './view/SlidePlayer/SlidePlayer'

type AppProps = {
  history: HistoryType
}


function App({ history }: AppProps) {
  const editor = useAppSelector(state => state)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <HistoryContext.Provider value={history}>
            <TopPanel />
            <div className={styles.container}>
              <SlideList slides={editor.presentation.slides} selection={editor.selection}></SlideList>
              <Workspace slide={editor.presentation.slides.find(slide => slide.id == editor.selection.selectedSlideId) || null}
                selectedObjectId={editor.selection.selectedObjectId || null}/>
            </div>
          </HistoryContext.Provider>} />
        <Route path='/player' element={<SlidePlayer/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
