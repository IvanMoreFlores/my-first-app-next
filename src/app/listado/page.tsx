"use client";
import React from "react";
import useList from "./useList";
import { DSCard, DSNavbar, DSSearch } from "@/presentation/components";
import { useRouter } from "next/navigation";
import { useTheme } from "@/presentation/theme/themeProvider";

const PageListProduct = () => {
  const router = useRouter();
  const { product, handleSearch, handleSelect } = useList();
  const { theme } = useTheme();

  const onClick = (id: number) => {
    router.push(`/detalle?id=${id}`);
  };

  return (
    <div style={{ backgroundColor: theme.colors.background }} className="pt-16">
      <DSNavbar />
      <DSSearch
        handleSearch={(e) => handleSearch(e)}
        handleSelection={(e) => handleSelect(e)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {product?.products.map((item) => (
          <DSCard onClick={() => onClick(item.id)} key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PageListProduct;
