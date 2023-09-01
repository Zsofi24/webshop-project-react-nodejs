import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../assets/css/Aside.css'
import { categoryService } from '../services/categoryService';

export default function Aside() {

  const [ sort, setSort ] = useState({sortByTitle: ""});
  const [ filtered, setFiltered ] = useState([]);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    categoryService.getCategories()
      .then(categories => setCategories(categories))
  }, [])

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
            <input type='checkbox'/>
            <label>raktáron</label>
            {
              categories.map(cat => (
                <>
                  <input type='checkbox' value={cat.categoryId} name={cat.categoryName} onChange={(e) => handleCheckChange(e) }/>
                  <label>{cat.categoryId} {cat.categoryName}</label>
                </>
              ))
            }

  
        </div>

    </div>
  )
}
