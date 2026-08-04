import type {ReactElement} from "react";
import {useLocation} from "react-router";
import {technologies} from "../../data";
import type {TechStackI} from "../../interfaces";

export default function PageTitle(): ReactElement {

    const location = useLocation()

    const locationName = location.pathname

    const title = locationName.replace('/', '').charAt(0).toUpperCase() + locationName.slice(2);

    const isHome = location.pathname === '/'

    return (
        <div
            key={location.pathname}
            className={`${isHome ? 'section-title' : 'page-section-title'} d-flex align-center justify-center`}
            style={{width: 'fit-content'}}
        >
            <h2 className="garet-splash fs-xl text-center" style={{letterSpacing: '0.05em', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em'}}>
                {isHome ? technologies.map((tech: TechStackI) => {
                    const Icon = tech.icon;
                    return(
                            <Icon width={'1.2em'} height={'1.2em'}/>
                        )
                }) : title}
            </h2>
        </div>
    )
}