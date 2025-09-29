import { useCartStore } from "@/store/cart"
import { Button } from "@/components/ui/button"
import { formatTHB } from "@/lib/format"
import { Link } from 'react-router-dom'

export default function CartPage() {
    const { items, increment, decrement, remove, totalPrice } = useCartStore((s) => ({
        items: s.items,
        increment: s.increment,
        decrement: s.decrement,
        remove: s.remove,
        totalPrice: s.totalPrice,
    }))

    const list = Object.values(items)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <div className="space-y-3">
                {list.length === 0 && <p className="text-muted-foreground">Cart is empty.</p>}
                {list.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3 border rounded p-3">
                        <img src={product.thumbnailUrl} className="w-20 h-14 object-cover rounded" />
                        <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{formatTHB(product.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => decrement(product.id)}>-</Button>
                            <span className="w-8 text-center">{quantity}</span>
                            <Button variant="outline" size="icon" onClick={() => increment(product.id)}>+</Button>
                        </div>
                        <div className="w-24 text-right font-medium">
                            {formatTHB(quantity * product.price)}
                        </div>
                        <Button variant="ghost" onClick={() => remove(product.id)}>Delete</Button>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between border-t pt-4">
                <p className="text-lg font-semibold">Total: {formatTHB(totalPrice())}</p>
                <Button asChild disabled={list.length === 0}>
                    <Link to="/payment">Checkout</Link>
                </Button>
            </div>
        </div>
    )
}