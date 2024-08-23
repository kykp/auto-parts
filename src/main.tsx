import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './app'

import {StoreProvider} from "@/app/providers";
import {BrowserRouter} from 'react-router-dom';

// import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
)
