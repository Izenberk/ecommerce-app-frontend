import type { Product } from "@/lib/types";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { formatTHB } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export default function ProductCard({ p }: { p: Product }) {
    const add = useCartStore((s) => s.add);
    const hasDesc = Boolean(p.description && p.description.trim().length > 0);

    return (
        <Card className="h-full flex flex-col">
        <CardHeader>
            <img
            src={p.thumbnailUrl}
            alt={p.name}
            className="w-full aspect-square object-cover rounded"
            loading="lazy"
            />
            <CardTitle className="mt-3 text-base font-semibold leading-tight">
            {p.name}
            </CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
            {formatTHB(p.price)}
        </CardContent>

        <CardFooter className="mt-auto flex items-center gap-2">
            <Popover>
            <PopoverTrigger asChild>
                <Button
                variant="secondary"
                className="hover:cursor-pointer"
                disabled={!hasDesc}
                aria-label={hasDesc ? "View product details" : "No details available"}
                >
                More Detail
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="start"
                className="w-72 text-sm leading-relaxed"
            >
                <div className="space-y-2">
                <div className="font-medium">{p.name}</div>
                <p className="text-muted-foreground whitespace-pre-wrap max-h-48 overflow-auto">
                    {p.description ?? "No description available."}
                </p>
                </div>
            </PopoverContent>
            </Popover>

            <Button className="hover:cursor-pointer" onClick={() => add(p)}>
            Add to Cart
            </Button>
        </CardFooter>
        </Card>
    );
}
