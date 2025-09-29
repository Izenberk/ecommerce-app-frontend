import { useCartStore } from "@/store/cart";
import { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button'
import { formatTHB } from "@/lib/format";
import type { PaymentMethod, ShippingType, UserInfo } from "@/lib/types";

export default function PaymentPage() {
    const total = useCartStore((s) => s.totalPrice())
    const clear = useCartStore((s) => s.clear)

    const [shipping, setShipping] = useState<ShippingType>('normal')
    const [pay, setPay] = useState<PaymentMethod>('credit_card')
    const [info, setInfo] = useState<UserInfo>({
        firstName: '', lastName: '', phone: '', address: '', email: ''
    })

    const shippingFee = shipping === 'express' ? 80 : 40
    const grandTotal = total + shippingFee

    const confirm = () => {
        // in real app, post to backend
        alert(`Purcchased! Total: ${grandTotal}`)
        clear()
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold">User Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label>First Name</Label>
                        <Input value={info.firstName} onChange={(e) => setInfo({ ...info, firstName: e.target.value })} />
                    </div>
                    <div>
                        <Label>Last Name</Label>
                        <Input value={info.lastName} onChange={(e) => setInfo({ ...info, lastName: e.target.value })} />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                        <Label>Address</Label>
                        <Input value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                        <Label>Email</Label>
                        <Input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label>Shipping Type</Label>
                        <Select value={shipping} onValueChange={(v) => setShipping(v as ShippingType)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="express">Express</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label>Payment Method</Label>
                        <Select value={pay} onValueChange={(v) => setPay(v as PaymentMethod)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="credit_card">Credit Card</SelectItem>
                                <SelectItem value="cod">Cash on Delivery</SelectItem>
                                <SelectItem value="prompt_pay">Prompt Pay</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <aside className="border rounded p-4 space-y-2">
                <h3 className="text-lg font-semibold">Purchase Summary</h3>
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatTHB(total)}</span></div>
                <div className="flex justify-between text-sm"><span>Shipping</span><span>{formatTHB(shippingFee)}</span></div>
                <div className="flex justify-between font-semibold"><span>Total</span><span>{formatTHB(grandTotal)}</span></div>
                <Button className="w-full mt-2" onClick={confirm}>Confirm Purchase</Button>
            </aside>
        </div>
    )
}