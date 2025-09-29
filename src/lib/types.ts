export type ProductStatus = 'active' | 'archived' | 'out_of_stock';
export type ProductType = 'collar' | 'feeder' | 'toy' | 'accessory';

export interface Product {
    id: string
    name: string
    type: ProductType
    price: number
    status: ProductStatus
    thumbnailUrl: string
}

export interface ProductFilter {
    query: string
    byId: string
    type: ProductType | 'all'
    priceMin: number
    priceMax: number
    status: ProductStatus | 'all'
}

export interface CartItem {
    product: Product
    quantity: number
}

export type ShippingType = 'normal' | 'express'
export type PaymentMethod = 'cod' | 'credit_card' | 'prompt_pay'

export interface UserInfo {
    firstName: string
    lastName: string
    phone: string
    address: string
    email: string
}