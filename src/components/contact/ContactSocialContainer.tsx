import {socialNetworks} from "../../data/social.data.ts";
import type {SocialContactI} from "../../interfaces";
import ContactSocialCard from "./ContactSocialCard.tsx";

export default function ContactSocialContainer() {
    return (
        <div className='contact-social-container inter-text'>
            <div>
                <h3 className='garet-title text-white'>¿Hablamos?</h3>
                <p className='inter-text text-white'>Si tienes una propuesta, un proyecto o una oportunidad profesional, cuéntame.</p>
            </div>
            <div className='social-cards-container'>
                {
                    socialNetworks.map((social: SocialContactI) => {
                        return (
                            <ContactSocialCard socialContact={social}/>
                        )
                    })
                }
            </div>
        </div>
    )
}