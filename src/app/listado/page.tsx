"use client";
import React from "react";
import useList from "./useList";
import { DSCard, DSCardTwo, DSNavbar } from "@/presentation/components";

const PageListProduct = () => {
  const { product } = useList();

  return (
    <div className="pt-16">
      {/* <DSNavbar /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {product?.products.map((item) => (
          // <DSCard key={item.id} {...item} />
          <DSCardTwo key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PageListProduct;
