import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <CssBaseline/>
            <App/>
            <ToastContainer/>
        </BrowserRouter>
    </StrictMode>,
)
