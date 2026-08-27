import type {SocialContactI} from "../../interfaces";
import {NavLink} from "react-router";
import {ExternalLink} from "lucide-react";
import {useTheme} from "../../core/context";

export default function ContactSocialCard({socialContact}: { socialContact: SocialContactI }) {

    const {resolvedTheme} = useTheme();

    return (
        <NavLink to={socialContact.link} className='social-card' target={'_blank'}>
            <div className='social-icon'>
                {socialContact.icon(resolvedTheme)}
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