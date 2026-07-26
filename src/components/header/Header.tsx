import Navbar from "./Navbar.tsx";
import type {ReactElement} from "react";
import LogoHeader from "./LogoHeader.tsx";
import {useLocation} from "react-router";
import PageTitle from "../layouts/PageTitle.tsx";

const Header = (): ReactElement => {

    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className={`header ${isHome ? 'home-header' : 'pages-header'}`}>
            <div className={`header-section ${isHome ? 'home-header-section' : 'page-header-section'}`}>
                <LogoHeader variant={isHome ? 'home' : 'page'}/>
                <PageTitle/>
                <Navbar variant={isHome ? 'home' : 'page'}/>
            </div>
        </header>
    )
}

export default Header;