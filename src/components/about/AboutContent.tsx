import {sections} from "../../data";
import type {ReactElement, ReactNode} from "react";

export default function AboutContent() {
    return (
        <>
            <div className='about d-grid columns-2'>
                <div className="about-image">
                    <img className="greyscale" src={`${sections[0].imgUrl}`} alt="Imagen sobre mi"/>
                </div>
                <AboutText fontFamily='zen.new'>
                    {
                        texts.map((text: string) => (<AboutP fsize='fs-xl' font='zen-new' className={''} text={text}/>))
                    }
                </AboutText>
            </div>
        </>
    )
}

function AboutText({fontFamily, children}: {fontFamily: string; children?: ReactNode}): ReactElement {
    return (
        <div className={`about-text bg-light-blue ${fontFamily}`}>
            {children}
        </div>
    )
}

function AboutP({fsize, font, className, text}: {fsize: string; font: string; className: string; text: string}): ReactElement {
    return (
        <p className={`${fsize} ${font} ${className ?? ''}`}>
            {text}
        </p>
    )
}

const texts: string[] = [
    "Soy desarrollador web formado y en continuo aprendizaje, con raíces en Elche y una trayectoria previa de casi diez años en el sector del calzado. Esa etapa me enseñó el valor del esfuerzo, la constancia y el trabajo bien hecho, y hoy aplico esa misma mentalidad a cada proyecto digital que desarrollo.",

    "Tras el nacimiento de mi hijo, decidí dar un giro a mi vida profesional para dedicar más tiempo a mi familia y trabajar en algo que realmente me apasiona. El desarrollo web apareció gracias a mi pareja, y desde entonces se ha convertido en mi forma de unir creatividad, técnica y propósito.",

    "Creo Apps claras, estéticas y funcionales, pensadas para personas y orientadas a resultados. Me gustan los proyectos bien contados, las interfaces limpias y las soluciones que de verdad ayudan.",

    "Si buscas a alguien cercano, comprometido y con ganas de construir contigo, estás en el lugar adecuado."
]