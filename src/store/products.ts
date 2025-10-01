import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product, ProductFilter } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { shallow } from 'zustand/shallow';

interface ProductState {
    all: Product[];
    filter: ProductFilter;
    pageSize: number;
    visibleCount: number;
    setFilter: (partial: Partial<ProductFilter>) => void;
    resetFilter: () => void;
    filtered: () => Product[];
    visible: () => Product[];
    loadMore: () => void;
    resetPagination: () => void;
}

const INITIAL_FILTER: ProductFilter = {
    query: '',
    byId: '',
    type: 'all',
    priceMin: 0,
    priceMax: 2000,
    status: 'all',
} as const;

function normalizePriceRange(
    prev: ProductFilter,
    patch: Partial<ProductFilter>
    ): Pick<ProductFilter, "priceMin" | "priceMax"> {
    const min = patch.priceMin ?? prev.priceMin;
    const max = patch.priceMax ?? prev.priceMax;
    // Ensure min <= max; swap if needed
    return min <= max ? { priceMin: min, priceMax: max } : { priceMin: max, priceMax: min };
}

export const useProductsStore = create<ProductState>() (
    devtools((set, get) => ({
        all: MOCK_PRODUCTS,
        filter: { ...INITIAL_FILTER },
        pageSize: 8,
        visibleCount: 8,

        setFilter: (partial) => {
            const prev = get().filter;

            // If price bounds were touched, keep the range valid
            let next: ProductFilter;
            if ("priceMin" in partial || "priceMax" in partial) {
                const fixed = normalizePriceRange(prev, partial);
                next = { ...prev, ...partial, ...fixed };
            } else {
                next = { ...prev, ...partial };
            }

            // Avoid no-op updates (prevents unnecessary re-renders)
            if (shallow(prev, next)) return;

            // Single set to prevent double notifications
            set({
                filter: next,
                visibleCount: get().pageSize, // reset pagination whenever the filter actually changes
            });
        },

        resetFilter: () =>
            set({
                filter: { ...INITIAL_FILTER },
                visibleCount: get().pageSize, // ✅ fix: no magic number, uses current pageSize
            }),

        loadMore: () => set({ visibleCount: get().visibleCount + get().pageSize }),

        resetPagination: () => set({ visibleCount: get().pageSize }),

        // handy guard to stop eager loading
        hasMore: () => get().visibleCount < get().filtered().length,
    }))
)