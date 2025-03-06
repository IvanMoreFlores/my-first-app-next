import { Product } from "@/domain/models/Products";
import { create } from "zustand";

interface ProductModification extends Product {
  quantity: number;
}

interface CartState {
  products: ProductModification[] | undefined;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
}

export const cartStore = create<CartState>((set) => ({
  products: [],
  addProduct: (product: Product) =>
    set((state) => {
      const existingProduct = state.products?.find((p) => p.id === product.id);
      return {
        products: existingProduct
          ? state.products?.map((p) =>
              p.id === product.id
                ? { ...p, quantity: (p.quantity || 1) + 1 }
                : p
            )
          : [...(state.products || []), { ...product, quantity: 1 }],
      };
    }),
  removeProduct: (productId: number) =>
    set((state) => ({
      products: state.products?.filter((product) => product.id !== productId),
    })),
}));