import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {productService} from '../services/productServices';
import '../assets/css/Products.css';
import Aside from '../components/Aside';
import Pagination from '../components/Pagination';
// import Pager from '../components/Pager';

export default function Products() {

    const [products, setProducts] = useState();
    const [currentTableData, setCurrentTableData] = useState(null)
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    
    console.log(products?.length, "p length");
    console.log(totalPages, "totalages");
    console.log(pageSize, "pagesize");
    
    // let PageSize = 2;
    // const currentTableData = useMemo(() => {
    //   // const firstPageIndex = (currentPage - 1) * pageSize;
    //   // const lastPageIndex = firstPageIndex + pageSize;
    //   // return products?.slice(firstPageIndex, lastPageIndex);
    //  return fetch(`http://localhost:3031/api/products/${pageSize}/${currentPage}`)
    //     .then(resp => resp.json())
    //     .then(prod => prod)

    // }, [currentPage, pageSize, products]);

    console.log(currentTableData, "currenttabel");

    function onPageChange(pagenum) {
      searchParams.set("currentPage", pagenum)
      setSearchParams(searchParams)
      setCurrentPage(pagenum)
    }

    useEffect(() => {
        productService
            .getProducts()
            .then(data => {
              setProducts(data)
            })
    }, [])

    useEffect(() => {
      setTotalPages(Math.ceil(products?.length / pageSize))
    }, [products])

    // useEffect(() => {
    //   fetch(`http://localhost:3031/api/products?pagesize=${pageSize}&currentpage=${currentPage}`)
    //     .then(resp => resp.json())
    //     .then(prod => setCurrentTableData(prod))
    // }, [currentPage, pageSize])

    useEffect(() => {
      let query = "";
      searchParams.forEach((key, value) => {
        query = query + `${value}=${key}&`;
      })
      console.log(query);
      fetch(`http://localhost:3031/api/products?${query}`)
        .then(resp => resp.json())
        .then(prod => setCurrentTableData(prod))
    }, [searchParams])
    
  return (
    <section className='product-page'>
      <Aside />
      <div className='products-container'>
        <div className='product-card-list'>
        {currentTableData?.map(prod => <ProductCard product={prod}/>)}
        </div>
        <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
        {/* <Pager
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={6}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        /> */}
      </div>
    </section>
  )
}
