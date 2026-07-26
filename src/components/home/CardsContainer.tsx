import type {ReactElement, ReactNode} from "react";

export default function CardsContainer({children}: {children: ReactNode}): ReactElement {
    return(
        <div className="cards-container">
            {children}
        </div>
    )
}