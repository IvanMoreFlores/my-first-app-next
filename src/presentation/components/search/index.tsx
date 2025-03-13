import React from "react";
import { DSLabel } from "..";
import { FaSearch } from "react-icons/fa";
import "./styles.css";
import { ProductCases } from "@/application/useCases/ProductCases";
import { ProductApi } from "@/infrastructure/repositories/ProductApi";

const index = () => {
  const handleSearch = async (value: string) => {
    const loginUseCase = new ProductCases(new ProductApi());
    const result = await loginUseCase.getSearchProduct(value);
    if (result.status === 200 || result.status === 204) {
      if ("response" in result) {
        console.log(result.response);
      }
    }
  };

  return (
    <div className="div-container">
      <div className="div-text">
        <DSLabel className="text-search" text="Buscar producto"></DSLabel>
        <div className="div-input-search">
          <div className="div-icon-search">
            <FaSearch size={24} />
          </div>
          <input
            className="input-search"
            type="text"
            placeholder="Buscar producto"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
