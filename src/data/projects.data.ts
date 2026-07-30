import type {ProjectI} from "../interfaces";
import img1Ilisat from '../assets/projects-imgs/ilisat/capture-hero-ilisat.webp'
import img2Ilisat from '../assets/projects-imgs/ilisat/captura-hro-tienda-ilisat.webp'
import img1Ray from '../assets/projects-imgs/rayeames/ray-eames.webp'
import img2Ray from '../assets/projects-imgs/rayeames/Captura-de-pantalla-2025-11-22-143926-e1764076745128.webp'
import {css, git, js, mongodb, nodeJs} from "./stack.data.ts";


export const projects: ProjectI[] = [
    {
        id: 1,
        title: 'Ilisat SL',
        description: 'Puesta en marcha de tienda online y promoción de la misma',
        start: '01-10-2025',
        end: '01-11-2025',
        images: [img1Ilisat, img2Ilisat],
        link: 'https://ilisat.com/',
        techStack: [nodeJs, css, js]
    },
    {
        id: 2,
        title: 'Ray Eames Memorial',
        description: 'Proyecto de aprendizaje en WordPress con temática en la diseñadora de producto Ray Eames',
        start: '01-10-2025',
        end: '',
        images: [img1Ray, img2Ray],
        link: 'https://rayeamesmemorial.com',
        techStack: [mongodb, git, js, css]
    }
]