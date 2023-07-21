import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../assets/css/Aside.css'

export default function Aside() {

  const [sort, setSort] = useState({sortByTitle: ""});
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <div className='aside'>
        <select value={sort.sortByTitle} onChange={(e) => handleChange(e)} name='sortByTitle'>
            <option value="">rendezés - válasz</option>
            <option value="asc" >rendezés a-z</option>
            <option value="desc" >rendezés z-a</option>
        </select>

    </div>
  )
}
