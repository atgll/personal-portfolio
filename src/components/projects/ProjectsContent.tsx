import {projects} from "../../data";
import {type ReactElement, type ReactNode} from "react";
import EmblaCarousel from "../carousel/Carousel.tsx";

export default function ProjectsContent(): ReactElement {
    return (
        <div className='projects hide-sm'>
            <ProjectsContainer>
                <EmblaCarousel projects={projects}
                               options={{
                                   loop: true,
                                   align: 'center'
                               }}/>
            </ProjectsContainer>
        </div>
    )
}

function ProjectsContainer({children}: {children?: ReactNode}): ReactElement {
    return (
        <div className='projects-text zen-antique bg-light-blue'>
            {children}
        </div>
    )
}




