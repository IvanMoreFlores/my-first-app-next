import { Product, Products } from "../models/Products";

export interface ProductRepository {
  getAllProducts(): Promise<
    | { response: Products; status: number }
    | { error: { message: string }; status: number }
  >;

  getIdProduct(
    productId: number
  ): Promise<
    | { response: Product; status: number }
    | { error: { message: string }; status: number }
  >;

  getSearchProduct(
    searchQuery: string
  ): Promise<
    | { response: Products; status: number }
    | { error: { message: string }; status: number }
  >;

  getCategoryProduct(): Promise<
    | { response: []; status: number }
    | { error: { message: string }; status: number }
  >;

  getCategoryProducts(
    categoryId: string
  ): Promise<
    | { response: Products; status: number }
    | { error: { message: string }; status: number }
  >;
}
