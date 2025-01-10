import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store/redux/store.ts'
import { Provider } from 'react-redux'
import { initHistory } from './utils/hitory.ts'


const root = createRoot(document.getElementById('root')!)

function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App history={initHistory(store)} />
            </Provider>
        </StrictMode>
    )
}

render()
