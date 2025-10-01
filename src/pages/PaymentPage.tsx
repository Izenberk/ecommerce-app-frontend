import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cart";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { formatTHB } from "@/lib/format";
import type {
    PaymentMethod,
    ShippingType,
    UserInfo,
    OrderSummary,
    CartItemsMap,
} from "@/lib/types";
import { genOrderId } from "@/lib/utils/order";
import { cartItemsToOrderItems } from "@/lib/utils/cart";

const LAST_ORDER_KEY = "lastOrder";

export default function PaymentPage() {
    // --- read snapshots from store
    const subtotal = useCartStore((s) => s.totalPrice()); // number, not fn
    const clear = useCartStore((s) => s.clear);
    const itemsMap = useCartStore((s) => s.items) as CartItemsMap;


    const [shipping, setShipping] = useState<ShippingType>("normal");
    const [pay, setPay] = useState<PaymentMethod>("credit_card");
    const [info, setInfo] = useState<UserInfo>({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        email: "",
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [billOpen, setBillOpen] = useState(false);
    const [order, setOrder] = useState<OrderSummary | null>(null);

    const navigate = useNavigate();

    // --- derived values
    const shippingFee = useMemo(() => (shipping === "express" ? 80 : 40), [shipping]);
    const grandTotal = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);
    const isCartEmpty = subtotal <= 0;

    // --- simple form validation
    const isInfoValid = useMemo(() => {
        const { firstName, lastName, phone, address, email } = info;
        return (
        firstName.trim() &&
        lastName.trim() &&
        phone.trim() &&
        address.trim() &&
        // basic email check (upgrade to zod/form lib later)
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );
    }, [info]);

    // --- handlers (stable)
    const handleChange =
        (key: keyof UserInfo) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
        setInfo((prev) => ({ ...prev, [key]: e.target.value }));

    const onClickConfirm = useCallback(() => {
        setConfirmOpen(true);
    }, []);

    const placeOrder = useCallback(() => {
        // snapshot BEFORE clear
        const orderItems = cartItemsToOrderItems(itemsMap);
        const snapshot: OrderSummary = {
            id: genOrderId(),
            createdAt: new Date().toISOString(),
            info,
            pay,
            shipping,
            items: orderItems,           // ✅ array
            subtotal,                    // ✅ numbers taken BEFORE clear
            shippingFee,
            grandTotal,
        };

        setOrder(snapshot);
        sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(snapshot));
        setConfirmOpen(false);
        setBillOpen(true);
    }, [itemsMap, info, pay, shipping, subtotal, shippingFee, grandTotal]);

    const handleBillingOpenChange = useCallback(
        (open: boolean) => {
        setBillOpen(open);
        if (!open) {
            clear(); // clear AFTER user leaves the bill
            sessionStorage.removeItem(LAST_ORDER_KEY);
            navigate("/");
        }
        },
        [clear, navigate]
    );

    // Restore bill if user refreshed on the receipt
    useEffect(() => {
        if (!order) {
        const cached = sessionStorage.getItem(LAST_ORDER_KEY);
        if (cached) {
            try {
            setOrder(JSON.parse(cached) as OrderSummary);
            setBillOpen(true); // re-open receipt
            } catch {
            sessionStorage.removeItem(LAST_ORDER_KEY);
            }
        }
        }
    }, [order]);

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: form */}
            <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">User Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                <Label>First Name</Label>
                <Input value={info.firstName} onChange={handleChange("firstName")} />
                </div>
                <div>
                <Label>Last Name</Label>
                <Input value={info.lastName} onChange={handleChange("lastName")} />
                </div>
                <div>
                <Label>Phone</Label>
                <Input value={info.phone} onChange={handleChange("phone")} />
                </div>
                <div className="md:col-span-2">
                <Label>Address</Label>
                <Input value={info.address} onChange={handleChange("address")} />
                </div>
                <div className="md:col-span-2">
                <Label>Email</Label>
                <Input type="email" value={info.email} onChange={handleChange("email")} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Shipping */}
                <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Shipping Type</legend>
                <RadioGroup
                    value={shipping}
                    onValueChange={(v) => setShipping(v as ShippingType)}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem id="ship-normal" value="normal" />
                    <Label htmlFor="ship-normal" className="cursor-pointer">
                        Normal
                    </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem id="ship-express" value="express" />
                    <Label htmlFor="ship-express" className="cursor-pointer">
                        Express
                    </Label>
                    </div>
                </RadioGroup>
                </fieldset>

                {/* Payment */}
                <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Payment Method</legend>
                <RadioGroup
                    value={pay}
                    onValueChange={(v) => setPay(v as PaymentMethod)}
                    className="grid grid-cols-1 gap-2"
                >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem id="pay-cc" value="credit_card" />
                    <Label htmlFor="pay-cc" className="cursor-pointer">
                        Credit Card
                    </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem id="pay-cod" value="cod" />
                    <Label htmlFor="pay-cod" className="cursor-pointer">
                        Cash on Delivery
                    </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem id="pay-pp" value="prompt_pay" />
                    <Label htmlFor="pay-pp" className="cursor-pointer">
                        Prompt Pay
                    </Label>
                    </div>
                </RadioGroup>
                </fieldset>
            </div>
            </div>

            {/* Right: summary */}
            <aside className="border rounded p-4 space-y-2">
            <h3 className="text-lg font-semibold">Purchase Summary</h3>
            <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatTHB(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{formatTHB(shippingFee)}</span>
            </div>
            <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatTHB(grandTotal)}</span>
            </div>
            <Button
                className="w-full mt-2"
                onClick={onClickConfirm}
                disabled={isCartEmpty || !isInfoValid}
            >
                Confirm Purchase
            </Button>
            {(isCartEmpty || !isInfoValid) && (
                <p className="text-xs text-muted-foreground text-center">
                {isCartEmpty ? "Your cart is empty." : "Please complete your info to continue."}
                </p>
            )}
            </aside>
        </div>

        {/* Confirm dialog */}
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Place this order?</AlertDialogTitle>
                <AlertDialogDescription>
                You’re about to pay <strong>{formatTHB(grandTotal)}</strong> via{" "}
                <span className="uppercase">{pay.replace("_", " ")}</span>. Shipping:{" "}
                <span className="capitalize">{shipping}</span>.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Review</AlertDialogCancel>
                <AlertDialogAction onClick={placeOrder} type="button">
                Place order
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        {/* Receipt */}
        <Dialog open={billOpen} onOpenChange={handleBillingOpenChange}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Payment Successful</DialogTitle>
                <DialogDescription>Thanks for shopping with us!</DialogDescription>
            </DialogHeader>

            {order && (
                <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Order ID</span>
                    <span className="font-mono">{order.id}</span>
                </div>
                <div className="flex justify-between">
                    <span>Payment</span>
                    <span className="uppercase">{order.pay.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="capitalize">{order.shipping}</span>
                </div>
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatTHB(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>{formatTHB(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                    <span>Total Paid</span>
                    <span>{formatTHB(order.grandTotal)}</span>
                </div>

                {/* Items */}
                <div className="pt-3 space-y-1">
                    <p className="font-medium">Items</p>
                    <ul className="grid gap-1">
                    {order.items.map((it) => (
                        <li key={it.id} className="flex justify-between text-xs">
                        <span className="truncate">
                            {it.name} × {it.qty}
                        </span>
                        <span>{formatTHB(it.unitPrice * it.qty)}</span> {/* ✅ unitPrice */}
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            )}

            <div className="pt-2">
                <Button className="w-full" onClick={() => handleBillingOpenChange(false)}>
                Back to Home
                </Button>
            </div>
            </DialogContent>
        </Dialog>
        </>
    );
}
