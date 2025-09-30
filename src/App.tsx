import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import NavBar from "./components/NavBar";


export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-background text-foreground">
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  )
}