import { create } from 'zustand';
import type { Product } from '~/types/Product';
import { mockProducts } from '~/mockData';
import { stat } from 'fs';


interface ProductState {
    products: Product[];
    loadProducts: (products: Product[]) => void;
    getProductsbyCategory: (category: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    loadProducts: (products: Product[]) => {
        return set((state) => ({
            ...state,
            products: products,
        }));
    },
    getProductsbyCategory: (category)=> {
        return set((state) => ({
            ...state,
            products: mockProducts.filter((product) => product.category === category),
        }));
    },
}));
