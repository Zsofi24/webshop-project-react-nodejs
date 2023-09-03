import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Aside from '../components/Aside';
import Pagination from '../components/Pagination';
import '../assets/css/Products.css';
import useProducts from '../hooks/useProducts';
import { ColorRing } from 'react-loader-spinner';

export default function Products() {

    const [{loading, response, error, totalPages, currentPage}, dispatch] = useProducts();

    const [searchParams, setSearchParams] = useSearchParams();

    function onPageChange(pagenum) {
      searchParams.set("currentPage", pagenum)
      setSearchParams(searchParams)
      dispatch({ type: 'PAGECHANGE', currentPage: pagenum})
    }
    
  return (
    <section className='product-page'>
      <Aside />
      <div className='products-container'>
        <div className='product-card-list'>
        { loading && <div><ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /></div> }
        { error && <div className="error">ERROR OH NO</div> }
        {response?.map(prod => <ProductCard key={prod.id} product={prod}/>)}
        </div>
        <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
      </div>
    </section>
  )
}
