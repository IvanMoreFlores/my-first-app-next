import { Products } from "@/domain/models/Product";
import { api } from "../../application/services/api";
import { ProductRepository } from "@/domain/repositories/ProductRepository";

export class productApi implements ProductRepository {
  async getAllProducts(): Promise<any> {
    const url = "/products";
    try {
      const response = await api.get(url);
      return { response: response.data, status: response.status };
    } catch (error) {
      console.error("Error fetching products", error);
      throw new Error("Error fetching products");
    }
  }
}
