import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Aside from '../components/Aside';
import Pagination from '../components/Pagination';
import '../assets/css/Products.css';
import useProducts from '../hooks/useProducts';
import { ColorRing } from 'react-loader-spinner';

export default function Products() {

    // const [products, setProducts] = useState();
    const [loading, response, error, total] = useProducts();

    const [currentTableData, setCurrentTableData] = useState(null)
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    function onPageChange(pagenum) {
      searchParams.set("currentPage", pagenum)
      setSearchParams(searchParams)
      setCurrentPage(pagenum)
    }

    useEffect(() => {
      setTotalPages(Math.ceil(total / pageSize))
    }, [response])

    useEffect(() => {
      let query = "";
      searchParams.forEach((key, value) => {
        query = query + `${value}=${key}&`;
      })
      
      console.log(query, "query");
      fetch(`http://localhost:3031/api/products?${query}`)
        .then(resp => resp.json())
        .then(prod => setCurrentTableData(prod.products))
    }, [searchParams])
    
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
        {currentTableData?.map(prod => <ProductCard key={prod.id} product={prod}/>)}
        </div>
        <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
      </div>
    </section>
  )
}
