import type {TechStackI} from "../interfaces";
import cssImage from '../assets/image-stack/HTML_y_CSS.png'
import jsImage from '../assets/image-stack/Insignia_de_Javascript.png'
import gitImage from '../assets/image-stack/GIT.png'
import mongoImg from '../assets/image-stack/BBDD.png'
import nodeImg from '../assets/image-stack/NodeJS.png'

export const css: TechStackI = {
    name: 'CSS',
    image: cssImage
}

export const js: TechStackI = {
    name: 'JavaScript',
    image: jsImage
}

export const git: TechStackI = {
    name: 'Git',
    image: gitImage
}

export const mongodb: TechStackI = {
    name: 'MongoDB',
    image: mongoImg
}

export const nodeJs: TechStackI = {
    name: 'NodeJs',
    image: nodeImg
}

export const tecnologies: TechStackI[] = [css, js, git, mongodb, nodeJs]

