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
    image: string;
}