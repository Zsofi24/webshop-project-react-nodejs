import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BiSolidFilterAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import "../assets/css/AsideMobile.css";
import Select from "./Select";
import Fieldset from "./Fieldset";
import { categoryService } from "../services/categoryService";

export default function AsideMobile({ showMobileAside, setShowMobileAside }) {
  const [sort, setSort] = useState({ sortByTitle: "" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtered, setFiltered] = useState(searchParams.getAll("filter") || []);
  const [instock, setInStock] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.getAllCategories().then((cat) => setCategories(cat));
  }, []);

  function handleChange(e) {
    const newSort = { [e.target.name]: e.target.value };
    setSort(newSort);
    if (e.target.value == "") {
      searchParams.delete("sortBy");
      searchParams.delete("title");
      setSearchParams(searchParams);
    } else {
      searchParams.set("sortBy", "title");
      searchParams.set("order", e.target.value);
      setSearchParams(searchParams);
    }
  }

  function handleCheckChange(e) {
    const isFiltered = filtered.includes(e.target.name);
    if (isFiltered) {
      const newFiltered = filtered.filter(
        (catname) => catname != e.target.name
      );
      setFiltered(newFiltered);
      searchParams.delete("filter");
      if (newFiltered.length > 0)
        newFiltered.forEach((category) =>
          searchParams.append("filter", category)
        );
      setSearchParams(searchParams);
    } else {
      const newFiltered = [...filtered, e.target.name];
      console.log(newFiltered, "newfiltered");
      setFiltered(newFiltered);
      searchParams.delete("filter");
      newFiltered.forEach((category) =>
        searchParams.append("filter", category)
      );
      // searchParams.append('filter', newFiltered)
      setSearchParams(searchParams);
    }
  }

  function handleRadio(e) {
    searchParams.delete("products");
    searchParams.append("products", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div className="aside-mobile-wrapper">
      <div className="aside-mobile-panel">
        <div className="aside-select">
          <Select
            value={sort.sortByTitle}
            handleChange={(e) => handleChange(e)}
            name="sortByTitle"
          >
            <option value="">RENDEZÉS</option>
            <option value="asc">név: a-z</option>
            <option value="desc">név: z-a</option>
          </Select>
          <span className="focus"></span>
        </div>
        <h3>szűrők</h3>
        <button
          className="filter-button"
          onClick={() => setShowMobileAside((prev) => !prev)}
        >
          {showMobileAside ? <AiOutlineClose /> : <BiSolidFilterAlt />}
        </button>
      </div>

      {showMobileAside && (
        <div className="aside-mobile-filter">
          <Fieldset>
            <legend>készlet</legend>
            <div>
              <label htmlFor="instock">csak készleten</label>
              <input
                type="radio"
                name="stock"
                id="instock"
                value="instock"
                checked={instock == "instock"}
                onChange={(e) => {
                  setInStock(e.target.value);
                  handleRadio(e);
                }}
              />
            </div>
            <div>
              <label htmlFor="all">összes</label>
              <input
                type="radio"
                name="stock"
                id="all"
                value="all"
                checked={instock == "all"}
                onChange={(e) => {
                  setInStock(e.target.value);
                  handleRadio(e);
                }}
              />
            </div>
          </Fieldset>
          <Fieldset>
            <legend>kategória</legend>
            {categories?.map((cat) => (
              <Fragment key={cat.categoryId}>
                <div>
                  <label htmlFor={cat.categoryName}>
                    {cat.categoryId} {cat.categoryName}
                  </label>
                  <input
                    type="checkbox"
                    value={cat.categoryId}
                    name={cat.categoryName}
                    id={cat.categoryName}
                    onChange={(e) => handleCheckChange(e)}
                    checked={filtered.includes(cat.categoryName)}
                  />
                </div>
              </Fragment>
            ))}
          </Fieldset>
          <button onClick={() => setShowMobileAside((prev) => !prev)}>
            szűrés
          </button>
        </div>
      )}
    </div>
  );
}
