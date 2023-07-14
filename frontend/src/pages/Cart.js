import React, { useContext, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext'
import { UserAuthContext } from '../contexts/UserAuthContext';
import { useCookies } from 'react-cookie';

export default function Cart() {

  const {cart, setCart} = useContext(CartContext);
  const {user} = useContext(UserAuthContext);
  const [ cookies ] = useCookies(['sessionID'])
  console.log(cart, "cart in cart");
   
  return (
    <>
      {
        cart.length > 0 && (
        cart.map(cartitem => (
          <div key={cartitem.product_id}>
            <p>{cartitem.title}</p>
            <p>mennyiség: {cartitem.amount}</p>
            <p>ár: {cartitem.price}</p>
          </div>
        )))
      }
    </>
  )
}
