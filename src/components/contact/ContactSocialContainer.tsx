import {socialNetworks} from "../../data/social.data.ts";
import type {SocialContactI} from "../../interfaces";
import ContactSocialCard from "./ContactSocialCard.tsx";

export default function ContactSocialContainer() {
    return (
        <div className='contact-social-container inter-text'>
            <div className='d-flex column gap-1'>
                <h3 className='garet-title text-white fs-l'>¿Hablamos?</h3>
                <p className='inter-text text-white fs-m'>Si tienes una propuesta, un proyecto o una oportunidad profesional, cuéntame.</p>
            </div>
            <div className='social-cards-container'>
                {
                    socialNetworks.map((social: SocialContactI) => {
                        return (
                            <ContactSocialCard key={social.name} socialContact={social}/>
                        )
                    })
                }
            </div>
        </div>
    )
}