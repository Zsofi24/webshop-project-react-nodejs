import React, { useContext } from 'react'
import { productService } from '../services/productServices';
import { UserAuthContext } from '../contexts/UserAuthContext';
import '../assets/css/ProductCard.css'

export default function ProductCard({product}) {

  const { user } = useContext(UserAuthContext)

    function addToCart() {
      const cartdata = { userid: user.localId, productid: product.id }
      console.log(cartdata, "cartdata");
      if(Object.keys(user).length == 0) console.log("nincs bejelentkezve")
      else {
      productService.addProductToCart(cartdata)
        .then(resp => {
          if(resp.error) console.log(resp.error);
      })}
    }

  return (
    <>
    <div className='product-card'>
      <img src='https://placekitten.com/200'/>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <button onClick={addToCart}>kosárba</button>
    </div>
    </>
  )
}
