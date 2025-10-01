import type { Product } from '@/lib/types'

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'P-1001',
        name: 'Cat Collar',
        type: 'collar',
        price: 249,
        status: 'active',
        thumbnailUrl: '/images/cat_collar.png',
        description:
        'Adjustable nylon collar with a safety breakaway buckle, designed to keep your cat secure and stylish.'
    },
    {
        id: 'P-1002',
        name: 'Dog Collar',
        type: 'collar',
        price: 299,
        status: 'active',
        thumbnailUrl: '/images/dog_collar.png',
        description:
        'Durable everyday dog collar made from soft, tear-resistant fabric with a quick-release buckle and D-ring for leashes.'
    },
    {
        id: 'P-1003',
        name: 'Smart Feeder 2L',
        type: 'feeder',
        price: 1890,
        status: 'active',
        thumbnailUrl: '/images/feeder_2L.png',
        description:
        'Compact automatic feeder with a 2-liter capacity, programmable meal times, and portion control for smaller pets.'
    },
    {
        id: 'P-1004',
        name: 'Smart Feeder 4L',
        type: 'feeder',
        price: 1890,
        status: 'active',
        thumbnailUrl: '/images/feeder_4L.png',
        description:
        'Large-capacity 4-liter smart feeder with app control, scheduled feeding, and voice recording to call your pet at mealtime.'
    },
    {
        id: 'P-1005',
        name: 'Squeaky Mouse',
        type: 'toy',
        price: 199,
        status: 'active',
        thumbnailUrl: '/images/squeaky_mouse.png',
        description:
        'Plush mouse toy with an internal squeaker, perfect for cats to chase, bite, and carry around.'
    },
    {
        id: 'P-1006',
        name: 'Dog Chewy',
        type: 'toy',
        price: 249,
        status: 'active',
        thumbnailUrl: '/images/dog_chewy.png',
        description:
        'Tough rubber chew toy shaped like a bone, designed to satisfy chewing instincts and promote healthy teeth.'
    },
    {
        id: 'P-1007',
        name: 'Cat Jacket Harness and Leash',
        type: 'accessory',
        price: 449,
        status: 'active',
        thumbnailUrl: '/images/cat_harness.png',
        description:
        'Breathable, escape-proof jacket harness with adjustable straps and matching leash for safe cat walks.'
    },
    {
        id: 'P-1008',
        name: 'Dog Jacket Harness and Leash',
        type: 'accessory',
        price: 499,
        status: 'active',
        thumbnailUrl: '/images/dog_harness.png',
        description:
        'Comfort-fit jacket harness for dogs with reflective lining, secure buckles, and a sturdy leash included.'
    },
    {
        id: 'P-1009',
        name: 'Fountain Water Dispenser',
        type: 'feeder',
        price: 799,
        status: 'active',
        thumbnailUrl: '/images/fountain_dispenser.png',
        description:
        'Continuous-flow water fountain with replaceable filters, encouraging pets to stay hydrated with fresh, clean water.'
    }
]
