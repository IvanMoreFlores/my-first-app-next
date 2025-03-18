import React, { useEffect, useState } from "react";
import { DSLabel } from "..";
import { FaSearch } from "react-icons/fa";
import "./styles.css";
import { ProductCases } from "@/application/useCases/ProductCases";
import { ProductApi } from "@/infrastructure/repositories/ProductApi";

interface IProps {
  handleSearch: (value: string) => void;
  handleSelection: (value: string) => void;
}

const Search = ({ handleSearch, handleSelection }: IProps) => {
  const [category, setCategory] = useState<[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const caseUseGetCategory = await new ProductCases(new ProductApi());
        const result = await caseUseGetCategory.getCategoryProduct();
        console.log(result.status);
        if ("response" in result) {
          console.log(result.response);
          setCategory(result.response);
        }
      } catch (err) {
        console.log(err);
      } finally {
        // Handle errors and cleanup
      }
    };

    getCategory();
  }, []);

  const handleSelectCategory = (category: string) => {
    setSearchValue(category);
    handleSelection(category)
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
      <div className="div-text">
        <DSLabel className="text-search" text="Categorias"></DSLabel>
        <select
          value={searchValue}
          onChange={(e) => handleSelectCategory(e.target.value)}
        >
          <option disabled value="">
            .: Seleccione una opción :.
          </option>
          <option value="todos">
            Todos
          </option>
          {category.map((item: string) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Search;
