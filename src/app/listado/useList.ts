import { useEffect, useState } from "react";
import { ProductCases } from "@/application/useCases/ProductCases";
import { Products } from "@/domain/models/Products";
import { ProductApi } from "@/infrastructure/repositories/ProductApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createUserStore } from "@/presentation/state/userStore";

const useList = () => {
  const [product, setProduct] = useState<Products | null>(null); // Agregamos tipado correcto
  // const [searchQuery, setSearchQuery] = useState("");
  const [isFlagSelect, setFlagSelect] = useState({ status: false, value: "" });
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = createUserStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    console.log("Zustand : ", user);
    const token = await localStorage.getItem("token");
    if (!token) {
      router.back();
    }
    const getProductAll = new ProductCases(new ProductApi());
    const result = await getProductAll.getAllProducts();

    if ("response" in result) {
      setProduct(result.response);
      console.log(result.response);
      dispatch({
        type: "GET_ALL_PRODUCTS",
        products: result.response.products,
      });
    } else {
      console.error("Error fetching products:", result.error.message);
    }
  };

  const handleSearch = async (value: string) => {
    if (value === "") {
      if (isFlagSelect.status) {
        handleSelect(isFlagSelect.value);
        return;
      }
    }
    const loginUseCase = new ProductCases(new ProductApi());
    const result = await loginUseCase.getSearchProduct(value);
    if (result.status === 200 || result.status === 204) {
      if ("response" in result) {
        console.log(result.response);
        setProduct(result.response);
      }
    }
  };

  const handleSelect = async (value: string) => {
    if (value === "todos") {
      setFlagSelect({ status: false, value: "" });
      fetchProducts();
      return;
    }
    setFlagSelect({ status: true, value });
    const categoryUseCase = new ProductCases(new ProductApi());
    const result = await categoryUseCase.getCategoryProducts(value);
    if (result.status === 200 || result.status === 204) {
      if ("response" in result) {
        console.log(result.response);
        setProduct(result.response);
      }
    }
  };

  return { product, handleSearch, handleSelect };
};

export default useList;
