import type {ReactElement} from "react";
import {NavLink} from "react-router";
import type {SiteSectionI} from "../../interfaces";

export default function CardLink({SiteSectionI}: {SiteSectionI: SiteSectionI}): ReactElement {

    return(
        <NavLink to={SiteSectionI.path} viewTransition={true} className={`card-home card-${SiteSectionI.path.replace('/', '')}`}>
            <figure className={`card-home-image`}>
                <div className='card-image-wrapper'>
                    <img src={SiteSectionI.imgUrl} alt={`${SiteSectionI.name} image`} className={`low-saturation hover-effect`}/>
                </div>
                <figcaption className='d-flex justify-center align-center'>
                    <p className='garet-normal fs-l fw-600'>{SiteSectionI.name.toUpperCase()}</p>
                </figcaption>
            </figure>
        </NavLink>
    )

}