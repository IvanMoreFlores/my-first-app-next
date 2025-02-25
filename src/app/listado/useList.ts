import { useEffect, useState } from "react";
import { ProductCases } from "@/application/useCases/ProductCases";
import { Products } from "@/domain/models/Product";
import { productApi } from "@/infrastructure/repositories/ProductApi";

const useList = () => {
  const [product, setProduct] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const getProductAll = new ProductCases(new productApi());
    const result = await getProductAll.getAllProducts();
    console.log(result.response.products);
    await setProduct(result.response)
  };

  return { product };
};

export default useList;
