"use client";
import React from "react";
import useList from "./useList";
import { DSCard, DSDataGraphql, DSNavbar } from "@/presentation/components";
import { useRouter } from "next/navigation";
import { useTheme } from "@/presentation/theme/themeProvider";

const PageListProduct = () => {
  const router = useRouter();
  const { product } = useList();
  const { theme, toggleTheme } = useTheme();

  const onClick = (id: number) => {
    router.push(`/detalle?id=${id}`);
  };

  const onChangeTheme = () => {
    toggleTheme();
  };

  return (
    <div style={{ backgroundColor: theme.colors.background }} className="pt-16">
      <DSNavbar />
      <div className="flex justify-end">
        <button
          onClick={onChangeTheme}
          className="text-blue-600 hover:underline"
        >
          Cambiar tema
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {product?.products.map((item) => (
          <DSCard onClick={() => onClick(item.id)} key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PageListProduct;
