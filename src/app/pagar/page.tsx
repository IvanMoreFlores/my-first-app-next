"use client";
import { DSButton, DSInput, DSNavbar } from "@/presentation/components";
import { useToast } from "@/presentation/context/ToastContext";
import { cartStore } from "@/presentation/state/cartStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PagePay = () => {
  const { products, removeProduct } = cartStore();
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    console.log(products);
  }, [products]);

  const onClickBack = () => {
    router.push("/");
  };

  const onDelete = (id: number) => {
    addToast("¡Operación exitosa!", "success");
    removeProduct(id);
    console.log(id);
  };

  return (
    <>
      <DSNavbar />
      <div className="container mx-auto p-24 h-100vh">
        <button
          onClick={onClickBack}
          className="text-blue-600 hover:underline flex items-center"
        >
          ← Volver
        </button>
        <div className="flex flex-col md:flex-row justify-center gap-10 mt-10">
          <div className="bg-white shadow-lg p-6 rounded-xl w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">
              {products && products.length > 1
                ? "Productos a pagar"
                : "Producto a pagar"}
            </h1>
            <div className="space-y-4">
              {products?.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-semibold">{product.title} - ({product.quantity})</p>
                      <p className="text-sm text-gray-600">
                        ${product.price.toFixed(2)} x {product.quantity}
                      </p>
                    </div>
                    <DSButton
                      onClick={() => onDelete(product.id)}
                      text="X"
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay productos en el carrito.</p>
              )}
            </div>
            <p className="text-xl font-bold mt-6">
              Cantidad de productos:{" "}
              {products?.reduce((acc, curr) => acc + curr.quantity, 0)}
            </p>
            <p className="text-3xl font-bold mt-4">
              Total: $
              {products
                ?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl w-full md:w-1/3">
            <h1 className="text-2xl font-bold mb-4">Información de pago</h1>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700">Nombre</p>
                <DSInput className="w-full border rounded-md p-2" />
              </div>
              <div>
                <p className="text-gray-700">Correo</p>
                <DSInput className="w-full border rounded-md p-2" />
              </div>
              <div>
                <p className="text-gray-700">Dirección</p>
                <DSInput className="w-full border rounded-md p-2" />
              </div>
            </div>
            <DSButton
              disabled={products?.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6 py-2 rounded-lg disabled:bg-gray-400"
              text="Procesar pago"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PagePay;
