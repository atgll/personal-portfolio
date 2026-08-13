import {NavLink} from "react-router";
import type {ReactElement} from "react";

const Navbar = ({variant}: {variant: 'home' | 'page'}): ReactElement => {

    const wrapperClass = variant === 'home' ? 'home-nav' : 'page-nav';

    return(
        <nav className={wrapperClass}>
            <ul className='d-flex gap-1 justify-start align-center inter-text fs-l'>
                <li><NavLink to='/' viewTransition={true} className='link' end>Home</NavLink></li>
                <li><NavLink to='/about' viewTransition={true} className='link' end>About</NavLink></li>
                <li><NavLink to='/projects' viewTransition={true} className='link' end>Projects</NavLink></li>
                <li><NavLink to='/contact' viewTransition={true} className='link' end>Contact</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;