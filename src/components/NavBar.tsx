import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "@/store/cart";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";


const logoUrl = '/paw-print.svg'

function ActiveLink({
    to,
    children,
    onClick,
    }: {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
    }) {
    return (
        <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            [
            "px-2 py-1 rounded-md text-sm transition-colors",
            isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")
        }
        >
        {children}
        </NavLink>
    );
}

export default function NavBar() {
    // Keep selector minimal to avoid unnecessary re-renders
    const qty = useCartStore((s) => s.totalQuantity());

    // Small optimization to avoid re-calculating badge content
    const cartBadge = useMemo(() => (qty > 99 ? "99+" : qty.toString()), [qty]);

    // Mobile Nav Open
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <Link to="/" className="font-bold tracking-tight">
                <div className="flex items-center gap-2">
                <img src={logoUrl} alt="Pet Supply Shop logo" className="w-5 h-5" />
                <span className="font-bold tracking-tight">Pet Supply Shop</span>
                </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-4">
            <ActiveLink to="/">Products</ActiveLink>

            <Link
                to="/cart"
                className="relative inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm text-muted-foreground hover:text-foreground"
                aria-label={`Cart, ${qty} items`}
            >
                <ShoppingCart className="h-5 w-5" />
                {qty > 0 && (
                    <span
                    className={[
                        "absolute -right-1 -top-1 min-w-4 h-4 px-1",
                        "rounded-full text-[10px] font-medium",
                        "bg-primary text-primary-foreground",
                        "flex items-center justify-center",
                    ].join(" ")}
                    aria-hidden="true"
                    >
                    {cartBadge}
                    </span>
                )}
            </Link>
            <ThemeToggle />
            </nav>

            {/* Mobile nav */}
            <div className="md:hidden flex items-center gap-4">
            {/* Cart button - always visible on mobile */}
            <Link
                to="/cart"
                aria-label={`Cart, ${qty} items`}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <ShoppingCart className="h-5 w-5" />
                {qty > 0 && (
                <span
                    className="absolute -right-1 -top-0.5 min-w-4 h-4 px-1 rounded-full text-[10px] font-medium bg-primary text-primary-foreground flex items-center justify-center"
                    aria-hidden="true"
                >
                    {cartBadge}
                </span>
                )}
            </Link>

            {/* Hamburger / Sheet menu */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                <div className="flex h-full flex-col">
                    <div className="px-4 pt-4 pb-3">
                    <SheetTitle className="text-sm text-muted-foreground">Menu</SheetTitle>
                    <div className="text-lg font-semibold leading-none">HugPaw Shop</div>
                    </div>
                    <Separator />
                    <nav className="flex-1 overflow-y-auto p-2">
                    <ActiveLink to="/" onClick={() => setOpen(false)}>
                        <span className="block px-3 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground text-base">
                        Products
                        </span>
                    </ActiveLink>
                    </nav>
                    <Separator />
                    <div className="p-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                    </div>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
        </header>
    );
}
