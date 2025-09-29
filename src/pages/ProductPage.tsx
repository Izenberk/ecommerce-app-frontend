import ProductCard from "@/components/ProductCard";
import SearchFilterBar from "@/components/SearchFilterBar";
import { useProductsStore } from "@/store/products";
import { useEffect, useRef } from "react";

export default function ProductPage() {
    const visible = useProductsStore((s) => s.visible)
    const loadMore = useProductsStore((s) => s.loadMore)

    const sentinelRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const el = sentinelRef.current
        if (!el) return
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) loadMore()
            })
        })
        io.observe(el)
        return () => io.disconnect()
    }, [loadMore])

    const products = visible()

    return (
        <div className="space-y-6">
            <SearchFilterBar />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                    <ProductCard key={p.id} p={p} />
                ))}
            </div>
            <div ref={sentinelRef} className="h-8" />
        </div>
    )
}