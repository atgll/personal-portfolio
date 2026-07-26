import type {ReactElement} from "react";
import Footer from "../footer/Footer.tsx";
import {Outlet} from "react-router";
import Header from "../header/Header.tsx";

const Layout = (): ReactElement => {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;