import React, { useContext } from 'react'
import { productService } from '../services/productServices';
import { UserAuthContext } from '../contexts/UserAuthContext'

export default function ProductCard({product}) {

  const { user } = useContext(UserAuthContext)
    console.log(product);

    function addToCart() {
      const cartdata = { userid: user.localId, productid: product.id }
      console.log(cartdata, "cartdata");
        productService.addProductToCart(cartdata)
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
