import React, { useContext, useEffect, useState } from 'react'
import { productService } from '../services/productServices';
import { UserAuthContext } from '../contexts/UserAuthContext';
import '../assets/css/ProductCard.css'
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { BsFillCartFill, BsFillCartXFill, BsFillBellFill, BsFillCartCheckFill } from 'react-icons/bs';
import { cartService } from '../services/cartService';
import { CartButton } from '../assets/css/Button';
import Button from '../components/Button'

export default function ProductCard({product}) {

  const { user } = useContext(UserAuthContext);
  const { cart, setCart, addToCartContext } = useContext(CartContext);
  const [ isInCart, setIsInCart ] = useState(false);
  const [ isInStock, setIsInStock ] = useState(true);

  useEffect(() => {
    if(cart.length > 0) {
      const productInCart = cart.some(item => item.id == product.id)
      setIsInCart(productInCart)
    } else {
      setIsInCart(false)
    }
    setIsInStock(product.stock > 0);
  }, [product])
 
    function addToCart() {
      const cartdata = { userid: user.localId, productid: product.id }
      console.log(cartdata, "cartdata");
      if(Object.keys(user).length == 0) console.log("nincs bejelentkezve")
      else {
      productService.addProductToCart(cartdata)
        .then(resp => {
          if(resp.error) console.log(resp.error, "cart error");
          else {
            cartService.getCart()
            .then(cartitems => setCart(cartitems))
          }  
      })
    }
  }

  return (
    <>
    <div className='product-card'>
      <Link to={`${product.id}`}>
      <img src='https://placekitten.com/200'/>
      <p className='product-font-primary'>{product.title}</p>
      <p className='product-font-primary'>{product.price} Ft</p>
      </Link>
      {
        isInCart 
          ?
          <CartButton onClick={addToCart}><BsFillCartCheckFill /></CartButton>
          :
          (          
            isInStock
              ?
              <CartButton onClick={addToCart} disabled={product.stock == 0}>{product.stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}</CartButton>
              :
              <CartButton $notInStock onClick={addToCart} disabled={product.stock == 0}>{product.stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}</CartButton>

          )
      }      
      {
        product.stock == 0 && <Button><BsFillBellFill /></Button>       
      }
    </div>
    </>
  )
}
