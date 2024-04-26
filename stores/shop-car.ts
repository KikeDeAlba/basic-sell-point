import type { products } from "db/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = typeof products.$inferSelect & {
    quantity: number;
}

interface ShopCarStoreType {
    products: Product[];
    addProduct: (product: Product) => void;
    addOneProduct: (id: number) => void;
    removeOneProduct: (id: number) => void;
    client: number
    setClient: (client: number) => void;
}

export const useShopCarStore = create(persist<ShopCarStoreType>((set, get) => ({
    products: [],
    client: 0,
    setClient: (client) => {
        set({ client })
    },
    addProduct: (product) => {
        const productIndex = get().products.findIndex(({ id }) => id === product.id);

        if (productIndex !== -1) {
            const newProducts = [...get().products];
            newProducts[productIndex].quantity += product.quantity;

            set({ products: newProducts });
        } else {
            set({ products: [...get().products, product] });
        }
    },
    addOneProduct: (id) => {
        const productIndex = get().products.findIndex((product) => product.id === id);

        if (productIndex !== -1) {
            const newProducts = [...get().products];
            newProducts[productIndex].quantity += 1;

            set({ products: newProducts });
        }
    },
    removeOneProduct: (id) => {
        const productIndex = get().products.findIndex((product) => product.id === id);

        if (productIndex !== -1) {
            const newProducts = [...get().products];
            newProducts[productIndex].quantity -= 1;

            if (newProducts[productIndex].quantity === 0) {
                newProducts.splice(productIndex, 1);
            }

            set({ products: newProducts });
        }
    }
}), {
    name: "shop-car",
    getStorage: () => localStorage
}))