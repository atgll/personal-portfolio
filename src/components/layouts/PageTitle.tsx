import type {ReactElement} from "react";
import {/*NavLink*/ useLocation} from "react-router";
/*import type {SocialContactI} from "../../interfaces";
import {socialNetworks} from "../../data/social.data.ts";*/

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
            <h3 className="garet-splash text-center" style={{letterSpacing: '0.05em', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em'}}>
                {isHome ? '' : title}
            </h3>
        </div>
    )
}