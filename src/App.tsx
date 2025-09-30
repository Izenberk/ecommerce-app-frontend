import { Outlet, Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

export default function App() {
  const qty = useCartStore((s) => s.totalQuantity())
  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <Link to="/" className="font-bold">HugPaw Shop</Link>
            <nav className="flex items-center gap-2">
              <Button asChild variant="ghost"><Link to="/">Products</Link></Button>
              <Button asChild variant="ghost"><Link to="/cart">Cart ({qty})</Link></Button>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  )
}