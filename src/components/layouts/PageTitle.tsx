import type {ReactElement} from "react";
import {useLocation} from "react-router";
import {tecnologies} from "../../data";
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
            <h2 className="garet-splash fs-xxl text-center" style={{letterSpacing: '0.05em'}}>
                {isHome ? tecnologies.map((tech: TechStackI) => (
                    <img className='zoom-effect' style={{width: '1em', margin: '0 1rem 0 0'}} src={tech.image} alt={`${tech.name} image`}/>)) : title}
            </h2>
        </div>
    )
}