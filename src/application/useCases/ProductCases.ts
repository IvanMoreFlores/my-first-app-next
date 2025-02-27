import { Product, Products } from "@/domain/models/Products";
import { ProductRepository } from "@/domain/repositories/ProductRepository";

export class ProductCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<
    | { response: Products; status: number }
    | { error: { message: string }; status: number }
  > {
    return await this.productRepository.getAllProducts();
  }

  async getIdProduct(
    productId: number
  ): Promise<
    | { response: Product; status: number }
    | { error: { message: string }; status: number }
  > {
    return await this.productRepository.getIdProduct(productId);
  }
}
