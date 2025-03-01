"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCases } from "@/application/useCases/ProductCases";
import { ProductApi } from "@/infrastructure/repositories/ProductApi";
import { Product } from "@/domain/models/Products";
import { DSButton, DSNavbar } from "@/presentation/components";
import Image from "next/image";
import { cartStore } from "@/presentation/state/cartStore";

const PageDetailProduct = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const id = searchParams.get("id");
  const { addProduct } = cartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const getProductById = new ProductCases(new ProductApi());
      const result = await getProductById.getIdProduct(Number(id));
      if ("response" in result) {
        setProduct(result.response);
      } else {
        console.error("Error fetching product:", result.error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const onClickAddCart = () => {
    if (product) addProduct(product);
    // router.push("/pagar");
  };

  const onClickShopping = () =>{router.push("/pagar")};
  const onClickBack = () => router.back();

  return (
    <div className="min-h-screen bg-gray-100">
      <DSNavbar />
      <div className="container mx-auto py-10 px-4">
        <button
          onClick={onClickBack}
          className="mb-4 mt-12 text-blue-600 hover:underline"
        >
          ← Volver
        </button>

        {product ? (
          <div className="bg-white shadow-lg rounded-lg p-6 md:grid md:grid-cols-2 gap-6">
            {/* Imagen y Galería */}
            <div className="flex flex-col items-center">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={350}
                height={350}
                className="rounded-lg shadow-md"
              />
              <div className="flex mt-4 space-x-2">
                {product.images.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Image ${index}`}
                    width={60}
                    height={60}
                    className="rounded-md shadow-md cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            </div>

            {/* Detalles del producto */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="text-gray-600 mt-2">{product.description}</p>

              <div className="mt-4">
                <span className="text-2xl font-semibold text-blue-600">
                  ${product.price}{" "}
                </span>
                <span className="text-sm text-red-500 ml-2">
                  -{product.discountPercentage}% de descuento
                </span>
              </div>

              <p className="mt-2 text-gray-700">
                <strong>Marca:</strong> {product.brand}
              </p>
              <p className="text-gray-700">
                <strong>SKU:</strong> {product.sku}
              </p>
              <p className="text-gray-700">
                <strong>Categoría:</strong> {product.category}
              </p>
              <p className="text-gray-700">
                <strong>Stock disponible:</strong> {product.stock}
              </p>
              <p className="text-gray-700">
                <strong>Dimensiones:</strong> {product.dimensions.width}cm x{" "}
                {product.dimensions.height}cm x {product.dimensions.depth}cm
              </p>

              {/* Botones */}
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={onClickAddCart}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  🛒 Agregar al carrito
                </button>
                <button
                  onClick={onClickShopping}
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-900 transition"
                >
                  🛍 Ir a comprar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500 font-semibold">Cargando...</p>
        )}

        {/* Sección de Reseñas */}
        {product && product.reviews.length > 0 && (
          <div className="mt-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reseñas</h2>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-yellow-500">⭐ {review.rating} / 5</p>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    - {review.reviewerName} |{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetailProduct;
