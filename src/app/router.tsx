import { createBrowserRouter } from "react-router-dom";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import PaymentPage from "@/pages/PaymentPage";
import App from '@/App'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <ProductPage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'payment', element: <PaymentPage /> },
        ],
    },
])