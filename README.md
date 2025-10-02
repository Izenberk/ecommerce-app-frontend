# Pet Supply Shop Frontend
ขึ้นโปรเจคด้วย Vite และใช้ React + TypeScript, TailwindCSS, Radix UI, Shadcn/ui, Zustand ในการสร้าง Pet Supply E-Commerce showcase นี้
ภายในโปรเจคประกอบด้วย 3 หน้า ได้แก่ หน้าร้านค้า `/`, หน้าตะกร้าสินค้า `/cart` และหน้าชำระเงิน `/payment`

## Getting Started
### Install Dependencies
1. Clone this repository.
2. Install packages with your preferred manager (pnpm workspace files are included, so `pnpm install` is recommended).
### Run the Development Server
- `pnpm dev` — starts Vite in development mode. view in local `http://localhost:5173/`
### Additional Scripts
- `pnpm build` — type-checks the project and builds production assets.
- `pnpm preview` — serves the production build locally.
- `pnpm lint` — runs ESLint across the codebase.

## Features
- Navbar ประกอบด้วย Logo + ชื่อร้าน, ตะกร้าแสดงจำนวนสินค้า, ปุ่มสลับ theme dark/light โหมด (set default ตาม Browser)
- Product catalog สามารถ search/filter ด้วย ชื่อ, ID, ประเภท, สถานะ ของสินค้า
- Product card แสดงภาพสินค้า, ราคา, ปุ่มกดเพื่อดูรายละเอียดสินค้า, ปุ่มเพิ่มสินค้าลงตะกร้า
- หน้าตะกร้าสินค้า user สามารถเพิ่ม/ลด จำนวนสินค้าได้ กดลบสินค้านั้นออกจากตะกร้าได้ มียอดแสดงราคาต่อชิ้น ยอดรวมทั้งหมดของสินค้านั้นและยอดรวมสินค้าทุกรายการ นอกจากนี้หากตะกร้าสินค้าว่างจะมี dialog แจ้ง user และถามว่าจะไปหน้า product หรือไปหน้า payment
- หน้าชำระเงิน จะมีแบบฟอร์มเพื่อถามข้อมูลการจัดส่ง มีตัวเลือกประเภทการจัดส่ง ตัวเลือกวิธีการชำระเงิน เมื่อกดชำระเงิน จะมี dialog ถามเพื่อ confirm การซื้อ หากยืนยันจะมี dialog เป็นเสมือน bill แสดงให้ user ดู
- สินค้าทั้งหมดที่แสดงในหน้า product catalog จะเป็น mock up data จาก `src/data/mockProducts.ts`

## Tech Stack
- React 19 and React Router 7 for the component model and client-side routing.
- TypeScript 5 with Vite 7 for type-safe development and fast builds.
- Tailwind CSS 4 with the `@tailwindcss/vite` plugin for styling utilities.
- Radix UI primitives for accessible dialogs, popovers, sliders, radio groups, and sheets.
- Zustand for lightweight global state (cart contents and product filters).
- ESLint 9 with React-specific plugins to enforce code quality.

## Project Structure & Key Modules
- `src/app/router.tsx` defines the root layout and routes for the catalog, cart, and payment pages.
- `src/pages/ProductPage.tsx` renders the catalog grid, pagination controls, and ties into the filter store; paired with `src/components/SearchFilterBar.tsx` for the filter UI.
- `src/pages/CartPage.tsx` presents the cart view, quantity controls, and checkout guard dialog.
- `src/pages/PaymentPage.tsx` manages the checkout form, total calculations, confirmation dialog, and receipt modal with session storage recovery.
- `src/store/cart.ts` and `src/store/products.ts` hold Zustand stores for cart state, filter state, and pagination defaults.
- `src/store/productSelectors.ts` houses pure helpers for filtering products.
- `src/lib/format.ts`, `src/lib/utils/cart.ts`, and `src/lib/utils/order.ts` provide currency formatting, cart-to-order conversion, and order ID generation utilities used during checkout.
- `src/data/mockProducts.ts` defines the in-memory catalog and image references in `public/images`.
- `src/components` includes the navigation bar, product cards, theme toggle, and UI primitives that compose the UX.
