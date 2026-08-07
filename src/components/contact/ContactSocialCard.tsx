import type {SocialContactI} from "../../interfaces";
import {NavLink} from "react-router";
import type {ComponentType, SVGProps} from "react";
import {ExternalLink} from "lucide-react";

export default function ContactSocialCard({socialContact}: { socialContact: SocialContactI }) {

    const IconComp: ComponentType<SVGProps<SVGSVGElement>> = socialContact.icon

    return (
        <NavLink to={socialContact.link} className='social-card' target={'_blank'}>
            <div className='social-icon'>
                <IconComp width={'56px'} height={'56px'}/>
            </div>
            <div>
                <div className='social-network'>
                    <div className='social-name garet-normal fs-l'>
                        {socialContact.name}
                        <ExternalLink className='link-arrow'/>
                    </div>
                </div>
                <div className='social-phrase inter-text'>
                    <p>{socialContact.phrase}</p>
                </div>
            </div>
        </NavLink>
    )
}