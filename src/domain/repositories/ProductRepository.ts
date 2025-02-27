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
}
