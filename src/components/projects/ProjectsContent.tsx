import {projects} from "../../data";
import {type ReactElement, type ReactNode} from "react";
import EmblaCarousel from "../carousel/Carousel.tsx";

export default function ProjectsContent(): ReactElement {
    return (
            <ProjectsContainer>
                <EmblaCarousel projects={projects}
                               options={{
                                   loop: true,
                                   align: 'center'
                               }}/>
            </ProjectsContainer>
    )
}

function ProjectsContainer({children}: {children?: ReactNode}): ReactElement {
    return (
        <div className='projects'>
            {children}
        </div>
    )
}




