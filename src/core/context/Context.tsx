import {useContext, useState, createContext, type ReactNode, useEffect} from "react";

type ThemePreference = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface themeCntxtI {
    theme: ThemePreference;
    resolvedTheme: ResolvedTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<themeCntxtI | undefined>(undefined);

export function ThemeProvider({children}: { children: ReactNode }) {

    // Observamos el tema del navegador
    const getSystemTheme = (): ResolvedTheme => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const [theme, setTheme] = useState<ThemePreference>('system');
    const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (event: MediaQueryListEvent) => {
            setSystemTheme(event.matches ? 'dark' : 'light');
        }
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    const resolvedTheme = theme === 'system' ? systemTheme : theme;

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === 'system') {
                return systemTheme === 'dark' ? 'light' : 'dark';
            }

            return prev === 'dark' ? 'light' : 'dark';
        });
    };

    useEffect(() => {
        document.documentElement.dataset.theme = resolvedTheme;
    }, [resolvedTheme]);

    return (
        <ThemeContext.Provider value={{theme, resolvedTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme debe utilizarse dentro de ThemeProvider");
    }

    return context;
}