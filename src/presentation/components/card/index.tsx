import { Product } from "@/domain/models/Products";
import Image from "next/image";
import React, { useMemo, lazy, Suspense } from "react";

interface ICardProps extends Product {
  onClick?: () => void;
}

const LazyDSCard = lazy(() => import("@/presentation/components/card"));

const DSCard = ({
  title,
  description,
  thumbnail,
  price,
  rating,
  brand,
  stock,
  onClick,
}: ICardProps) => {
  const formattedPrice = useMemo(() => `${price.toFixed(2)}`, [price]);
  const formattedRating = useMemo(() => `⭐ ${rating.toFixed(1)}`, [rating]);
  const shortDescription = useMemo(
    () => `${description.substring(0, 80)}...`,
    [description]
  );

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={thumbnail}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-800">{title}</h5>
        <p className="text-sm text-gray-600 mt-2">{shortDescription}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
            {formattedPrice}
          </span>
          <span className="text-sm text-gray-500">{formattedRating}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Marca: {brand} | Stock: {stock}
        </p>
        {onClick && (
          <button
            onClick={onClick}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Ver más
          </button>
        )}
      </div>
    </div>
  );
};

export function DSCardLazyWrapper(props: ICardProps) {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <LazyDSCard {...props} />
    </Suspense>
  );
}

export default DSCard;
