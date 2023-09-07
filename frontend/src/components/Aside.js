import React, { Fragment, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../assets/css/Aside.css'
import { categoryService } from '../services/categoryService';
import useCategories from '../hooks/useCategories';
import Select from './Select';
import Fieldset from './Fieldset';

export default function Aside() {

  // const [{loading, response, error, totalPages, currentPage, total} , dispatch] = useCategories();

  const [ sort, setSort ] = useState({sortByTitle: ""});
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ filtered, setFiltered ] = useState(searchParams.getAll('filter') || []);
  const [ instock, setInStock ] = useState("all")
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
      categoryService.getAllCategories()
        .then(cat => setCategories(cat))
  }, [])

  console.log(categories);

  function handleChange(e) {
    console.log("valami");
    const newSort = {[e.target.name] : e.target.value}
    setSort(newSort)
    if(e.target.value == "") {
      searchParams.delete('sortBy')
      searchParams.delete('title')
      setSearchParams(searchParams)
    } else {
      searchParams.set('sortBy', 'title')
      searchParams.set('order', e.target.value)
      setSearchParams(searchParams);
    }
  }

  function handleCheckChange(e) {
    const isFiltered = filtered.includes(e.target.name);
    if(isFiltered) {
      const newFiltered = filtered.filter(catname => catname != e.target.name);
      setFiltered(newFiltered);
      searchParams.delete('filter');
      if(newFiltered.length > 0) newFiltered.forEach(category => searchParams.append('filter', category))
      setSearchParams(searchParams);
    } else {
      const newFiltered = [...filtered, e.target.name]
      console.log(newFiltered, "newfiltered");
      setFiltered(newFiltered)
      searchParams.delete('filter')
      newFiltered.forEach(category => searchParams.append('filter', category))
      // searchParams.append('filter', newFiltered)
      setSearchParams(searchParams)
    }
  }

  function handleRadio(e) {
    searchParams.delete("products");
    searchParams.append("products", e.target.value);
    setSearchParams(searchParams)
  }

  return (
    <div className='aside'>
      <div className='aside-select'>
        <Select value={sort.sortByTitle} handleChange={(e) => handleChange(e)} name='sortByTitle'>
            <option value="">RENDEZÉS</option>
            <option value="asc" >név: a-z</option>
            <option value="desc" >név: z-a</option>
        </Select>
        <span className="focus"></span>
      </div>
        <div>
            <Fieldset>
              <legend>készlet</legend>
              <div>
                <label htmlFor='instock'>csak készleten</label>
                <input 
                  type='radio'
                  name='stock'
                  id='instock'
                  value='instock'
                  checked={instock == "instock"}
                  onChange={(e) => {setInStock(e.target.value); handleRadio(e)}}
                />
              </div>
              <div>
                <label htmlFor='all'>összes</label>
                <input 
                  type='radio'
                  name='stock'
                  id='all'
                  value='all'
                  checked={instock == "all"}
                  onChange={(e) => {setInStock(e.target.value); handleRadio(e)}}
                />
              </div>
            </Fieldset>
            <Fieldset>
              <legend>kategória</legend>
              {
                categories?.map(cat => (
                  <Fragment key={cat.categoryId}>
                    <div>
                      <label htmlFor={cat.categoryName}>{cat.categoryId} {cat.categoryName}</label>
                      <input 
                        type='checkbox' 
                        value={cat.categoryId} 
                        name={cat.categoryName} 
                        id={cat.categoryName}
                        onChange={(e) => handleCheckChange(e)}
                        checked={filtered.includes(cat.categoryName)}
                      />

                    </div>
                  </Fragment>
                ))
              }
            </Fieldset>  
        </div>
    </div>
  )
}
