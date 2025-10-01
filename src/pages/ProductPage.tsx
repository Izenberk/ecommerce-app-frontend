import ProductCard from "@/components/ProductCard";
import SearchFilterBar from "@/components/SearchFilterBar";
import { useProductsStore } from "@/store/products";
import { useEffect, useMemo } from "react";
import { filterProducts } from "@/store/productSelectors";
import { useSearchParams } from "react-router-dom";

export default function ProductPage() {
    const all = useProductsStore((s) => s.all);
    const filter = useProductsStore((s) => s.filter);
    const pageSize = useProductsStore((s) => s.pageSize); // 8

    const [params, setParams] = useSearchParams();

    // read page from URL, default to 1
    const rawPage = Number(params.get("page") || "1");
    const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;

    const filtered = useMemo(() => filterProducts(all, filter), [all, filter]);
    const total = filtered.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, pageCount); // clamp if URL is out of range

    // correct bad page in URL (e.g., after filters shrink result set)
    useEffect(() => {
        if (safePage !== page) {
        const next = new URLSearchParams(params);
        next.set("page", String(safePage));
        setParams(next, { replace: true });
        }
    }, [page, safePage, params, setParams]);

    // when filter changes, jump back to page 1
    useEffect(() => {
        const next = new URLSearchParams(params);
        if (next.get("page") !== "1") {
        next.set("page", "1");
        setParams(next, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const start = (safePage - 1) * pageSize;
    const end = Math.min(start + pageSize, total);
    const products = useMemo(() => filtered.slice(start, end), [filtered, start, end]);

    const goto = (p: number) => {
        const next = new URLSearchParams(params);
        next.set("page", String(p));
        setParams(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="space-y-6">
        <SearchFilterBar />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
            Showing <strong>{total === 0 ? 0 : start + 1}</strong>–<strong>{end}</strong> of{" "}
            <strong>{total}</strong>
            </span>
            <span>Page {safePage} / {pageCount}</span>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
            <ProductCard key={p.id} p={p} />
            ))}
        </div>

        {/* Pagination controls */}
        <div className="mt-6 flex items-center justify-center gap-2">
            <button
            onClick={() => goto(safePage - 1)}
            disabled={safePage <= 1}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
            >
            Prev
            </button>

            {/* simple numeric pages; for large counts you can replace with a compact pager */}
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
                key={n}
                onClick={() => goto(n)}
                className={`px-3 py-1 rounded-md border ${
                n === safePage ? "bg-primary text-primary-foreground" : ""
                }`}
                aria-current={n === safePage ? "page" : undefined}
            >
                {n}
            </button>
            ))}

            <button
            onClick={() => goto(safePage + 1)}
            disabled={safePage >= pageCount}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
            >
            Next
            </button>
        </div>
        </div>
    );
}
