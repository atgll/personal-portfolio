import type {TechStackI} from "../interfaces";
import {CssNew, Javascript, Git, Mongodb, Mongoose, Nodejs, React, Typescript, Bun, Vercel} from '@thesvg/react';


export const css: TechStackI = {
    name: 'CSS',
    icon: CssNew
}

export const js: TechStackI = {
    name: 'JavaScript',
    icon: Javascript
}

export const git: TechStackI = {
    name: 'Git',
    icon: Git
}

export const mongodb: TechStackI = {
    name: 'MongoDB',
    icon: Mongodb
}
export const mongooseTech: TechStackI = {
    name: 'Mongoose',
    icon: Mongoose
}
export const nodeJs: TechStackI = {
    name: 'NodeJs',
    icon: Nodejs
}

export const reactJs: TechStackI = {
    name: 'React',
    icon: React
}

export const typeScript: TechStackI = {
    name: 'TypeScript',
    icon: Typescript
}

export const bun: TechStackI = {
    name: 'Bun',
    icon: Bun
}

export const vercel: TechStackI = {
    name: 'Vercel',
    icon: Vercel
}

export const technologies: TechStackI[] = [css, js, git, mongodb, mongooseTech, nodeJs, reactJs, typeScript, bun, vercel]

