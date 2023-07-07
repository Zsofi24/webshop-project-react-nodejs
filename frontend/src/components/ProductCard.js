import React from 'react'
import { productService } from '../services/productServices';

export default function ProductCard({product}) {
    console.log(product);

    function addToCart() {
        productService.addProductToCart(product.id)
    }

  return (
    <>
    <div>ProductCard</div>
    <p>{product.title}</p>
    <p>{product.price}</p>
    <button onClick={addToCart}>kosárba</button>
    </>
  )
}
