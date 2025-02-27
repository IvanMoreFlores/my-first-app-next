"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCases } from "@/application/useCases/ProductCases";
import { ProductApi } from "@/infrastructure/repositories/ProductApi";
import { Product } from "@/domain/models/Products";
import { DSButton } from "@/presentation/components";
import Image from "next/image";

const PageDetailProduct = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product>();
  const router = useRouter();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchProducts = async () => {
      const getProductAll = new ProductCases(new ProductApi());
      const result = await getProductAll.getIdProduct(Number(id));
      if ("response" in result) {
        setProduct(result.response);
        console.log(result.response);
      } else {
        console.error("Error fetching products:", result.error.message);
      }
    };

    fetchProducts();
  }, [id]);

  const onClickAddCart = () => {
    // Implementar agregar al carrito aquí
    console.log("Agregar al carrito");
  };

  const onClickShopping = () => {
    // Implementar ir a la lista de productos aquí
    console.log("Ir a lista de productos");
    // router.push("/lista");
  };

  const onClickBack = () => {
    router.back();
  };

  return (
    <div>
      <DSButton onClick={onClickBack} text="Volver" />
      {product && (
        <div>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={150}
            height={150}
          />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <DSButton
            onClick={onClickAddCart}
            text="Agregar a carrito"
          ></DSButton>
          <DSButton onClick={onClickShopping} text="Ir a comprar"></DSButton>
        </div>
      )}

      {product === null && <p style={{ color: "red" }}>Loading...</p>}
    </div>
  );
};

export default PageDetailProduct;
