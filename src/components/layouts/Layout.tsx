import type {ReactElement} from "react";
import Footer from "../footer/Footer.tsx";
import {Outlet} from "react-router";
import Header from "../header/Header.tsx";
import ThemeButton from "./ThemeButton.tsx";

const Layout = (): ReactElement => {
    return (
        <>
            <ThemeButton/>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;