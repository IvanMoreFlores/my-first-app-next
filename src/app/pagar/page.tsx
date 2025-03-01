"use client";
import { cartStore } from "@/presentation/state/cartStore";
import React, { useEffect } from "react";

const PagePay = () => {
  const { products } = cartStore();

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div>
      <div>
        <h1>Producto a pagar</h1>
        <div></div>
      </div>
      <div>
        <h1>Inforación de pago</h1>
        <div></div>
      </div>
    </div>
  );
};

export default PagePay;
