import type { Product, ProductFilter } from "@/lib/types";

export function filterProducts(all: Product[], f: ProductFilter): Product[] {
    const q = f.query?.toLowerCase() ?? "";
    return all.filter((p) => {
        const matchesQuery  = q ? p.name.toLowerCase().includes(q) : true;
        const matchesId     = f.byId ? p.id.toLowerCase().includes(f.byId.toLowerCase()) : true;
        const matchesType   = f.type === "all" ? true : p.type === f.type;
        const matchesPrice  = p.price >= f.priceMin && p.price <= f.priceMax;
        const matchesStatus = f.status === "all" ? true : p.status === f.status;
        return matchesQuery && matchesId && matchesType && matchesPrice && matchesStatus;
    });
}
