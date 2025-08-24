import { create } from 'zustand';
import type { CartItem } from '~/types/CartItem';

interface cartItems {
    items: CartItem[]
    addToCart: (product: CartItem[]) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCarts = create<cartItems>((set) => ({
    items: [],
    addToCart: (product: CartItem[]) => set((state) => ({
        items: [...state.items, ...product],
    })),

    removeFromCart: (productId: string) => set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
    })),
    updateQuantity: (productId: string, quantity: number) => set((state) => ({
        items: state.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    })),
    clearCart: () => set(() => ({ items: [] })),
    getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    getTotalPrice: () => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),

}));
