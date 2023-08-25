import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import {productService} from '../services/productServices';
import ProductCard from '../components/ProductCard';
import Aside from '../components/Aside';
import Pagination from '../components/Pagination';
import '../assets/css/Products.css';
import useProducts from '../hooks/useProducts';

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
      console.log(query);
      fetch(`http://localhost:3031/api/products?${query}`)
        .then(resp => resp.json())
        .then(prod => setCurrentTableData(prod.products))
    }, [searchParams])
    
  return (
    <section className='product-page'>
      <Aside />
      <div className='products-container'>
        <div className='product-card-list'>
        { loading && <div>Loading...</div> }
        { error && <div className="error">ERROR OH NO</div> }
        {currentTableData?.map(prod => <ProductCard product={prod}/>)}
        </div>
        <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
      </div>
    </section>
  )
}
