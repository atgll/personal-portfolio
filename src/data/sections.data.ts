import type {SiteSectionI} from "../interfaces";
import aboutImg from '../assets/site-images/imagen-sobre-mi.webp';
import projectsImg from '../assets/site-images/project-img.webp';
import contactImg from '../assets/site-images/contact-img-ok.webp';

export const sections: SiteSectionI[] = [
    {
        path: '/sobremi',
        imgUrl: aboutImg,
        name: 'Sobre Mi'
    },
    {
        path: '/proyectos',
        imgUrl: projectsImg,
        name: 'Proyectos'
    },
    {
        path: '/contacto',
        imgUrl: contactImg,
        name: 'Contacto'
    }
]