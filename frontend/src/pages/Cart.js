import React, { useContext, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext'
import { UserAuthContext } from '../contexts/UserAuthContext';
import { useCookies } from 'react-cookie';
import { orderServices } from '../services/orderServices';

export default function Cart() {

  const {cart, setCart} = useContext(CartContext);
  const {user} = useContext(UserAuthContext);
  const [ cookies ] = useCookies(['sessionID'])
  console.log(user, "user in cart");

  function order() {
    console.log(cart, "cart in order function");
    orderServices.sendOrder({userid: user.localId}, cart)
      .then(orderdetails => {if(orderdetails.orderid) setCart({})})
  }
   
  return (
    <>
      {Object.keys(user).length == 0 
        ?
         <p>A kosár megtekintéséhez jelentkezzen be</p> 
        : 
      (
        <>
        {
        cart.length > 0 ? (
        <>
        {
        cart.map(cartitem => (
          <div key={cartitem.product_id}>
            <p>{cartitem.title}</p>
            <p>mennyiség: {cartitem.amount}</p>
            <p>ár: {cartitem.price}</p>
          </div>
        ))
        }
        <button onClick={order}>megrendelés</button>
        </>
        )
        :
        "A kosara üres"
        }
        </>
      )
      }
    </>
  )
}
