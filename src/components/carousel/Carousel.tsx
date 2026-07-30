import {useCallback, useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from 'embla-carousel'
import Thumb from "./Thumb.tsx";
import type {ProjectI} from "../../interfaces";
import ProjectsItem from "../projects/ProjectsItems.tsx";

type PropType = {
    projects: ProjectI[]
    options?: EmblaOptionsType
}

const EmblaCarousel = (props: PropType) => {
    const {projects, options} = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()

        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                    {projects.map((project: ProjectI) => (
                        <div className="embla__slide" key={project.id}>
                            <ProjectsItem project={project}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla-thumbs">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container">
                        {projects.map((project: ProjectI, index) => (
                            <Thumb
                                key={project.id}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                image={project.images[0]}
                                title={project.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel;