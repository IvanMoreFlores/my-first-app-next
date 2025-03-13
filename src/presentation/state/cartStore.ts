import { Product } from "@/domain/models/Products";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductModification extends Product {
  quantity: number;
}

interface CartState {
  products: ProductModification[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
}

export const cartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => {
          const existingProduct =
            state.products && state.products.find((p) => p.id === product.id);
          return {
            products: existingProduct
              ? state.products &&
                state.products.map((p) =>
                  p.id === product.id
                    ? { ...p, quantity: (p.quantity || 1) + 1 }
                    : p
                )
              : [...state.products, { ...product, quantity: 1 }],
          };
        }),
      removeProduct: (productId) =>
        set((state) => ({
          products:
            state.products &&
            state.products.filter((product) => product.id !== productId),
        })),
    }),
    {
      name: "cartStore",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
);
