import type { products } from "db/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product extends Omit<typeof products.$inferSelect, 'stock'> {
    quantity: number;
}

interface ShopCarStoreType {
    products: Product[];
    addProduct: (product: Product) => void;
}

export const useShopCarStore = create(persist<ShopCarStoreType>((set, get) => ({
    products: [],
    addProduct: (product) => {
        const productIndex = get().products.findIndex(({ id }) => id === product.id);

        if (productIndex !== -1) {
            const newProducts = [...get().products];
            newProducts[productIndex].quantity += product.quantity;

            set({ products: newProducts });
        } else {
            set({ products: [...get().products, product] });
        }
    }
}), {
    name: "shop-car",
    getStorage: () => localStorage,
}))