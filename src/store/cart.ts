import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { CartItem, Product } from "@/lib/types"

interface CartState {
    items: Record<string, CartItem>
    add: (product: Product, qty?: number) => void
}