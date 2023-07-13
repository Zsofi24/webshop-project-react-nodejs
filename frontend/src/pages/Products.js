import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import {productService} from '../services/productServices'

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productService
            .getProducts()
            .then(data => setProducts(data))
    }, [])
    
  return (
    <>
    <div>Products</div>
    {products?.map(prod => <ProductCard product={prod}/>)}
    </>
  )
}
