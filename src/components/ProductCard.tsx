import type { Product } from "@/lib/types";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { formatTHB } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export default function ProductCard({ p }: { p: Product }) {
    const add = useCartStore((s) => s.add)

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <img src={p.thumbnailUrl} alt={p.name} className="w-full object-cover rounded" />
                <CardTitle className="mt-3 text-base font-semibold leading-tight">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{formatTHB(p.price)}</CardContent>
            <CardFooter className="mt-auto flex items-center gap-2">
                <Button variant="secondary">More Detail</Button>
                <Button onClick={() => add(p)}>Add to Cart</Button>
            </CardFooter>
        </Card>
    )
}