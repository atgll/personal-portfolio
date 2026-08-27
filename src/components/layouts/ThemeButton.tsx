import {useTheme} from "../../core/context";
import {Lightbulb, LightbulbOff} from "lucide-react";
import {useEffect} from "react";

export default function ThemeButton() {

    const {resolvedTheme, toggleTheme} = useTheme()

    useEffect(() => {
        console.log("Theme changed...", resolvedTheme);
    }, [resolvedTheme]);

    return (
        <button onClick={toggleTheme} className='button-theme'>
            {resolvedTheme === 'light' ? <Lightbulb width={'32px'} height={'32px'}/> : <LightbulbOff width={'32px'} height={'32px'}/>}
        </button>
    )
}