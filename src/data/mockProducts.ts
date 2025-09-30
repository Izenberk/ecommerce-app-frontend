import type { Product } from '@/lib/types'

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'P-1001',
        name: 'Cat Collar',
        type: 'collar',
        price: 249,
        status: 'active',
        thumbnailUrl: '/images/cat_collar.png'
    },
    {
        id: 'P-1002',
        name: 'Dog Collar',
        type: 'collar',
        price: 299,
        status: 'active',
        thumbnailUrl: '/images/dog_collar.png'
    },
    {
        id: 'P-1003',
        name: 'Smart Feeder 2L',
        type: 'feeder',
        price: 1890,
        status: 'active',
        thumbnailUrl: '/images/feeder_2L.png'
    },
    {
        id: 'P-1004',
        name: 'Smart Feeder 4L',
        type: 'feeder',
        price: 1890,
        status: 'active',
        thumbnailUrl: '/images/feeder_4L.png'
    },
    {
        id: 'P-1005',
        name: 'Squeaky Mouse',
        type: 'toy',
        price: 199,
        status: 'active',
        thumbnailUrl: '/images/squeaky_mouse.png'
    },
    {
        id: 'P-1006',
        name: 'Dog Chewy',
        type: 'toy',
        price: 249,
        status: 'active',
        thumbnailUrl: '/images/dog_chewy.png'
    },
    {
        id: 'P-1007',
        name: 'Cat Jacket Harness and Leash',
        type: 'accessory',
        price: 449,
        status: 'active',
        thumbnailUrl: '/images/cat_harness.png'
    },
    {
        id: 'P-1008',
        name: 'Dog Jacket Harness and Leash',
        type: 'accessory',
        price: 499,
        status: 'active',
        thumbnailUrl: '/images/dog_harness.png'
    },
]