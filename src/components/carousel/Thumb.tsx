type PropType = {
    selected: boolean
    onClick: () => void
    image: string;
    title: string;
}

export const Thumb = (props: PropType) => {
    const { selected, onClick } = props

    return (
        <div
            className={'embla-thumbs__slide'.concat(
                selected ? ' embla-thumbs__slide--selected' : ''
            )}

        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__slide__number"
                style={{backgroundImage: `url(${props.image})`}}
            >
            </button>
            <p className='embla-thumbs__slide__title'>{props.title}</p>
        </div>
    )
}

export default Thumb;