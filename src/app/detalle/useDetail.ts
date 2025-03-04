import { ProductCases } from "@/application/useCases/ProductCases";
import { Product } from "@/domain/models/Products";
import { ProductApi } from "@/infrastructure/repositories/ProductApi";
import { cartStore } from "@/presentation/state/cartStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useDetail = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const id = searchParams.get("id");
  const { addProduct } = cartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const getProductById = new ProductCases(new ProductApi());
      const result = await getProductById.getIdProduct(Number(id));
      if ("response" in result) {
        setProduct(result.response);
      } else {
        console.error("Error fetching product:", result.error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const onClickAddCart = () => {
    if (product) addProduct(product);
    // router.push("/pagar");
  };

  const onClickShopping = () => {
    router.push("/pagar");
  };
  const onClickBack = () => router.back();

  return {
    product,
    onClickAddCart,
    onClickShopping,
    onClickBack,
  };
};
export default useDetail;
