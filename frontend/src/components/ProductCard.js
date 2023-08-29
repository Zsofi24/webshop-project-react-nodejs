import React, { useContext } from 'react'
import { productService } from '../services/productServices';
import { UserAuthContext } from '../contexts/UserAuthContext';
import '../assets/css/ProductCard.css'
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import  { BsFillCartFill, BsFillCartXFill, BsFillBellFill } from 'react-icons/bs';

export default function ProductCard({product}) {

  const { user } = useContext(UserAuthContext);
  const { cart, setCart, addToCartContext } = useContext(CartContext);

    function addToCart() {
      const cartdata = { userid: user.localId, productid: product.id }
      console.log(cartdata, "cartdata");
      if(Object.keys(user).length == 0) console.log("nincs bejelentkezve")
      else {
      productService.addProductToCart(cartdata)
        .then(resp => {
          if(resp.error) console.log(resp.error, "cart error");
  
      })
    }
  }

  return (
    <>
    <div className='product-card'>
      <Link to={`${product.id}`}>
      <img src='https://placekitten.com/200'/>
      <p>{product.title}</p>
      <p>{product.price}</p>
      </Link>
      <button onClick={addToCart} disabled={product.stock == 0}>{product.stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}</button>
      {
        product.stock == 0 && <button><BsFillBellFill /> értesítés ha lesz raktáron</button>       
      }
    </div>
    </>
  )
}
