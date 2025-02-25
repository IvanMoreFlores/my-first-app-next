"use client";
import React from "react";
import useList from "./useList";
import { DSCard } from "@/presentation/components";

const PageListProduct = () => {
  const { product } = useList();
  return (
    <div>
      {product?.products.map((item, index) => (
        <DSCard
          title={item.title}
          description={item.description}
          thumbnail={item.thumbnail}
          price={item.price}
          key={index}
        />
      ))}
    </div>
  );
};

export default PageListProduct;
