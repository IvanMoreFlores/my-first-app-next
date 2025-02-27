"use client";
import React from "react";
import useList from "./useList";
import { DSCard, DSNavbar } from "@/presentation/components";
import { useRouter } from "next/navigation";

const PageListProduct = () => {
  const router = useRouter();
  const { product } = useList();

  const onClick = (id: number) => {
    router.push(`/detalle?id=${id}`);
  };

  return (
    <div className="pt-16">
      <DSNavbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {product?.products.map((item) => (
          <DSCard onClick={() => onClick(item.id)} key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PageListProduct;
