import type {ProjectI} from "../interfaces";
import dummyProjects from '../assets/site-images/project-img.webp'
import {css, git, js, mongodb, nodeJs} from "./stack.data.ts";


export const projects: ProjectI[] = [
    {
        id: 1,
        title: 'Próximamente',
        description: 'Proyectos increíbles que harán buena muestara de mis capacidades',
        start: '01-01-2026',
        end: '01-01-2027',
        images: [dummyProjects],
        link: 'https://Próximamente.com',
        techStack: [nodeJs, css, js, git, mongodb]
    },
    {
        id: 2,
        title: 'Próximamente más proyectos',
        description: 'Más proyectos increíbles',
        start: '01-01-2026',
        end: '01-01-2027',
        images: [dummyProjects],
        link: 'https://Próximamente.com',
        techStack: [nodeJs, css, js, git, mongodb]
    }
]