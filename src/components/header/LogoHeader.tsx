import type {ReactElement} from "react";
import {NavLink} from "react-router";

const LogoHeader = ({variant}: { variant: 'home' | 'page' }): ReactElement => {

    const wrapperClass = variant === 'home' ? 'home-nav-logo nav-logo' : 'page-nav-logo nav-logo';

    return (
        <div className={wrapperClass}>
            <NavLink to='/' viewTransition={true} end>
                <h1 className='garet-splash logo'>ATG</h1>
            </NavLink>
            <p className='megrim thin-text text-center'>Desarrollo WEB | Full-Stack</p>
        </div>
    )
}

export default LogoHeader;