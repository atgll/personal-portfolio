import ContactMessage from "./ContactMessage.tsx";
import ContactSocialContainer from "./ContactSocialContainer.tsx";

export default function ContactContent() {
    return (
        <div className='d-grid columns-2'>
            <ContactSocialContainer/>
            <ContactMessage/>
        </div>
    )
}