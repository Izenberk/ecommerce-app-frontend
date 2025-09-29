import { useEffect, useState } from "react";


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (saved) return saved
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return prefersDark ? 'dark' : 'light'
    })

    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') root.classList.add('dark')
        else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
    )
}

import { createContext, useContext } from "react";

interface ThemeCtx {
    theme: 'light' | 'dark'
    setTheme: (t: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeCtx>({ theme: 'light', setTheme: () => {} })
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)