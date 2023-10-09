import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import ProductCard from '../components/ProductCard';
import Aside from '../components/user/aside/Aside';
import Pagination from '../components/Pagination';
import useProducts from '../hooks/useProducts';
import useScreenSize from '../hooks/useScreenSize';
import AsideMobile from '../components/user/aside/AsideMobile';

export default function Products() {

    const [{loading, response, error, totalPages, currentPage}, dispatch] = useProducts();

    const [searchParams, setSearchParams] = useSearchParams();

    const screenSize = useScreenSize();
    const [showMobileAside, setShowMobileAside] = useState(false);

    function onPageChange(pagenum) {
      searchParams.set("currentPage", pagenum)
      setSearchParams(searchParams)
      dispatch({ type: 'PAGECHANGE', currentPage: pagenum})
    }
    
  return (
    <section className='products-wrapper'>
      {/* <AsideMobile /> */}
      {
        (screenSize.width <= 1025) 
        ?
        <AsideMobile 
          showMobileAside={showMobileAside} 
          setShowMobileAside={setShowMobileAside} 
        />
        :
        <Aside />
      }

      {/* !!!! termék kártyák design */}
{/* https://www.youtube.com/watch?v=sKFW3wek21Q */}


      <div className='products-container'>
        <div className='card-list'>
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
        {
          !showMobileAside
          &&
          response?.map(prod => <ProductCard key={prod.id} product={prod}/>)
        }
        </div>
        <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
      </div>
    </section>
  )
}
