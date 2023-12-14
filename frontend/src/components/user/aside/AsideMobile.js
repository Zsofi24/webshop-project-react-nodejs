import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BiSolidFilterAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Select from "../../Select";
import Fieldset from "../../Fieldset";
import { categoryService } from "../../../services/categoryService";

export default function AsideMobile({ showMobileAside, setShowMobileAside }) {

  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ filtered, setFiltered ] = useState(searchParams.getAll('filter[]')[0]?.split(',') || []);
  const [ instock, setInStock ] = useState(searchParams.get('products') || "all")
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((cat) => setCategories(cat));
  }, []);

  function handleChange(e) {
    const sort = (e.target.value).split('-');
    const sortBy = sort[0];
    const order = sort[1];

    if(e.target.value == "") {
      searchParams.delete('sortBy')
      searchParams.delete('title')
      setSearchParams(searchParams)
    } else {
      searchParams.set('sortBy', sortBy)
      searchParams.set('order', order)
      setSearchParams(searchParams);
    }
  }

  function handleCheckChange(e) {
    const isFiltered = filtered.includes(e.target.name);
    if(isFiltered) {
      const newFiltered = filtered.filter(catname => catname != e.target.name);
      setFiltered(newFiltered);
      searchParams.delete('filter[]');
      if(newFiltered.length > 0) searchParams.append('filter[]', newFiltered)
      searchParams.set('page', 1)
      setSearchParams(searchParams);
    } else {
      const newFiltered = [...filtered, e.target.name]
      setFiltered(newFiltered)
      searchParams.delete('filter[]')
      // newFiltered.forEach(category => searchParams.append('filter', category))
      searchParams.append('filter[]', newFiltered)
      searchParams.set('page', 1)
      setSearchParams(searchParams)
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
      <div className='aside__select-wrapper'>
        <p>rendezés:</p>
        <div className="aside__select">
          <Select handleChange={(e) => handleChange(e)} name="sort">
            <option className="" value=""></option>
            <option value="title-asc" >név: a-z</option>
            <option value="title-desc" >név: z-a</option>
            <option value="price-asc" >ár: a-z</option>
            <option value="price-desc" >ár: z-a</option>
          </Select>
          <span className="focus"></span>
        </div>
        </div>
        <p>szűrés</p>
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
                    {cat.categoryName}
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
