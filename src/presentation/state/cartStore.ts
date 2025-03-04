import { Product } from "@/domain/models/Products";
import { create } from "zustand";

interface ProductModification extends Product {
  quantity: number;
}

interface CartState {
  products: ProductModification[] | undefined;
  addProduct: (bear: ProductModification) => void;
  removeProduct: (productId: number) => void;
}

export const cartStore = create<CartState>((set) => ({
  products: undefined,
  addProduct: (product: ProductModification) =>
    set((state) => ({
      products: [...(state.products || []), product],
    })),
  removeProduct: (productId: number) =>
    set((state) => ({
      products: state.products?.filter((product) => product.id !== productId),
    })),
}));
