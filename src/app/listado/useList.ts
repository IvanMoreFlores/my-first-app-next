import { useEffect, useState } from "react";
import { ProductCases } from "@/application/useCases/ProductCases";
import { Products } from "@/domain/models/Products";
import { ProductApi } from "@/infrastructure/repositories/ProductApi";
import { useRouter } from "next/navigation";

const useList = () => {
  const [product, setProduct] = useState<Products | null>(null); // Agregamos tipado correcto
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = await localStorage.getItem("token");
      if (!token) {
        router.back();
      }
      const getProductAll = new ProductCases(new ProductApi());
      const result = await getProductAll.getAllProducts();

      if ("response" in result) {
        setProduct(result.response);
      } else {
        console.error("Error fetching products:", result.error.message);
      }
    };

    fetchProducts();
  }, []);

  return { product };
};

export default useList;
