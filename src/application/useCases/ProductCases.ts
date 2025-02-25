import { Products } from "@/domain/models/Product";
import { ProductRepository } from "@/domain/repositories/ProductRepository";

export class ProductCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<any> {
    return await this.productRepository.getAllProducts();
  }
}
