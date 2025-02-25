import { Products } from "../models/Product";

export interface ProductRepository {
  getAllProducts(): Promise<any>;
}
