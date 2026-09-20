import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HelmetProvider} from "react-helmet-async"
import {Provider} from "react-redux"
import { store } from './redux/store.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <HelmetProvider>
      <Provider store = {store}>
          <App />
       </Provider>
    </HelmetProvider>

  </StrictMode>
)