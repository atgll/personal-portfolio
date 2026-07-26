import Container from "../components/layouts/Container.tsx";
import type {ReactElement} from "react";
import CardsContainer from "../components/home/CardsContainer.tsx";
import type {SiteSectionI} from "../interfaces";
import CardLink from "../components/home/CardLink.tsx";
import {sections} from "../data";


const Home = (): ReactElement => {

    return (
        <>
            <Container>
                <CardsContainer>
                    {
                        sections.map((section: SiteSectionI) => (
                            <CardLink SiteSectionI={section} key={section.path}></CardLink>))
                    }
                </CardsContainer>
            </Container>
        </>
    )
}

export default Home;