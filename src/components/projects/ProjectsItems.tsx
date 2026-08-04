import type {ReactElement} from "react";
import type {ProjectI, TechStackI} from "../../interfaces";
import {NavLink} from "react-router";

export default function ProjectsItem({project}: { project: ProjectI }): ReactElement {
    return (
        <div className='d-grid columns-2'>
            <div className='d-flex column justify-between gap-4 p-1 garet-normal'>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                    <NavLink to={`/projects/${project.id}`}
                             className="garet-normal fs-xl text-primary bold-text link">{project.title}</NavLink>
                    {
                        <div className='d-flex justify-start gap-2 align-center m-0 wrap'>
                            <time className="fs-m fw-600 bg-dark-grey text-secondary"
                                  style={{padding: '0.5em 0.75em', borderRadius: '25px'}}
                                  dateTime={project.start}>Comienzo: {project.start}</time>
                            <time className="fs-m fw-600 bg-dark-grey text-secondary"
                                  style={{padding: '0.5em 0.75em', borderRadius: '25px'}}
                                  dateTime={project.end}>Fin: {project.end !== '' ? project.end : 'En curso'}</time>
                        </div>
                    }
                    <div>
                        <p className="fs-l fw-500 mb-1">Stack:</p>
                        <div style={{display: 'flex', gap: '1em'}}>
                            {
                                project && project.techStack.length > 0 ? (project.techStack.map((tech: TechStackI) => {
                                    const Icon = tech.icon;
                                    return (
                                        <Icon width={'1.2em'} height={'1.2em'}/>
                                    )
                                })) : (
                                    <p>Stack por definir</p>
                                )
                            }
                        </div>
                    </div>
                </div>
                <p className="fs-l garet-normal">{project.description}</p>
                <p className="fs-l garet-normal bold-text">Link: <NavLink
                    className="link"
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
    )
}
