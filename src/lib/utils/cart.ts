import type { CartItemsMap, OrderItem } from "@/lib/types";

export function cartItemsToOrderItems(map: CartItemsMap): OrderItem[] {
    return Object.values(map).map((ci) => ({
        id: ci.product.id,
        name: ci.product.name,
        unitPrice: ci.product.price,
        qty: ci.quantity,
        imageUrl: ci.product.thumbnailUrl,
    }));
}
