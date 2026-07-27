import {sections} from "../../data";

export default function ProjectsContent() {
    return(
        <div className='projects d-grid span-right hide-sm'>
            <div className='projects-image'>
                <img src={sections[1].imgUrl} alt="Imagen sobre mi"/>
            </div>
            <ProjectsContainer/>
        </div>
    )
}

function ProjectsContainer() {
    return(
        <>
        </>
    )
}