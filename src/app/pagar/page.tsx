"use client";
import { DSButton, DSInput, DSNavbar } from "@/presentation/components";
import { cartStore } from "@/presentation/state/cartStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PagePay = () => {
  const { products, removeProduct } = cartStore();
  const router = useRouter();

  useEffect(() => {
    console.log(products);
  }, [products]);

  const onClickBack = () => {
    router.push("/");
  };

  const onDelete = (id: number) => {
    removeProduct(id);
    console.log(id);
  };

  return (
    <>
      <DSNavbar />
      <div style={{ paddingTop: 40, paddingLeft: 24 }}>
        <button
          onClick={onClickBack}
          className="mb-4 mt-12 text-blue-600 hover:underline"
        >
          ← Volver
        </button>
      </div>
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            gap: 32,
            flexDirection: "column",
          }}
        >
          <h1 className="text-4xl">
            {products && products?.length > 1
              ? "Productos a pagar"
              : "Producto a pagar"}
          </h1>
          {products &&
            products.length > 0 &&
            products.map((product, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "space-between",
                  gap: 12,
                }}
                key={index}
              >
                <p style={{ fontSize: 24, fontWeight: "bold" }}>
                  {product.title} (1)
                </p>
                <DSButton
                  onClick={() => onDelete(product.id)}
                  text="X"
                ></DSButton>
              </div>
            ))}
          <p style={{ fontSize: 24, fontWeight: "bold" }}>
            cantidad de productos {products?.length}
          </p>
          <p className="text-5xl py-8">
            Total: $
            {products &&
              products.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}
          </p>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h1 className="text-4xl">Información de pago</h1>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div>
                <p>Nombre</p>
                <DSInput></DSInput>
              </div>
              <div>
                <p>Correo</p>
                <DSInput></DSInput>
              </div>
              <div>
                <p>Dirección</p>
                <DSInput></DSInput>
              </div>
            </div>
            <DSButton
              disabled={products?.length > 0 ? false : true}
              className="w-full"
              text="Procesar pago"
            ></DSButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default PagePay;
