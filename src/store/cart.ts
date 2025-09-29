import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { CartItem, Product } from "@/lib/types"

interface CartState {
    items: Record<string, CartItem>
    add: (product: Product, qty?: number) => void
    remove: (productId: string) => void
    increment: (productId: string) => void
    decrement: (productId: string) => void
    clear: () => void
    totalQuantity: () => number
    totalPrice: () => number
}

export const useCartStore = create<CartState>()(
    devtools((set, get) => ({
        items: {},

        add: (product, qty = 1) =>
            set((state) => {
                const existing = state.items[product.id]
                const quantity = (existing?.quantity ?? 0) + qty
                return { items: { ...state.items, [product.id]: { product, quantity } } }
            }),

        remove: (productId) =>
            set((state) => {
                const next = { ...state.items }
                delete next[productId]
                return { items: next }
            }),

        increment: (productId) =>
            set((state) => {
                const item = state.items[productId]
                if (!item) return state
                return { items: { ...state.items, [productId]: { ...item, quantity: item.quantity + 1 } } }
            }),

        decrement: (productId) =>
            set((state) => {
                const item = state.items[productId]
                if (!item) return state
                const nextQty = Math.max(0, item.quantity - 1)
                const next = { ...state.items }
                if (nextQty === 0) delete next[productId]
                else next[productId] = { ...item, quantity: nextQty }
                return { items: next }
            }),

        clear: () => set({ items: {} }),

        totalQuantity: () => Object.values(get().items).reduce((acc, it) => acc + it.quantity, 0),

        totalPrice: () => Object.values(get().items).reduce((acc, it) => acc + it.quantity * it.product.price, 0),
    }))
)