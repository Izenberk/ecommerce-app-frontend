import { useTheme } from "@/app/providers/ThemeProvider";
import { Button } from "./ui/button";
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
        </Button>
    )
}