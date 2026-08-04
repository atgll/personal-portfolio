import type {ComponentType, SVGProps} from "react";

export interface SiteSectionI {
    path: string;
    imgUrl: string;
    name: string;
}

export interface ProjectI {
    id: number;
    title: string;
    description?: string;
    start?: string;
    end?: string;
    images: string[];
    link?: string;
    techStack: TechStackI[];
}

export interface TechStackI {
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}