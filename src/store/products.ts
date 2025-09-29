import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Product, ProductFilter } from '@/lib/types'
import { MOCK_PRODUCTS } from '@/data/mockProducts'

interface ProductState {
    all: Product[]
    filter: ProductFilter
    pageSize: number
    visibleCount: number
    setFilter: (partial: Partial<ProductFilter>) => void
    resetFilter: () => void
    filtered: () => Product[]
    visible: () => Product[]
    loadMore: () => void
    resetPagination: () => void
}

const INITIAL_FILTER: ProductFilter = {
    query: '',
    byId: '',
    type: 'all',
    priceMin: 0,
    priceMax: 10_000,
    status: 'all',
}

export const useProductsStore = create<ProductState>() (
    devtools((set, get) => ({
        all: MOCK_PRODUCTS,
        filter: INITIAL_FILTER,
        pageSize: 12,
        visibleCount: 12,

        setFilter: (partial) => {
            set({ filter: { ...get().filter, ...partial } })
            // whenever filter changes, reset pagination to top
            set({ visibleCount: get().pageSize })
        },

        resetFilter: () => set({ filter: INITIAL_FILTER, visibleCount: INITIAL_FILTER ? 12 : get().pageSize }),

        filtered: () => {
            const { all, filter } = get()
            return all.filter((p) => {
                const matchesQuery = filter.query
                    ? p.name.toLowerCase().includes(filter.query.toLowerCase())
                    : true
                const matchesId = filter.byId ? p.id.toLowerCase().includes(filter.byId.toLowerCase()) : true
                const matchesType = filter.type === 'all' ? true : p.type === filter.type
                const matchesPrice = p.price >= filter.priceMin && p.price <= filter.priceMax
                const matchesStatus = filter.status === 'all' ? true : p.status === filter.status
                return matchesQuery && matchesId && matchesType && matchesPrice && matchesStatus
            })
        },

        visible: () => get().filtered().slice(0, get().visibleCount),

        loadMore: () => set({ visibleCount: get().visibleCount + get().pageSize }),

        resetPagination: () => set({ visibleCount: get().pageSize }),
    }))
)