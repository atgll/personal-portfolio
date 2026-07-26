import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import './index.css'
import Layout from "./components/layouts/Layout.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Projects from "./pages/Projects.tsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {path: '/', element: <Home/>},
            {path: '/about', element: <About/>},
            {path: '/contact', element: <Contact/>},
            {path: '/projects', element: <Projects/>},
        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)
