import type {ReactElement} from "react";
import type {ProjectI, TechStackI} from "../../interfaces";
import {NavLink} from "react-router";

export default function ProjectsItem({project}: { project: ProjectI }): ReactElement {
    return (
        <div className='projects-item'>
            <div className='d-grid columns-2'>
                <div className='d-flex column justify-between gap-2'>
                    <div style={{marginBottom: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <NavLink to={`/projects/${project.id}`} className="fs-xxl text-primary fw-600 link"
                                 style={{justifySelf: 'start'}}>{project.title}</NavLink>
                        {
                            <div className='d-flex justify-start gap-2 align-center m-0'>
                                <time className="fs-m fw-600 bg-dark-grey text-secondary" style={{padding: '0.5em 0.75em', borderRadius: '25px'}}
                                      dateTime={project.start}>Comienzo: {project.start}</time>
                                <time className="fs-m fw-600 bg-dark-grey text-secondary" style={{padding: '0.5em 0.75em', borderRadius: '25px'}}
                                      dateTime={project.end}>Fin: {project.end !== '' ? project.end : 'En curso'}</time>
                            </div>
                        }
                        <div>
                            <p className="fs-l fw-500 mb-1">Stack:</p>
                            <div>
                                {
                                   project && project.techStack.length > 0 ? (project.techStack.map((tech: TechStackI) => (
                                        <img className='zoom-effect' style={{width: '2rem', margin: '0 1rem 0 0'}}
                                             src={tech.image} alt={`${tech.name} image`}/>))) : (
                                                 <p>Stack por definir</p>
                                   )
                                }
                            </div>
                        </div>
                    </div>
                    <p className="fs-l">{project.description}</p>
                    <p className="fs-l fw-500">Link: <NavLink
                        className="link fs-l"
                        to={`${project.link}`}>
                        {project.link?.slice(8)}
                    </NavLink>
                    </p>
                </div>
                <NavLink to={`/projects/${project.id}`} style={{}}>
                    <img style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                         src={project.images[0]}/>
                </NavLink>

            </div>
        </div>
    )
}
