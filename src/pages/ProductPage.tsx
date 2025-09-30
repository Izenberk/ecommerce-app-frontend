import ProductCard from "@/components/ProductCard";
import SearchFilterBar from "@/components/SearchFilterBar";
import { useProductsStore } from "@/store/products";
import { useEffect, useMemo, useRef } from "react";
import { filterProducts } from "@/store/productSelectors";

export default function ProductPage() {
    const all = useProductsStore(s => s.all);
    const filter = useProductsStore(s => s.filter);
    const visibleCount = useProductsStore(s => s.visibleCount);
    const loadMore = useProductsStore(s => s.loadMore);

    const filtered = useMemo(() => filterProducts(all, filter), [all, filter]);
    const products = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

    const sentinelRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const io = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting && products.length < filtered.length) {
                loadMore();
                }
            }
            }, { root: null, rootMargin: "200px 0px", threshold: 0 });

        io.observe(el);
        return () => io.disconnect();
    }, [filtered.length, loadMore, products.length]);


    return (
        <div className="space-y-6">
            <SearchFilterBar />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((p) =>
                    <ProductCard key={p.id} p={p} />
                )}
            </div>
            <div ref={sentinelRef} className="h-8" />
        </div>
    )
}