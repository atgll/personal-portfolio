import type {ProjectI} from "../interfaces";
import portfolioHome from '../assets/projects-imgs/portfolio/portfolio-home.webp'
import {bun, git, reactJs, typeScript, vercel} from "./stack.data.ts";


export const projects: ProjectI[] = [
    {
        id: 1,
        title: 'Portfolio ATG',
        description: 'Portfolio personal, centrado en una estética clara y limpia, una navegación fluida y un despliegue inteligente usando las plataformas y servicios más adecuados a cada necesidad',
        start: '10-07-2026',
        end: '',
        images: [portfolioHome],
        link: 'https://www.angeltorresweb.com/',
        techStack: [bun, typeScript, reactJs, git, vercel]
    }
]