import type {ComponentType, ReactNode, SVGProps} from "react";

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

export type Theme = 'light' | 'dark';

export type TheSvgIcon = (theme: Theme) => ReactNode;

export interface TechStackI {
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface SocialContactI {
    name: string;
    icon: TheSvgIcon;
    link: string;
    phrase: string;
}