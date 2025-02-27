import { Product, Products } from "@/domain/models/Products";
import { api } from "../../application/services/api";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { AxiosError } from "axios";

export class ProductApi implements ProductRepository {
  async getAllProducts(): Promise<
    | { response: Products; status: number }
    | { error: { message: string }; status: number }
  > {
    const url = "/products";

    try {
      const response = await api.get<Products>(url);
      return { response: response.data, status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status || 500;
        const errorData: { message: string } =
          typeof error.response?.data === "object" &&
          "message" in error.response?.data
            ? error.response.data
            : { message: "Unknown error" };

        return { error: errorData, status };
      }

      return {
        error: { message: "An unexpected error occurred" },
        status: 500,
      };
    }
  }

  async getIdProduct(
    productId: number
  ): Promise<
    | { response: Product; status: number }
    | { error: { message: string }; status: number }
  > {
    const url = "/products/" + productId;

    try {
      const response = await api.get<Product>(url);
      return { response: response.data, status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status || 500;
        const errorData: { message: string } =
          typeof error.response?.data === "object" &&
          "message" in error.response?.data
            ? error.response.data
            : { message: "Unknown error" };

        return { error: errorData, status };
      }

      return {
        error: { message: "An unexpected error occurred" },
        status: 500,
      };
    }
  }
}
