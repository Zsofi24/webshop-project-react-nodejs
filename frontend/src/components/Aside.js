import React, { Fragment, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../assets/css/Aside.css'
import { categoryService } from '../services/categoryService';
import useCategories from '../hooks/useCategories';

export default function Aside() {

  const [{loading, response, error, totalPages, currentPage, total} , dispatch] = useCategories();

  const [ sort, setSort ] = useState({sortByTitle: ""});
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ filtered, setFiltered ] = useState(searchParams.getAll('filter') || []);
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    let loaded = total;
    if(loaded) {
      categoryService.getCategories(`pageSize=${total}`)
        .then(categories => setCategories(categories.categories))
    }
    return () => {
      loaded = false
  }
  }, [ total])

  console.log(categories);

  function handleChange(e) {
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

  return (
    <div className='aside'>
        <select value={sort.sortByTitle} onChange={(e) => handleChange(e)} name='sortByTitle'>
            <option value="">rendezés - válasz</option>
            <option value="asc" >rendezés a-z</option>
            <option value="desc" >rendezés z-a</option>
        </select>
        <div>
            <fieldset>
              <legend>raktáron</legend>
              <label>csak készleten</label>
              <input 
                type='radio'
                name='stock'
                value='in-stock'
              />
              <label>összes</label>
              <input 
                type='radio'
                name='stock'
                value='all'
              />
            </fieldset>
            <fieldset>
              <legend>Kategóriák</legend>
              {
                categories?.map(cat => (
                  <Fragment key={cat.categoryId}>
                    <input 
                      type='checkbox' 
                      value={cat.categoryId} 
                      name={cat.categoryName} 
                      onChange={(e) => handleCheckChange(e)}
                      checked={filtered.includes(cat.categoryName)}
                    />
                    <label>{cat.categoryId} {cat.categoryName}</label>
                  </Fragment>
                ))
              }
            </fieldset>  
        </div>
    </div>
  )
}
