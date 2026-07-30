import type {ReactElement} from "react";
import type {ProjectI} from "../../interfaces";
import {NavLink} from "react-router";

export default function ProjectsItem({project}: { project: ProjectI }): ReactElement {
    return (
        <div className='projects-item'>
            <div className='d-grid columns-2'>
                <div className='d-flex column justify-between'>
                    <div className='p-3' style={{}}>
                        <NavLink to={`/projects/${project.id}`} className="fs-xxl text-primary fw-600 mb-1 link"
                                 style={{justifySelf: 'start'}}>{project.title}</NavLink>
                        {
                            <div className='d-flex justify-start gap-2 align-center m-0'>
                                <time className="fs-m bg-dark-grey text-secondary p-1"
                                      dateTime={project.start}>Start: {project.start}</time>
                                <time className="fs-m bg-dark-grey text-secondary p-1"
                                      dateTime={project.end}>End: {project.end !== '' ? project.end : 'En curso'}</time>
                            </div>
                        }
                    </div>
                    <p className="fs-l p-2">{project.description}</p>
                    <p className="fs-l fw-500 p-2">Link: <NavLink className="link fs-l"
                                                                  to={`${project.link}`}>{project.link?.slice(8)}</NavLink>
                    </p>
                </div>
                <NavLink to={`/projects/${project.id}`} style={{}}>
                    <img style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} src={project.images[0]}/>
                </NavLink>

            </div>
        </div>
    )
}
