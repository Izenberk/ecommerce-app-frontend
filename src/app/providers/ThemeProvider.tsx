import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";

type ThemeMode = "light" | "dark" | "system";
type Resolved = "light" | "dark";

interface ThemeCtx {
    theme: ThemeMode;          // user preference this session
    resolvedTheme: Resolved;   // effective theme (after system)
    setTheme: (t: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeCtx>({
    theme: "system",
    resolvedTheme: "light",
    setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // No persistence: always start in "system"
    const [theme, setTheme] = useState<ThemeMode>("system");

    // Track OS preference (init + subscribe; supports older Safari API)
    const [prefersDark, setPrefersDark] = useState<boolean>(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const update = () => setPrefersDark(mq.matches);

        // keep in sync with OS changes
        if (mq.addEventListener) mq.addEventListener("change", update);
        else mq.addListener(update as any);

        return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", update);
        else mq.removeListener(update as any);
        };
    }, []);

    const resolvedTheme: Resolved = useMemo(() => {
        if (theme === "dark") return "dark";
        if (theme === "light") return "light";
        return prefersDark ? "dark" : "light"; // system
    }, [theme, prefersDark]);

    // Apply the resolved theme class ASAP (before paint if possible)
    useLayoutEffect(() => {
        const root = document.documentElement;
        if (resolvedTheme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");

        // Optional: make native UI (scrollbars, form controls) match
        root.style.colorScheme = resolvedTheme;
    }, [resolvedTheme]);

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
