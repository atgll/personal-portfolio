import LogoFooter from "./LogoFooter.tsx";
import Policies from "./Policies.tsx";

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='wrapper'>
                <div className='footer-display'>
                    <LogoFooter/>
                    <Policies/>
                </div>
            </div>
        </footer>
    )
}