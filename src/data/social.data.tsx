import type {SocialContactI} from "../interfaces";
import {Github, Linkedin, Whatsapp} from '@thesvg/react'

export const LinkedinNet: SocialContactI = {
    name: 'Linkedin',
    icon: () => <Linkedin/>,
    link: 'https://www.linkedin.com/in/ángel-torres-guilló-371118241',
    phrase: 'Conoce mi trayectoria'
}

export const WhatsappNet: SocialContactI = {
    name: 'Whatsapp',
    icon: () => <Whatsapp/>,
    link: 'https://wa.me/34622035924',
    phrase: '¿Hablamos?'
}

export const GitHubNet: SocialContactI = {
    name: 'GitHub',
    icon: (theme) => <Github variant= {theme}/>,
    link: 'https://github.com/atgll',
    phrase: 'Mira lo que construyo'


}

export const socialNetworks: SocialContactI[] = [
    LinkedinNet,
    WhatsappNet,
    GitHubNet
]