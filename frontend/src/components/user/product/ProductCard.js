import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { BsFillCartFill, BsFillCartXFill, BsFillBellFill, BsFillCartCheckFill } from 'react-icons/bs';
import { API_URL } from '../../../constants';
import { productService } from '../../../services/productServices';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { CartContext } from '../../../contexts/CartContext';
import { cartService } from '../../../services/cartService';
import Button from '../../Button'
import ProductCardLabel from './ProductCardLabel';

export default function ProductCard({product}) {

  const { user } = useContext(UserAuthContext);
  const { cart, setCart, addToCartContext } = useContext(CartContext);
  const [ isInCart, setIsInCart ] = useState(false);
  const [ isInStock, setIsInStock ] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if(cart.length > 0) {
      const productInCart = cart.some(item => item.id == product.id)
      setIsInCart(productInCart)
    } else {
      setIsInCart(false)
    }
    setIsInStock(product.stock > 0);
  }, [product, cart])
 
    function addToCart() {
      const cartdata = { userid: user.localId, productid: product.id }
      if(Object.keys(user).length == 0) alert("jelentkezz be!")
      else {
      productService.addProductToCart(cartdata)
        .then(resp => {
          if(resp.error) alert(resp.error, "cart error");
          else {
            cartService.getCart()
            .then(cartitems => setCart(cartitems))
          }  
      })
    }
  }

  return (
    <>
    <div className='card'>
      <Link to={`${product.id}`} state={{search: searchParams.toString()}}> 
      <div className='card__image'>
        {/* ideiglenes megoldás!!! default img */}
        {
          product.path 
          ?
          <img src={`${API_URL}/api/${product.path}`} alt="wine" />
          :
          <img src={`${API_URL}/api/uploads/e65d2a0f397b3aadf357c6fd6dde1282-resized`} alt="wine" />

        }
        { product.limited ? <ProductCardLabel text="limitált"/> : null }
      </div>
      <h3 className='heading-3'>{product.title}</h3>
      <p>{(product.price).toLocaleString('fr')} Ft</p>
      </Link>
      {
        isInCart 
          ?
          <Button type="cart" text="Hozzáadva" primary handleClick={addToCart} ><BsFillCartCheckFill /></Button>
          :
          (          
            isInStock
              ?
              <Button type="cart" text='Hozzáadás a kosárhoz' handleClick={addToCart} disabled={product.stock == 0}>{product.stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}</Button>
              :
              <div>
                <Button type="cart" notInStock handleClick={addToCart} disabled={product.stock == 0}>{product.stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}</Button>
                <Button type="cart" ><BsFillBellFill /></Button>
              </div>
          )
      }
    </div>      
    </>
  )
}
