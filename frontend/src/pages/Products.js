import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import Pagination from '../components/Pagination';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/user/product/ProductCard';
import useScreenSize from '../hooks/useScreenSize';
import Aside from '../components/user/aside/Aside';
import AsideMobile from '../components/user/aside/AsideMobile';
import Popup from '../components/user/popup/Popup';

export default function Products() {

    const [{loading, response, error, totalPages, page}, dispatch] = useProducts();

    const [searchParams, setSearchParams] = useSearchParams();

    const screenSize = useScreenSize();
    const [showMobileAside, setShowMobileAside] = useState(false);
    const [ popupOpen, setPopupOpen ] = useState(false);
    const [ product, setProduct ] = useState(null);

    function onPageChange(pagenum) {
      searchParams.set("page", pagenum)
      setSearchParams(searchParams)
      dispatch({ type: 'PAGECHANGE', page: pagenum})
    }
    
  return (
    <section className='products-wrapper'>
      {/* <AsideMobile /> */}
      {
          popupOpen && <Popup closePopUp={() => setPopupOpen(false)} product={product}/>
        }
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
          response?.map(prod => <ProductCard key={prod.id} product={prod} setPopupOpen={setPopupOpen} setProduct={setProduct} />)
        }
        </div>
        <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={page}/>
      </div>
    </section>
  )
}
