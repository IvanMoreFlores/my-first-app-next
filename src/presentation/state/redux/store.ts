"use client";
import { Product } from "@/domain/models/Products";
import { createStore } from "redux";

// Interface ProductModification con la propiedad de quantity
interface ProductModification extends Product {
  quantity?: number;
}

// Definimos el estado inicial con tipado
interface State {
  products: ProductModification[];
  allProducts: Product[]; // Todos los productos del catálogo
}

const initialState: State = {
  products: [],
  allProducts: [],
};

// Definimos los tipos de acciones
type Action =
  | { type: "ADD_PRODUCT"; product: ProductModification }
  | { type: "REMOVE_PRODUCT"; productId: string }
  | { type: "GET_ALL_PRODUCTS"; products: Product[] };

function productReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return { ...state, allProducts: action.products };

    case "ADD_PRODUCT": {
      const existingProduct = state.products.find(
        (p) => p.id === action.product.id
      );

      return {
        ...state,
        products: existingProduct
          ? state.products.map((p) =>
              p.id === action.product.id
                ? { ...p, quantity: (p.quantity || 1) + 1 }
                : p
            )
          : [...state.products, { ...action.product, quantity: 1 }],
      };
    }

    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id.toString() !== action.productId
        ),
      };

    default:
      return state;
  }
}

// Creamos la store con Redux DevTools si está disponible
const store = createStore(productReducer);

export default store;
