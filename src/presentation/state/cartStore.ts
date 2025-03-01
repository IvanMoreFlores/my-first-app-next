import { Product } from "@/domain/models/Products";
import { create } from "zustand";

interface CartState {
  products: Product[] | undefined;
  addProduct: (bear: Product) => void;
}

export const cartStore = create<CartState>((set) => ({
  products: undefined,
  addProduct: (product: Product) =>
    set((state) => ({
      products: [...(state.products || []), product],
    })),
  removeProduct: (productId: number) =>
    set((state) => ({
      products: state.products?.filter((product) => product.id === productId),
    })),
}));
